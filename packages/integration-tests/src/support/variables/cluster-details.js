import {diskEncryptionValues} from "../../fixtures/disk-encyrpiton";

Cypress.env('clusterNameFieldValidator', `[aria-label='Validation']`);
Cypress.env('clusterNameFieldId', '#form-input-name-field');
Cypress.env('openshiftVersionFieldId', '#form-input-openshiftVersion-field');
Cypress.env('pullSecretFieldId', '#form-input-pullSecret-field');
Cypress.env('assistedInstallerSupportLevel', `[data-testid=assisted-installer-support-level]`);
Cypress.env('snoSupportLevel', `[data-testid=SNO-support-level]`);
Cypress.env('baseDnsDomainFieldId', '#form-input-baseDnsDomain-field');
Cypress.env('highAvailabilityModeFieldId', '#form-input-highAvailabilityMode-field');
Cypress.env('cpuArchitectureFieldId', '#form-input-cpuArchitecture-field');
Cypress.env('checkboxSNODisclaimerFieldId', '#form-checkbox-SNODisclaimer-field');
Cypress.env('useRedHatDnsServiceFieldId', '#form-checkbox-useRedHatDnsService-field');
Cypress.env('enableStaticIpRadioButtonText', 'Static network configuration');
Cypress.env('cpuArchitectureFieldHelperId', '#form-input-cpuArchitecture-field-helper');
Cypress.env('pullSecretFieldHelperId', '#form-input-pullSecret-field-helper');
Cypress.env('clusterNameFieldHelperId', '#form-input-name-field-helper');
Cypress.env('baseDnsDomainFieldHelperId', '#form-input-baseDnsDomain-field-helper');
//Disk Encryption
Cypress.env('encryptionOnMastersOff', '#form-input-enableDiskEncryptionOnMasters-field-off');
Cypress.env('encryptionOnMastersOn', '#form-input-enableDiskEncryptionOnMasters-field-on');
Cypress.env('encryptionOnWorkersOff', '#form-input-enableDiskEncryptionOnWorkers-field-off');
Cypress.env('encryptionOnWorkersOn', '#form-input-enableDiskEncryptionOnWorkers-field-on');
Cypress.env('TANG_SERVER_EXPECTED_PATCH', diskEncryptionValues);

