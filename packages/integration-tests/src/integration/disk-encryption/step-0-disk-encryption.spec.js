import { clusterDetailsPage } from '../../views/clusterDetails';
import { bareMetalDiscoveryPage } from '../../views/bareMetalDiscovery';
import { commonActions } from '../../views/common';
import { tangServerValues } from '../../fixtures/disk-encyrpiton'
import * as utils from '../../support/utils';
import {transformBasedOnUIVersion} from "../../support/transformations";

const NEW_CLUSTER_URL = '/clusters/~new';

const getTangServerUrl = (index) => {
  return cy.get(`#form-input-diskEncryptionTangServers-${index}-url-field`);
};

const getTangServerThumbprint = (index) => {
  return cy.get(`#form-input-diskEncryptionTangServers-${index}-thumbprint-field`);
};

const fillTangServers = (index) => {
  const TangServerUrl = getTangServerUrl(index);
  TangServerUrl.type(tangServerValues.Url);
  TangServerUrl.should('have.value', tangServerValues.Url);
  const TangServerThumbprint = getTangServerThumbprint(index);
  TangServerThumbprint.type(tangServerValues.Thumbprint);
  TangServerThumbprint.should('have.value', tangServerValues.Thumbprint);
};

const enableDiskEncyrption = () => {
  cy.get(Cypress.env('encryptionOnMastersOn')).should('be.visible');
  cy.get(Cypress.env('encryptionOnWorkersOff')).click();
  cy.get(Cypress.env('encryptionOnWorkersOn')).should('be.visible');
  cy.contains('TPM v2').should('be.visible');
  cy.contains('Tang').should('be.visible');
  cy.get(Cypress.env('encryptionOnWorkersOn')).click();
};

const enableTangServers = () => {
  cy.contains('Tang').click();
  cy.contains('Server URL').should('be.visible');
  cy.contains('Server Thumbprint').should('be.visible');
  cy.contains('TPM v2').click();
};

describe(`Assisted Installer Disk Encryption`, () => {
  before(() => {
    cy.loadAiAPIIntercepts({
      activeSignal: '',
      activeScenario: 'AI_CREATE_MULTINODE',
    });
    transformBasedOnUIVersion();

    cy.visit(NEW_CLUSTER_URL);
    clusterDetailsPage.inputClusterName();
    clusterDetailsPage.getRedHatDnsServiceCheck().check();
    clusterDetailsPage.inputOpenshiftVersion();
    clusterDetailsPage.inputPullSecret();
  });

  describe(`Unit tests`, () => {
    beforeEach(() => {
      cy.loadAiAPIIntercepts(null);
      cy.get(Cypress.env('encryptionOnMastersOff')).click();
    });

    afterEach(() => {
      commonActions.waitForSave();
      commonActions.waitForNext();
      cy.get(Cypress.env('encryptionOnMastersOn')).click();
    });

    it('Can use disk encryption', () => {
      enableDiskEncyrption();
      enableTangServers();
    });

    it('Add tang servers', () => {
      cy.contains('Tang').click();
      cy.contains('Add another Tang server').click();
      fillTangServers(0);
      cy.get('#form-input-diskEncryptionTangServers-1-thumbprint-field').should('be.visible');
      cy.get('#form-input-diskEncryptionTangServers-1-url-field').should('be.visible')
      fillTangServers(1);
    });
  });

  describe(`Disk Encryption Submission`, () => {
    it('Can submit the form with Tang encryption', () => {
      cy.loadAiAPIIntercepts(null);
      cy.get(Cypress.env('encryptionOnMastersOff')).click();
      cy.contains('Tang').click();
      fillTangServers(0);

      commonActions.clickNextButton();

      if (utils.isAIAPIMocked()) {
        cy.wait('@create-cluster').then(({ request }) => {
          expect(request.body.disk_encryption.valueOf()).to.deep.equal(
            Cypress.env('TANG_SERVER_EXPECTED_PATCH'),
          );
        });
        cy.wait('@create-infra-env');
        utils.setLastWizardSignal('CLUSTER_CREATED');
      }
      cy.get('h2').should('contain', 'Host discovery');
      bareMetalDiscoveryPage.setClusterIdFromUrl();
    });
  });
});
