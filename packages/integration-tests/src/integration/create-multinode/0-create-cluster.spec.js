import { commonActions } from '../../views/common';
import { clusterDetailsPage } from '../../views/clusterDetails';
import * as utils from '../../support/utils';
import { transformBasedOnUIVersion } from '../../support/transformations';

const NEW_CLUSTER_URL = '/clusters/~new';

describe(`Assisted Installer Multinode Cluster Installation`, () => {
  before(() => {
    cy.loadAiAPIIntercepts({ activeSignal: '', activeScenario: 'AI_CREATE_MULTINODE' });
    transformBasedOnUIVersion();
  });

  beforeEach(() => {
    cy.loadAiAPIIntercepts(null);
    cy.visit('/clusters');
  });

  describe('Creating a new cluster', () => {
    it('Can submit the form to create a new cluster', () => {
      cy.visit(NEW_CLUSTER_URL);

      clusterDetailsPage.inputClusterName();
      clusterDetailsPage.getRedHatDnsServiceCheck().check();
      clusterDetailsPage.inputOpenshiftVersion();
      clusterDetailsPage.inputPullSecret();

      clusterDetailsPage.getCpuArchitectureField().should('be.disabled');
      commonActions.getInfoAlert().should('not.exist');
      commonActions.clickNextButton();

      cy.wait('@create-cluster');
      cy.wait('@create-infra-env');
      utils.setLastWizardSignal('CLUSTER_CREATED');

      cy.get('h2').should('contain', 'Host discovery');
    });
  });
});
