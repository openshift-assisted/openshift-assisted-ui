import { commonActions } from '../../views/common';
import { networkingPage } from '../../views/networkingPage';
import * as utils from '../../support/utils';

describe(`Assisted Installer SNO Networking`, () => {
  before(() => {
    cy.loadAiAPIIntercepts({ activeSignal: 'HOST_RENAMED_1', activeScenario: 'AI_CREATE_SNO' });
  });

  beforeEach(() => {
    cy.loadAiAPIIntercepts(null);
    cy.visit(`/clusters/${Cypress.env('clusterId')}`);
    commonActions.startAtNetworkingStep();
  });

  describe('Validating the Network configuration', () => {
    it('Should see the Ready Host inventory status', () => {
      if (utils.isAIAPIMocked()) {
        cy.wait('@cluster-details').then(() => {
          utils.setLastWizardSignal('READY_TO_INSTALL');
        });
      }
      networkingPage.waitForNetworkStatus('Ready');

      if (utils.isAIAPIMocked()) {
        networkingPage.waitForNetworkStatusToNotContain('Some validations failed');
      }
    });

    it('Should have enforced Network Management', () => {
      networkingPage.getUserManagedNetworking().should('not.be.enabled').and('be.checked');
      networkingPage
        .getClusterManagedNetworking()
        .should('not.be.enabled')
        .should('not.be.checked');
      networkingPage.getAdvancedNetwork().should('not.be.checked');
    });

    it('Should go to the final step', () => {
      commonActions.clickNextButton();
    });
  });
});
