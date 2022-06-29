import { commonActions } from '../../views/common';
import { networkingPage } from '../../views/networkingPage';
import * as utils from '../../support/utils';

const startAtNetworkingStep = () => {
  if (utils.isAIAPIMocked()) {
    if (utils.hasWizardSignal('READY_TO_INSTALL')) {
      commonActions.getHeader('h2').should('contain', 'Review and create');
      commonActions.getBackButton().click();
    } else {
      commonActions.getHeader('h2').should('contain', 'Host discovery');
      commonActions.clickNextButton();
    }
  } else {
    // As the host status can differ with API polling results, the initial step can difer
    cy.get('h2').then(($body) => {
      const currentStepLabel = $body.text();
      if (currentStepLabel.includes('Host discovery')) {
        commonActions.clickNextButton();
      } else if (currentStepLabel.includes('Review and create')) {
        commonActions.getBackButton().click();
      } else {
        commonActions.getHeader('h2', 100).should('contain', 'Unexpected AI Wizard step');
      }
    });
  }
};

describe(`Assisted Installer Multinode Networking`, () => {
  before(() => {
    Cypress.env('CLUSTER_PATCH_FORBIDDEDN', 'true');
    cy.loadAiAPIIntercepts({
      activeSignal: 'HOST_RENAMED_1',
      activeScenario: 'AI_CREATE_MULTINODE',
    });
  });

  beforeEach(() => {
    cy.loadAiAPIIntercepts(null);
    cy.visit(`/clusters/${Cypress.env('clusterId')}`);
    startAtNetworkingStep();
  });

  describe('Validating the Network configuration', () => {
    it('Should see the Ready Host inventory status', () => {
      cy.wait('@cluster-details').then(() => {
        utils.setLastWizardSignal('READY_TO_INSTALL');
      });
      networkingPage.waitForNetworkStatus('Ready');
      networkingPage.waitForNetworkStatusToNotContain('Some validations failed');
    });

    it('Should have enforced Network Management', () => {
      networkingPage.getUserManagedNetworking().should('be.enabled').and('not.be.checked');
      networkingPage.getClusterManagedNetworking().should('be.enabled').and('be.checked');
      networkingPage.getAdvancedNetwork().should('not.be.checked');
      networkingPage.getStackTypeSingleStack().should('be.checked');
      networkingPage.getStackTypeInput().should('be.disabled');
    });

    it('Should go to the final step', () => {
      commonActions.clickNextButton();
    });
  });
});
