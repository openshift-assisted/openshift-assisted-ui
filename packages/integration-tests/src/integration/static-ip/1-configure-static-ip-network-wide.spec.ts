import { commonActions } from '../../views/common';
import { transformBasedOnUIVersion } from '../../support/transformations';
import { staticIpPage } from '../../views/staticIpPage';

type NetworkSelection = 'ipv4' | 'dual-stack';
const ACTIVE_NAV_ITEM_CLASS = 'pf-m-current';

const machineNetworkPrefix = '20';
const dnsText = '192.168.1.45';

const ipv4Fields = {
  machineNetwork: '192.168.1.13',
  gateway: '192.168.1.32',
}

const ipv6Fields = {
  machineNetwork: '2340::',
  gateway: '2340::f',
}

const validateStaticIpRequest = (requestBody, ipVersion: NetworkSelection) => {
  const submitYaml = requestBody.static_network_config[0].network_yaml;
  let count = 0;
  const includedValues = ipVersion === 'ipv4' ? [dnsText, ipv4Fields.gateway, ipv4Fields.machineNetwork] : [dnsText, ipv4Fields.gateway, ipv4Fields.machineNetwork, ipv6Fields.gateway, ipv6Fields.machineNetwork];
  includedValues.forEach((includedValue) => {
    expect(submitYaml).to.contain(includedValue);
    count++;
  });
  expect(count).to.eq(includedValues.length);
}

const fillStaticIpForm = (networkSelection: NetworkSelection, fields) => {
  const ipVersion = networkSelection === 'dual-stack' ? 'ipv6' : 'ipv4';
  staticIpPage.networkWideMachineNetwork(ipVersion).type(fields.machineNetwork);
  staticIpPage.networkWideMachineNetworkPrefix(ipVersion).type(machineNetworkPrefix);
  staticIpPage.networkWideMachineGateway(ipVersion).type(fields.gateway);
}

describe(`Assisted Installer Static IP Network wide Configuration`, () => {
  before(() => {
    cy.loadAiAPIIntercepts({
      activeSignal: 'STATIC_IP_ENABLED',
      activeScenario: 'AI_CREATE_STATIC_IP',
    });
    transformBasedOnUIVersion();
  });

  beforeEach(() => {
    cy.loadAiAPIIntercepts(null);
    commonActions.visitClusterDetailsPage();
  });

  describe('Configuring Static IP - Form view', () => {
    it('Can configure single stack static IP', () => {
      commonActions.getWizardStepNav('Static network configurations').click();
      commonActions.getWizardStepNav('Network-wide configurations').should('have.class', ACTIVE_NAV_ITEM_CLASS);
      commonActions.getWizardStepNav('Host specific configurations').should('not.have.class', ACTIVE_NAV_ITEM_CLASS);

      commonActions.getNextButton().should('be.disabled');
      staticIpPage.networkWideDns().type(dnsText);
      fillStaticIpForm('ipv4', ipv4Fields);

      commonActions.getDangerAlert().should('not.exist');
      commonActions.getNextButton().should('be.disabled'); // auto-save is triggered

      cy.wait('@update-infra-env').then((({ request }) => {
        validateStaticIpRequest(request.body, 'ipv4');
        commonActions.getNextButton().should('be.enabled');
      }));
    });

    it('Can configure dual stack Static IP', () => {
      commonActions.getWizardStepNav('Static network configurations').click();
      staticIpPage.dualStackNetworking().click();

      commonActions.getNextButton().should('be.disabled');
      staticIpPage.networkWideDns().type(dnsText);
      fillStaticIpForm('ipv4', ipv4Fields);
      fillStaticIpForm('dual-stack', ipv6Fields);

      commonActions.getDangerAlert().should('not.exist');
      commonActions.getNextButton().should('be.disabled'); // auto-save is triggered

      cy.wait('@update-infra-env').then((({ request }) => {
        validateStaticIpRequest(request.body, 'dual-stack');
        commonActions.getNextButton().should('be.enabled');
      }));

      commonActions.getNextButton().click();

      commonActions.getWizardStepNav('Network-wide configurations').should('not.have.class', ACTIVE_NAV_ITEM_CLASS);
      commonActions.getWizardStepNav('Host specific configurations').should('have.class', ACTIVE_NAV_ITEM_CLASS);
    });
  });
});

