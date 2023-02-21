export const staticIpPage = {
  getAddMoreHosts: () => {
    return cy.get('[data-testid="add-host"]');
  },
  networkWideDns: () => {
    return cy.get(`#form-input-dns-field`);
  },
  networkWideMachineNetwork: (ipVersion) => {
    return cy.get(`#form-input-ipConfigs-${ipVersion}-machineNetwork-ip-field`);
  },
  networkWideMachineNetworkPrefix: (ipVersion) => {
    return cy.get(`#form-input-ipConfigs-${ipVersion}-machineNetwork-prefixLength-field`);
  },
  networkWideMachineGateway: (ipVersion) => {
    return cy.get(`#form-input-ipConfigs-${ipVersion}-gateway-field`);
  },
  hostSpecificMacAddress: (hostIdx: number) => {
    return cy.get(`[data-testid="mac-address-${hostIdx}"]`);
  },
  hostSpecificIpv4Address: (hostIdx: number) => {
    return cy.get(`[data-testid="ipv4-address-${hostIdx}"]`);
  },
  dualStackNetworking: () => {
    return cy.get('#form-radio-protocolType-dualStack-field');
  },
};
