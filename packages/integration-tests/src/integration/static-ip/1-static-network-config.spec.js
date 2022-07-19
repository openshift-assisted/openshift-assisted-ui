import { utils } from '../../support';
import { transformBasedOnUIVersion } from '../../support/transformations';
import { commonActions } from '../../views/common';
import { staticNetConfigsPage } from '../../views/staticNetConfigs';

const yamlConfig = "interfaces:{enter}\
  - name: DUMMY4{enter}\
  type: ethernet{enter}\
state: up{enter}\
ipv4:{enter}\
  address:{enter}\
  - ip: 0.0.0.0{enter}\
  prefix-length: 24{enter}\
{backspace}enabled: true{enter}\
dhcp: false{enter}\
{backspace}{backspace}dns-resolver:{enter}\
  config:{enter}\
  server:{enter}\
  - 192.0.0.2{enter}\
{backspace}{backspace}routes:{enter}\
  config:{enter}\
  - destination: 0.0.0.0/0{enter}\
  next-hop-address: 192.0.0.1{enter}\
next-hop-interface: DUMMY4{enter}\
table-id: 254{enter}{backspace}{backspace}\
";

//  todo:
//    - yaml view: file upload

describe(`Assisted Installer Static IP Cluster Installation`, () => {
  describe('Configuring static IP for SNO', () => {
 
    before(() => {
      cy.loadAiAPIIntercepts({ activeSignal: 'CLUSTER_CREATED', activeScenario: 'AI_CREATE_STATIC_IP_SNO' });
      transformBasedOnUIVersion();
    });

    beforeEach(() => {
      cy.loadAiAPIIntercepts(null);
      cy.visit(`/clusters/${Cypress.env('clusterId')}`);
    });

    it('Can configure network-wide configurations', () => {
      cy.get('h2').should('contain', 'Static network configurations');
      commonActions.getCurrentWizzardStep().should(($steps) => {
        expect($steps).to.have.length(2);
        expect($steps.eq(0)).to.contain("Static network configurations");
        expect($steps.eq(1)).to.contain("Network-wide configurations");
      });
      
      staticNetConfigsPage.formView.inputIpv4MachineNetwork("192.0.0.0");
      staticNetConfigsPage.formView.inputIpv4MachineNetworkPrefixLength("25");

      staticNetConfigsPage.formView.inputIpv4DefaultGateway("192.0.0.1");
      staticNetConfigsPage.formView.inputIpv4Dns("192.0.0.2");

      utils.setTransformSignal('static-ip-1');
      cy.wait("@update-infra-env");

      commonActions.waitForSave();
    });
    
    it('Can configure host specific configurations in form view', () => {
      cy.get('h2').should('contain', 'Static network configurations');
      
      commonActions.clickNextButton();
      commonActions.getCurrentWizzardStep().should(($steps) => {
        expect($steps).to.have.length(2);
        expect($steps.eq(0)).to.contain("Static network configurations");
        expect($steps.eq(1)).to.contain("Host specific configurations");
      });

      staticNetConfigsPage.formView.inputHostMacAddress("00:00:5e:00:53:af");
      staticNetConfigsPage.formView.inputHostIPAddress("192.0.0.10");

      staticNetConfigsPage.formView.getAddHostButton().should('not.exist');

      utils.setTransformSignal("static-ip-host-1");
      cy.wait("@update-infra-env");
      commonActions.clickNextButton();
      commonActions.getHeader('h2').should('contain', 'Host discovery');
    });

    it('Can configure host specific configurations in yaml view', () => {
      commonActions.clickBackButton();
      commonActions.clickNextButton();
      commonActions.getCurrentWizzardStep().should(($steps) => {
        expect($steps).to.have.length(2);
        expect($steps.eq(0)).to.contain("Static network configurations");
        expect($steps.eq(1)).to.contain("Host specific configurations");
      });

      staticNetConfigsPage.enableYamlView();
      staticNetConfigsPage.confirmViewChange();

      staticNetConfigsPage.yamlView.getStartFromScratch().click();

      staticNetConfigsPage.yamlView.getYamlForm().type(yamlConfig);
      staticNetConfigsPage.yamlView.getMacAddressInput().type('00:00:5e:00:53:af');
      staticNetConfigsPage.yamlView.getInterfaceInput().type("host-1");

      staticNetConfigsPage.formView.getAddHostButton().should('not.exist');
      staticNetConfigsPage.yamlView.getCopyConfigurationButton().should('not.exist');

      utils.setTransformSignal("static-ip-host-1-yaml");
      cy.wait("@update-infra-env");
      commonActions.waitForSave();
      commonActions.clickNextButton();
      commonActions.getHeader('h2').should('contain', 'Host discovery');
    });

  });

  describe('Configuring static IP for MNO', () => {
    
    before(() => {
      cy.loadAiAPIIntercepts({ activeSignal: 'CLUSTER_CREATED', activeScenario: 'AI_CREATE_STATIC_IP_MNO' });
      transformBasedOnUIVersion();
    });

    beforeEach(() => {
      cy.loadAiAPIIntercepts(null);
      cy.visit(`/clusters/${Cypress.env('clusterId')}`);
    });

    it('Can configure network-wide configurations', () => {
      cy.get('h2').should('contain', 'Static network configurations');
      commonActions.getCurrentWizzardStep().should(($steps) => {
        expect($steps).to.have.length(2);
        expect($steps.eq(0)).to.contain("Static network configurations");
        expect($steps.eq(1)).to.contain("Network-wide configurations");
      });
      
      staticNetConfigsPage.formView.inputIpv4MachineNetwork("192.0.0.0");
      staticNetConfigsPage.formView.inputIpv4MachineNetworkPrefixLength("25");

      staticNetConfigsPage.formView.inputIpv4DefaultGateway("192.0.0.1");
      staticNetConfigsPage.formView.inputIpv4Dns("192.0.0.2");

      utils.setTransformSignal('static-ip-1');
      cy.wait("@update-infra-env");

      commonActions.waitForSave();
    });
    
    it('Can configure host specific configurations in form view', () => {
      cy.get('h2').should('contain', 'Static network configurations');
      
      commonActions.clickNextButton();
      commonActions.getCurrentWizzardStep().should(($steps) => {
        expect($steps).to.have.length(2);
        expect($steps.eq(0)).to.contain("Static network configurations");
        expect($steps.eq(1)).to.contain("Host specific configurations");
      });

      staticNetConfigsPage.formView.inputHostMacAddress("00:00:5e:00:53:af");
      staticNetConfigsPage.formView.inputHostIPAddress("192.0.0.10");

      staticNetConfigsPage.formView.getAddHostButton().should('exist').click();

      staticNetConfigsPage.formView.inputHostMacAddress("00:00:5e:00:53:ae", 1);
      staticNetConfigsPage.formView.inputHostIPAddress("192.0.0.11", 1);

      utils.setTransformSignal("static-ip-host-2");
      cy.wait("@update-infra-env");
      commonActions.clickNextButton();
      commonActions.getHeader('h2').should('contain', 'Host discovery');
    });

    it('Can configure host specific configurations in yaml view', () => {
      commonActions.clickBackButton();
      commonActions.clickNextButton();
      commonActions.getCurrentWizzardStep().should(($steps) => {
        expect($steps).to.have.length(2);
        expect($steps.eq(0)).to.contain("Static network configurations");
        expect($steps.eq(1)).to.contain("Host specific configurations");
      });

      staticNetConfigsPage.enableYamlView();
      staticNetConfigsPage.confirmViewChange();

      staticNetConfigsPage.yamlView.getStartFromScratch().click();

      staticNetConfigsPage.yamlView.getYamlForm().type(yamlConfig);
      staticNetConfigsPage.yamlView.getMacAddressInput().type('00:00:5e:00:53:af');
      staticNetConfigsPage.yamlView.getInterfaceInput().type("host-1");

      staticNetConfigsPage.yamlView.getCopyConfigurationButton().should('exist').check();
      staticNetConfigsPage.yamlView.getAddHostButton().should('exist').click();


      staticNetConfigsPage.yamlView.getMacAddressInput(1).clear().type('00:00:5e:00:53:ae');
      staticNetConfigsPage.yamlView.getInterfaceInput(1).clear().type("host-2");
      

      utils.setTransformSignal("static-ip-host-2-yaml");
      cy.wait("@update-infra-env");
      commonActions.waitForSave();
      commonActions.clickNextButton();
      commonActions.getHeader('h2').should('contain', 'Host discovery');
    });
  });
});
