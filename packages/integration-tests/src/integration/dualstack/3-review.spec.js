import { reviewAndCreatePage } from '../../views/reviewCreate';
import { commonActions } from '../../views/common';
import * as utils from '../../support/utils';

describe(`Assisted Installer Dualstack Review`, () => {
  before(() => {
    cy.loadAiAPIIntercepts({
      activeSignal: 'READY_TO_INSTALL_DUALSTACK',
      activeScenario: 'AI_CREATE_DUALSTACK',
    });
  });

  beforeEach(() => {
    cy.loadAiAPIIntercepts(null);
    cy.visit(`/clusters/${Cypress.env('clusterId')}`);
    commonActions.getHeader('h2').should('contain', 'Review and create');
  });

  it('Should be ready to install', () => {
    reviewAndCreatePage.checkAllValidationsPassed(reviewAndCreatePage.getClusterValidations());
    if (utils.isAIAPIMocked()) {
      reviewAndCreatePage.checkAllValidationsPassed(reviewAndCreatePage.getHostValidations());
    }
    reviewAndCreatePage.validateClusterDetails({stackType: "Dual-stack"});
    reviewAndCreatePage.waitForInstallButton();
  });
});
