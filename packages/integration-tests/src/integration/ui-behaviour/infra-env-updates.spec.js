import {transformBasedOnUIVersion} from "../../support/transformations";
import {bareMetalDiscoveryPage} from "../../views/bareMetalDiscovery";
import {bareMetalDiscoveryIsoModal} from "../../views/bareMetalDiscoveryIsoModal";

describe('Assisted Installer UI behaviour - infra env updates', () => {
  before(() => {
    cy.loadAiAPIIntercepts({
      activeSignal: 'CLUSTER_CREATED',
      activeScenario: 'AI_CREATE_MULTINODE',
    });
    transformBasedOnUIVersion();
  });

  beforeEach(() => {
    cy.loadAiAPIIntercepts(null);
    cy.visit(`/clusters/${Cypress.env('clusterId')}`);
  });

  it('Should discriminate between full and minimal image', () => {
    bareMetalDiscoveryPage.openAddHostsModal();
    bareMetalDiscoveryIsoModal.getGenerateDiscoveryIso().click();
    bareMetalDiscoveryIsoModal.getEditISO().click();
    bareMetalDiscoveryIsoModal.getImageType().check("full-iso");
    bareMetalDiscoveryIsoModal.getGenerateDiscoveryIso().click();
    cy.wait(['@update-infra-env', '@update-infra-env']).then(
      (interceptions) => {
        expect(interceptions[0].request.body.image_type).to.equal('minimal-iso');
        expect(interceptions[1].request.body.image_type).to.equal('full-iso');
      }
    );
  });
});
