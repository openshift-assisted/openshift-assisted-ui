import { reviewAndCreatePage } from '../../views/reviewCreate';
import { commonActions } from '../../views/common';
import * as utils from '../../support/utils';
import { transformBasedOnUIVersion } from '../../support/transformations';

describe(`Assisted Installer Multinode Review`, () => {
  before(() => {
    transformBasedOnUIVersion();
    cy.loadAiAPIIntercepts({ activeSignal: 'READY_TO_INSTALL', activeScenario: 'AI_CREATE_MULTINODE' });
  });

  beforeEach(() => {
    cy.loadAiAPIIntercepts(null);
    cy.visit(`/clusters/${Cypress.env('clusterId')}`);
    commonActions.getHeader('h2').should('contain', 'Review and create');
  });

  describe('Cluster summary', () => {
    it('Should be ready to install', () => {
      reviewAndCreatePage.checkAllValidationsPassed(reviewAndCreatePage.getClusterValidations());
      if (utils.isAIAPIMocked()) {
        reviewAndCreatePage.checkAllValidationsPassed(reviewAndCreatePage.getHostValidations());
      }
      reviewAndCreatePage.validateClusterDetails();
      reviewAndCreatePage.waitForInstallButton();
    });
  });
});
