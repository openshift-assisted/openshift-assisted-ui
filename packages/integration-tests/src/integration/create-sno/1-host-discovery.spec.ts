import { commonActions } from '../../views/common';
import { bareMetalDiscoveryPage } from '../../views/bareMetalDiscovery';
import { bareMetalDiscoveryIsoModal } from '../../views/bareMetalDiscoveryIsoModal';
import { navbar } from '../../views/navbar';
import * as utils from '../../support/utils';

describe(`Assisted Installer SNO Host discovery`, () => {
  before(() => {
    cy.loadAiAPIIntercepts({
      activeSignal: 'CLUSTER_CREATED',
      activeScenario: 'AI_CREATE_SNO',
    });
  });

  beforeEach(() => {
    cy.loadAiAPIIntercepts(null);
    cy.visit(`/clusters/${Cypress.env('clusterId')}`);
  });

  describe('Downloading the Discovery ISO', () => {
    it('Should generate discovery ISO and wait for generate to complete', () => {
      bareMetalDiscoveryPage.getAddHostsButton().should('contain', 'Add host');
      bareMetalDiscoveryPage.openAddHostsModal();

      bareMetalDiscoveryIsoModal.getGenerateDiscoveryIso().click();
      bareMetalDiscoveryIsoModal.waitForIsoGeneration();
      bareMetalDiscoveryIsoModal.verifyDownloadIsoLinks();

      cy.wait('@update-cluster').then(() => {
        utils.setLastWizardSignal('ISO_DOWNLOADED');
      });
      bareMetalDiscoveryIsoModal.getCloseIsoButton().click();
    });

    it('Should generate a host in Insufficient state', () => {
      navbar.navItemsShouldNotShowErrors();

      utils.setLastWizardSignal('HOST_DISCOVERED_1');

      bareMetalDiscoveryPage.waitForHostTablePopulation();
      bareMetalDiscoveryPage.waitForHostRowToContain('localhost');
      bareMetalDiscoveryPage.waitForHardwareStatus('Insufficient');
    });

    it('Should rename the host, get valid state and see the "next" button enabled', () => {
      navbar.navItemsShouldNotShowErrors();
      utils.setLastWizardSignal('HOST_DISCOVERED_1');

      const renamedHost = Cypress.env('HOST_RENAME');
      bareMetalDiscoveryPage.selectHostRowKebabAction(0, Cypress.env('hostRowKebabMenuChangeHostnameText'));
      bareMetalDiscoveryPage.renameHost(renamedHost);
      bareMetalDiscoveryPage.clickSaveEditHostsForm();

      cy.wait('@rename-host-1').then(() => {
        utils.setLastWizardSignal('HOST_RENAMED_1');
      });

      bareMetalDiscoveryPage.waitForHostRowToContain(renamedHost);
      bareMetalDiscoveryPage.waitForHardwareStatus('Ready');
      bareMetalDiscoveryPage.waitForHostTablePopulation(1, 0);
      commonActions.getNextButton().should('be.enabled');
    });
  });
});
