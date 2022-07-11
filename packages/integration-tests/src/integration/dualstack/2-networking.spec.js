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
  });

  it('Can switch to dual-stack networking type', () => {
    networkingPage.getStackTypeSingleStack().should('be.enabled').should('be.checked');
    networkingPage.getStackTypeDualStack().should('be.enabled').check();

    Cypress.env('TRANSFORM_SIGNAL', 'dual-stack');
    cy.wait('@update-cluster');
  });

  it('Can switch to IPv4 networking type', () => {
    networkingPage.getStackTypeDualStack().should('be.enabled').should('be.checked');
    networkingPage.getStackTypeSingleStack().should('be.enabled').check();
    networkingPage.confirmStackTypeChange();
    Cypress.env('TRANSFORM_SIGNAL', 'single-stack');
    cy.wait('@update-cluster');
  });

  it('Should go to the final step', () => {
    commonActions.clickNextButton();
  });
});
