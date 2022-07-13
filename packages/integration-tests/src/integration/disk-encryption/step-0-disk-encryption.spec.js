import { clusterDetailsPage } from '../../views/clusterDetails';
import { diskEncryptionPage } from '../../views/diskEncryption';
import { bareMetalDiscoveryPage } from '../../views/bareMetalDiscovery';
import { commonActions } from '../../views/common';
import {diskEncryptionValues, tangServerValues} from '../../fixtures/disk-encyrpiton'
import * as utils from '../../support/utils';
import {transformBasedOnUIVersion} from "../../support/transformations";

const fillTangServers = (index) => {
  const tangServerUrl = diskEncryptionPage.getTangServerUrl(index);
  tangServerUrl.type(tangServerValues.Url);
  tangServerUrl.should('have.value', tangServerValues.Url);
  const tangServerThumbprint = diskEncryptionPage.getTangServerThumbprint(index);
  tangServerThumbprint.type(tangServerValues.Thumbprint);
  tangServerThumbprint.should('have.value', tangServerValues.Thumbprint);
};

const enableDiskEncryption = () => {
  diskEncryptionPage.getWorkersEncryptionSwitch().click({force: true});
  diskEncryptionPage.getEncryptionMode().first().should('be.checked');
  diskEncryptionPage.getEncryptionMode().first().should('have.value', 'tpmv2');
  diskEncryptionPage.getWorkersEncryptionSwitch().click({force: true});
};

const enableTangServers = () => {
  diskEncryptionPage.getEncryptionMode().check("tang");
  diskEncryptionPage.getTangServerUrl(0).should('be.visible');
  diskEncryptionPage.getTangServerThumbprint(0).should('be.visible');
  diskEncryptionPage.getEncryptionMode().first().check();
};

describe(`Assisted Installer Disk Encryption`, () => {
  before(() => {
    cy.loadAiAPIIntercepts({
      activeSignal: '',
      activeScenario: 'AI_CREATE_MULTINODE',
    });
    transformBasedOnUIVersion();

    commonActions.openNewClusterPage();
    clusterDetailsPage.inputClusterName();
    clusterDetailsPage.getRedHatDnsServiceCheck().check();
    clusterDetailsPage.inputOpenshiftVersion();
    clusterDetailsPage.inputPullSecret();
  });

  describe(`Unit tests`, () => {
    beforeEach(() => {
      cy.loadAiAPIIntercepts(null);
      diskEncryptionPage.getMastersEncryptionSwitch().click({force: true});
    });

    afterEach(() => {
      commonActions.waitForSave();
      commonActions.waitForNext();
      diskEncryptionPage.getMastersEncryptionSwitch().click({force: true});
    });

    it('Can use disk encryption', () => {
      enableDiskEncryption();
      enableTangServers();
    });

    it('Add tang servers', () => {
      diskEncryptionPage.getEncryptionMode().check("tang");
      diskEncryptionPage.addAnotherTangServer().click();
      fillTangServers(0);
      diskEncryptionPage.getTangServerUrl(1).should('be.visible');
      diskEncryptionPage.getTangServerThumbprint(1).should('be.visible')
      fillTangServers(1);
    });
  });

  describe(`Disk Encryption Submission`, () => {
    it('Can submit the form with Tang encryption', () => {
      cy.loadAiAPIIntercepts(null);
      diskEncryptionPage.getMastersEncryptionSwitch().click({force: true});
      diskEncryptionPage.getEncryptionMode().check("tang");
      fillTangServers(0);

      commonActions.clickNextButton();

      cy.wait('@create-cluster').then(({ request }) => {
        expect(request.body.disk_encryption.valueOf()).to.deep.equal(diskEncryptionValues);
      });
      cy.wait('@create-infra-env');
      utils.setLastWizardSignal('CLUSTER_CREATED');
      cy.get('h2').should('contain', 'Host discovery');
      bareMetalDiscoveryPage.setClusterIdFromUrl();
    });
  });
});
