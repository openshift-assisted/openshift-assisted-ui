import { navbar } from '../../views/navbar';
import { transformBasedOnUIVersion } from '../../support/transformations';
import { commonActions } from '../../views/common';

describe('Assisted Installer UI behaviour', () => {
  before(() => {
    cy.loadAiAPIIntercepts({
      activeSignal: 'READY_TO_INSTALL',
      activeScenario: 'AI_CREATE_MULTINODE',
    });
    transformBasedOnUIVersion();
  });

  beforeEach(() => {
    cy.loadAiAPIIntercepts(null);
    cy.visit(`/clusters/${Cypress.env('clusterId')}`);
  });

  describe('Prevent invalid PATCH requests', () => {
    it('Should not update a cluster when no changes were done by the user', () => {
      Cypress.env('AI_FORBIDDEN_CLUSTER_PATCH', true);

      navbar.clickOnNavItem('Cluster details');
      commonActions.clickNextButton();
      commonActions.getHeader().should('contain', 'Host discovery');
    });
  });
});
