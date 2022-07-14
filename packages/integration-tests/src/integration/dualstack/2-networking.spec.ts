import { commonActions } from '../../views/common';
import { networkingPage } from '../../views/networkingPage';
import * as utils from '../../support/utils';

describe(`Assisted Installer Dualstack Networking`, () => {
  before(() => {
    cy.loadAiAPIIntercepts({
      activeSignal: 'HOST_RENAMED_3',
      activeScenario: 'AI_CREATE_DUALSTACK',
    });
  });

  beforeEach(() => {
    cy.loadAiAPIIntercepts(null);
    cy.visit(`/clusters/${Cypress.env('clusterId')}`);
    commonActions.startAtNetworkingStep();
  });

  afterEach(() => {
    commonActions.waitForSave();
    commonActions.getNextButton().should('be.enabled');
  });

  after('Should go to the final step', () => {
    commonActions.clickNextButton();
  });

  it('Can correctly configure IPv4 networking type', () => {
    networkingPage.getStackTypeSingleStack().should('be.enabled').and('be.checked');
    networkingPage.getClusterManagedNetworking().should('be.enabled').and('be.checked');
    networkingPage.getVipDhcp().should('be.enabled').and('be.checked');
    networkingPage.getAdvancedNetwork().should('be.enabled').and('not.be.checked');

    utils.setTransformSignal('single-stack');
    cy.wait('@update-cluster').then(() => {
      utils.setLastWizardSignal('READY_TO_INSTALL');
      utils.clearTransformSignal();
    });
  });

  it('Can switch to dual-stack networking type', () => {
    networkingPage.getStackTypeDualStack().should('be.enabled').and('not.be.checked');
    networkingPage.getStackTypeDualStack().check();

    utils.setTransformSignal('dual-stack');
    cy.wait('@update-cluster');
      
    networkingPage.getClusterManagedNetworking().should('be.disabled').and('be.checked');
    networkingPage.getStackTypeDualStack().should('be.enabled').and('be.checked');
    networkingPage.getVipDhcp().should('be.disabled').and('not.be.checked');
    networkingPage.getOvnNetworkingField().should('be.enabled').and('be.checked');
    networkingPage.getSdnNetworkingField().should('be.disabled');
    networkingPage.waitForNetworkStatusToNotContain('Some validations failed');
  });

  it('Can switch to IPv4 networking type', () => {
    networkingPage.getStackTypeDualStack().should('be.enabled').and('be.checked');
    networkingPage.getStackTypeSingleStack().should('be.enabled').check();
    networkingPage.confirmStackTypeChange();

    utils.setTransformSignal('single-stack');
    cy.wait('@update-cluster');
    
    networkingPage.getClusterManagedNetworking().should('be.enabled').and('be.checked');
    networkingPage.getStackTypeSingleStack().should('be.enabled').and('be.checked');
    networkingPage.getVipDhcp().should('be.enabled').and('be.checked');
    networkingPage.getSdnNetworkingField().should('be.enabled').and('be.checked');
  });

});
