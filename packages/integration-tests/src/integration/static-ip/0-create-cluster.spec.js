import { commonActions } from '../../views/common';
import { clusterDetailsPage } from '../../views/clusterDetails';
import * as utils from '../../support/utils';
import { transformBasedOnUIVersion } from '../../support/transformations';
import { staticIPCreated } from '../../fixtures/static-ip/requests';

const NEW_CLUSTER_URL = '/clusters/~new';

describe(`Assisted Installer Static IP Cluster Installation`, () => {
  before(() => {
    cy.loadAiAPIIntercepts({ activeSignal: '', activeScenario: 'AI_CREATE_STATIC_IP' });
    transformBasedOnUIVersion();
  });

  beforeEach(() => {
    cy.loadAiAPIIntercepts(null);
    cy.visit('/clusters');
  });

  describe('Creating a new cluster', () => {
    it('Can submit the form to create a new cluster with static IP', () => {
      cy.visit(NEW_CLUSTER_URL);

      clusterDetailsPage.inputClusterName();
      clusterDetailsPage.getRedHatDnsServiceCheck().check();
      clusterDetailsPage.inputOpenshiftVersion();
      clusterDetailsPage.inputPullSecret();

      clusterDetailsPage.enableSno();
      clusterDetailsPage.getCpuArchitectureField().should('be.disabled');
      clusterDetailsPage.enableStaticNetworking();

      commonActions.clickNextButton();

      cy.wait('@create-cluster');
      cy.wait('@create-infra-env').then(({request}) => {
        expect(request.body.static_network_config).to.deep.equal(staticIPCreated)
      });
      utils.setLastWizardSignal('CLUSTER_CREATED');

      cy.get('h2').should('contain', 'Static network configurations');

    });
  });
});
