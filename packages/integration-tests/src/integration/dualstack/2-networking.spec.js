import { commonActions } from '../../views/common';
import { networkingPage } from '../../views/networkingPage';
import * as utils from '../../support/utils';

describe(`Assisted Installer Dualstack Networking`, () => {
  before(() => {
    cy.loadAiAPIIntercepts({
      activeSignal: 'READY_TO_INSTALL',
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

  it('Can switch to dual-stack networking type', () => {
    networkingPage.getStackTypeSingleStack().should('be.enabled').and('be.checked');
    networkingPage.getStackTypeDualStack().should('be.enabled').check();

    if (utils.isAIAPIMocked) {
      Cypress.env('TRANSFORM_SIGNAL', 'dual-stack');
      cy.wait('@update-cluster');
    }


    networkingPage.getClusterManagedNetworking().should('be.disabled').and('be.checked');
    networkingPage.getStackTypeDualStack().should('be.enabled').and('be.checked');
    networkingPage.getVipDhcp().should('be.disabled').and('not.be.checked');
    networkingPage.getOvnNetworkingField().should('be.enabled').and('be.checked');
    networkingPage.getSdnNetworkingField().should('be.disabled');
  });

  it('Can switch to IPv4 networking type', () => {
    networkingPage.getStackTypeDualStack().should('be.enabled').and('be.checked');
    networkingPage.getStackTypeSingleStack().should('be.enabled').check();
    networkingPage.confirmStackTypeChange();

    if (utils.isAIAPIMocked()) {
      Cypress.env('TRANSFORM_SIGNAL', 'single-stack');
      cy.wait('@update-cluster');
    }

    networkingPage.getClusterManagedNetworking().should('be.enabled').and('be.checked');
    networkingPage.getStackTypeSingleStack().should('be.enabled').and('be.checked');
    networkingPage.getVipDhcp().should('be.enabled').and('be.checked');
    networkingPage.getSdnNetworkingField().should('be.enabled').and('be.checked');
  });

});
