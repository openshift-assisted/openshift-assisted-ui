import { commonActions } from '../../views/common';
import { clusterDetailsPage } from '../../views/clusterDetails';
import { clusterListPage } from '../../views/clusterList';
import * as utils from '../../support/utils';
import { transformBasedOnUIVersion } from '../../support/transformations';

const NEW_CLUSTER_URL = '/clusters/~new';

describe(`Assisted Installer SNO Cluster Installation`, () => {
  before(() => {
    if (!utils.isAIAPIMocked()) {
      cy.cleanUpE2eNodeResources();
      cy.deleteClusterByName();
    }

    cy.loadAiAPIIntercepts({ activeSignal: '', activeScenario: 'AI_CREATE_SNO' });
    transformBasedOnUIVersion();
  });

  beforeEach(() => {
    cy.loadAiAPIIntercepts(null);
    cy.visit('/clusters');
  });

  describe('Creating a new cluster', () => {
    it('Can go to New Cluster Wizard', () => {
      clusterListPage.getCreateNewClusterButton().should('be.visible');
      clusterListPage.getCreateNewClusterButton().click();

      cy.location('pathname').should('eq', NEW_CLUSTER_URL);
    });

    it('Can submit the form to create a new cluster', () => {
      cy.visit(NEW_CLUSTER_URL);

      clusterDetailsPage.inputClusterName();
      clusterDetailsPage.inputbaseDnsDomain();
      clusterDetailsPage.inputOpenshiftVersion();

      clusterDetailsPage.enableSno();
      commonActions.getInfoAlert().should('contain', 'Limitations for using Single Node OpenShift');
      clusterDetailsPage.inputPullSecret();

      // Create the cluster and store its ID when moving to the next step
      commonActions.clickNextButton();

      if (utils.isAIAPIMocked()) {
        cy.wait('@create-cluster');
        cy.wait('@create-infra-env');
        utils.setLastWizardSignal('CLUSTER_CREATED');
      }

      commonActions.getHeader('h2').should('contain', 'Host discovery');
    });

    it('Lists the new cluster', () => {
      clusterListPage.getClusterByName().should('be.visible');
    });
  });
});
