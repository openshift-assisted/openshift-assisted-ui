import { navbar } from '../../views/navbar';
import { clusterDetailsPage } from '../../views/clusterDetails';
import { bareMetalDiscoveryPage } from '../../views/bareMetalDiscovery';
import { networkingPage } from '../../views/networkingPage';
import { reviewAndCreatePage } from '../../views/reviewCreate';
import { transformBasedOnUIVersion } from '../../support/transformations';

describe(`Assisted Installer Read Only Cluster`, () => {
  before(() => {
    cy.loadAiAPIIntercepts({
      activeSignal: 'READY_TO_INSTALL',
      activeScenario: 'AI_READONLY_CLUSTER',
    });
    transformBasedOnUIVersion();
  });

  beforeEach(() => {
    cy.loadAiAPIIntercepts(null);
    cy.visit(`/clusters/${Cypress.env('clusterId')}`);
  });

  describe('Read Only cluster', () => {
    it('Should display the Cluster details page in viewer mode', () => {
      navbar.clickOnNavItem('Cluster details');

      clusterDetailsPage.getClusterNameField().should('be.disabled');
      clusterDetailsPage.getBaseDnsDomain().should('have.attr', 'readonly');
    });

    it('Should display the Host discovery page in viewer mode', () => {
      navbar.clickOnNavItem('Host discovery');

      // General controls
      bareMetalDiscoveryPage.getIntegrationWithvSphere().should('be.disabled');
      bareMetalDiscoveryPage.getAddHostsButton().should('be.disabled');
      bareMetalDiscoveryPage.getCnvField().should('be.disabled');
      bareMetalDiscoveryPage.getOcsOperator().should('be.disabled');

      // Host Table actions
      bareMetalDiscoveryPage.getHostTableMassActions().should('not.exist');
      bareMetalDiscoveryPage.getHostRowSelectCheckbox(0).should('not.exist');
      bareMetalDiscoveryPage.validateIsReadOnlyHostMenu();
    });

    it('Should display the Networking page in viewer mode', () => {
      // TODO Set the cluster to have Dual Stack to cover more fields
      navbar.clickOnNavItem('Networking');

      networkingPage.getClusterManagedNetworking().should('be.disabled');
      networkingPage.getUserManagedNetworking().should('be.disabled');
      networkingPage.getAdvancedNetwork().should('be.disabled');
      networkingPage.getClusterNetworkCidr().should('be.disabled');
      networkingPage.getClusterNetworkPrefix().should('be.disabled');
      networkingPage.getServiceCidr().should('be.disabled');
      networkingPage.getSshKey().should('be.disabled');
    });

    it('Should display the Review page in viewer mode', () => {
      navbar.clickOnNavItem('Review and create');

      reviewAndCreatePage.getInstallButton().should('be.disabled');
    });
  });
});
