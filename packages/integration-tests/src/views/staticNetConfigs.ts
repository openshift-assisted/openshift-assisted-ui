import * as YAML from 'yaml';

export const staticNetConfigsPage = {
  getYamlView: () => cy.get(Cypress.env('yamlView')),
  getFormView: () => cy.get(Cypress.env('formView')),
  enableYamlView: () => {
    staticNetConfigsPage.getYamlView()
      .scrollIntoView()
      .click({ force: true });
  },
  enableFormView: () => {
    staticNetConfigsPage.getFormView()
      .scrollIntoView()
      .click({ force: true });
  },
  confirmViewChange: () => {
    cy.get('body').then(($body) => {
      if ($body.hasClass('pf-c-backdrop__open')) {
        cy.get(`button[data-testid='confirm-modal-submit']`).click();
      }
    });
  },
  formView: {
    getProtocolVersionSelect: () => cy.get(Cypress.env('selectProtocolVersion')),
    getVlanCheckbox: () => cy.get(Cypress.env('useVlan')),
    getIPv4MachineNetwork: () => cy.get(Cypress.env('ipv4MachineNetworkIp')),
    getIpv4MachineNetworkPrefixLength: () => cy.get(Cypress.env('ipv4MachineNetworkPrefixLength')),
    getIPv6MachineNetwork: () => cy.get(Cypress.env('ipv6MachineNetworkIp')),
    getIpv6MachineNetworkPrefixLength: () => cy.get(Cypress.env('ipv6MachineNetworkPrefixLength')),
    getIPv4DefaultGateway: () => cy.get(Cypress.env('ipv4Gateway')),
    getDNS: () => cy.get(Cypress.env('dns')),
    getMACAddress: (index = 0) => cy.get(`[data-testid=mac-address-${index}]`),
    getIPv4Address: (index = 0) => cy.get(`[data-testid=ipv4-address-${index}]`),
    getIPv6Address: (index = 0) => cy.get(`[data-testid=ipv6-address-${index}]`),
    getAddHostConfigButton: () => cy.get(Cypress.env('addHostDataTestId')),

    selectInternetProtocolVersion: (ipVersion = Cypress.env('ASSISTED_STATIC_IP_VERSION')) => {
      staticNetConfigsPage.formView.getProtocolVersionSelect().select(ipVersion);
    },
    enableVlan: () => {
      staticNetConfigsPage.formView.getVlanCheckbox().check().should('be.checked');
    },
    disableVlan: () => {
      staticNetConfigsPage.formView.getVlanCheckbox().uncheck().should('be.unchecked');
    },
    inputVlanId: (vlanId = Cypress.env('ASSISTED_STATIC_IP_VLAN')) => {
      cy.get(Cypress.env('vlanId')).type(vlanId);
    },
    inputIpv4MachineNetwork: (ipv4MachineNetwork) => {
      staticNetConfigsPage.formView.getIPv4MachineNetwork().type(ipv4MachineNetwork);
    },
    inputIpv4MachineNetworkPrefixLength: (ipv4PrefixLength) => {
      staticNetConfigsPage.formView.getIpv4MachineNetworkPrefixLength().type(ipv4PrefixLength);
    },
    inputIpv4DefaultGateway: (ipv4DefaultGateway) => {
      staticNetConfigsPage.formView.getIPv4DefaultGateway().type(ipv4DefaultGateway);
    },
    inputDns: (dns) => {
      staticNetConfigsPage.formView.getDNS().type(dns);
    },
    inputIpv6MachineNetwork: (ipv6MachineNetwork) => {
      cy.get(Cypress.env('ipv6MachineNetworkIp')).type(ipv6MachineNetwork);
    },
    inputIpv6MachineNetworkPrefixLength: (ipv6PrefixLength) => {
      cy.get(Cypress.env('ipv6MachineNetworkPrefixLength')).type(ipv6PrefixLength);
    },
    inputIpv6DefaultGateway: (ipv6DefaultGateway) => {
      cy.get(Cypress.env('ipv6Gateway')).type(ipv6DefaultGateway);
    },
    inputHostMacAddress: (macAddress, index = 0) => {
      staticNetConfigsPage.formView.getMACAddress(index).type(macAddress);
    },
    inputHostIPAddress: (ipAddress, index = 0) => {
      staticNetConfigsPage.formView.getIPv4Address(index).type(ipAddress);
    },
    addHostsFormViewInterfaceMappings: () => {
      if (Cypress.env('MASTER_MAC_ADDRESSES')) {
        cy.wrap(Cypress.env('MASTER_MAC_ADDRESSES')).each((masterMac, index) => {
          cy.fixture(`${masterMac}.json`).then((masterMacMapping) => {
            // Interface mapping currently only contains one interface..
            // This might change in the future
            staticNetConfigsPage.formView.getMACAddress(index).scrollIntoView().type(masterMacMapping[0].mac_address);
            cy.fixture(`${masterMac}.yaml`).then((masterMacYaml) => {
              staticNetConfigsPage.formView.getIPv4Address(index).type(
                YAML.parse(masterMacYaml)['interfaces'][0]['ipv4']['address'][0]['ip'],
              );
              if (Cypress.env('ASSISTED_STATIC_IP_VERSION') === 'dualstack') {
                staticNetConfigsPage.formView.getIPv6Address(index).type(
                  YAML.parse(masterMacYaml)['interfaces'][0]['ipv6']['address'][0]['ip'],
                );
              }
            });
          });
          if (index < Cypress.env('NUM_MASTERS') - 1) {
            staticNetConfigsPage.formView.getAddHostConfigButton().click();
          }
        });
      }
      if (Cypress.env('WORKER_MAC_ADDRESSES')) {
        staticNetConfigsPage.formView.getAddHostConfigButton().click();
        cy.wrap(Cypress.env('WORKER_MAC_ADDRESSES')).each((workerMac, index) => {
          cy.fixture(`${workerMac}.json`).then((workerMacMapping) => {
            const macIndex = index + Number(Cypress.env('NUM_MASTERS'));
            // Interface mapping currently only contains one interface.. This might change in the future
            staticNetConfigsPage.formView.getMACAddress(index).scrollIntoView().type(workerMacMapping[0].mac_address);
            cy.fixture(`${workerMac}.yaml`).then((workerMacYaml) => {
              staticNetConfigsPage.formView.getIPv4Address(index).type(
                YAML.parse(workerMacYaml)['interfaces'][0]['ipv4']['address'][0]['ip'],
              );
              if (Cypress.env('ASSISTED_STATIC_IP_VERSION') === 'dualstack') {
                staticNetConfigsPage.formView.getIPv6Address(macIndex).type(
                  YAML.parse(workerMacYaml)['interfaces'][0]['ipv6']['address'][0]['ip'],
                );
              }
            });
          });
          if (index < Cypress.env('NUM_WORKERS') - 1) {
            staticNetConfigsPage.formView.getAddHostConfigButton().click();
          }
        });
      }
    },
  },
  yamlView: {
    getStartFromScratch: () => {
      return cy.get(`.pf-c-empty-state__secondary > .pf-c-button:contains(${Cypress.env('yamlStartFromScratchText')})`);
    },
    getYamlForm: () => {
      return cy.get('.inputarea.monaco-mouse-cursor-text');
    },
    getMacAddressInput: (index = 0) => {
      return cy.get(`[data-testid="mac-address-${index}-0"`);
    },
    getInterfaceInput: (index = 0) => {
      return cy.get(`[data-testid="interface-name-${index}-0"`);
    },
    getAddHostButton: () => {
      return cy.get('button[data-testid="add-host"]');
    },
    getCopyConfigurationButton: () => {
      return cy.get('input[data-testid="copy-host-configuration"]');
    },
    addHostsYamlAndInterfaceMappings: () => {
      if (Cypress.env('MASTER_MAC_ADDRESSES')) {
        cy.wrap(Cypress.env('MASTER_MAC_ADDRESSES')).each((masterMac, index) => {
          cy.get(Cypress.env('inputTypeFile')).attachFile(`${masterMac}.yaml`);
          cy.fixture(`${masterMac}.json`).then((masterMacMapping) => {
            // Interface mapping currently only contains one interface.. This might change in the future
            cy.get(`[data-testid=mac-address-${index}-0]`).scrollIntoView().type(masterMacMapping[0].mac_address);
            cy.get(`[data-testid=interface-name-${index}-0]`)
              .scrollIntoView()
              .type(masterMacMapping[0].logical_nic_name);
          });
          cy.get(Cypress.env('copyHostConfiguration')).uncheck();
          if (index < Cypress.env('NUM_MASTERS') - 1) {
            staticNetConfigsPage.formView.getAddHostConfigButton().click();
          }
        });
      }
      if (Cypress.env('WORKER_MAC_ADDRESSES')) {
        staticNetConfigsPage.formView.getAddHostConfigButton().click();
        cy.wrap(Cypress.env('WORKER_MAC_ADDRESSES')).each((workerMac, index) => {
          cy.get(Cypress.env('inputTypeFile')).attachFile(`${workerMac}.yaml`);
          cy.fixture(`${workerMac}.json`).then((workerMacMapping) => {
            const macIndex = index + Number(Cypress.env('NUM_MASTERS'));
            // Interface mapping currently only contains one interface. This might change in the future
            cy.get(`[data-testid=mac-address-${macIndex}-0]`).scrollIntoView().type(workerMacMapping[0].mac_address);
            cy.get(`[data-testid=interface-name-${macIndex}-0]`)
              .scrollIntoView()
              .type(workerMacMapping[0].logical_nic_name);
          });
          cy.get(Cypress.env('copyHostConfiguration')).uncheck();
          if (index < Cypress.env('NUM_WORKERS') - 1) {
            staticNetConfigsPage.formView.getAddHostConfigButton().click();
          }
        });
      }
    },
  },
};
