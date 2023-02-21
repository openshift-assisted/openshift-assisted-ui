import { commonActions } from '../../views/common';
import { transformBasedOnUIVersion } from '../../support/transformations';
import { staticIpPage } from '../../views/staticIpPage';

describe(`Assisted Installer Static IP Host specific Configuration`, () => {
  before(() => {
    cy.loadAiAPIIntercepts({
      activeSignal: 'STATIC_IP_NETWORK_WIDE_CONFIGURED',
      activeScenario: 'AI_CREATE_STATIC_IP',
    });
    transformBasedOnUIVersion();
  });

  beforeEach(() => {
    cy.loadAiAPIIntercepts(null);
    commonActions.visitClusterDetailsPage();
  });

  it('Can enter host specific config using Form View', () => {
    commonActions.getNextButton().click();

    staticIpPage.getAddMoreHosts().should('be.disabled');
    staticIpPage.hostSpecificMacAddress(0).type('00:00:5e:00:53:af');
    staticIpPage.hostSpecificIpv4Address(0).type('192.168.2.38');

    staticIpPage.hostSpecificMacAddress(1).should('not.exist');
    staticIpPage.getAddMoreHosts().should('be.enabled');
    staticIpPage.getAddMoreHosts().click();
    staticIpPage.hostSpecificMacAddress(1).type('00:00:5e:00:53:ae');
    staticIpPage.hostSpecificIpv4Address(1).type('192.168.2.39');

    commonActions.getNextButton().should('be.enabled');
    commonActions.getNextButton().click();
  });
});
