import { utils } from '../../support';
import { transformBasedOnUIVersion } from '../../support/transformations';
import { commonActions } from '../../views/common';
import { staticNetConfigsPage } from '../../views/staticNetConfigs';



//  todo:
//    - yaml view: file upload

describe(`Assisted Installer Static IP Cluster Installation`, () => {
  before(() => {
    cy.loadAiAPIIntercepts({ activeSignal: 'CLUSTER_CREATED', activeScenario: 'AI_CREATE_STATIC_IP_SNO' });
    transformBasedOnUIVersion();
  });

  beforeEach(() => {
    cy.loadAiAPIIntercepts(null);
    cy.visit(`/clusters/${Cypress.env('clusterId')}`);
  });
  

  describe('Configuring static IP for SNO', () => {
    it('Can configure host specific configurations in yaml view', () => {
      commonActions.getHeader('h2').should('contain', 'Static network configurations');
      
      commonActions.getCurrentWizzardStep().should(($steps) => {
        expect($steps).to.have.length(2);
        expect($steps.eq(0)).to.contain("Static network configurations");
        expect($steps.eq(1)).to.contain("Network-wide configurations");
      });

      staticNetConfigsPage.enableYamlView();
      staticNetConfigsPage.confirmViewChange();

      cy.get(Cypress.env('inputTypeFile')).attachFile(`files/static-ip.yaml`);

      staticNetConfigsPage.yamlView.getMacAddressInput().type('00:00:5e:00:53:af');
      staticNetConfigsPage.yamlView.getInterfaceInput().type("host-1");

      staticNetConfigsPage.yamlView.getAddHostButton().should('not.exist');

      utils.setTransformSignal("static-ip-host-1-yaml");
      cy.wait("@update-infra-env");
      commonActions.waitForSave();

      cy.reload();
      staticNetConfigsPage.getYamlView().should('be.checked');

      commonActions.clickNextButton();
    });


    it('Can configure network-wide configurations', () => {
      cy.get('h2').should('contain', 'Static network configurations');
      commonActions.getCurrentWizzardStep().should(($steps) => {
        expect($steps).to.have.length(1);
        expect($steps.eq(0)).to.contain("Static network configurations");
      });

      staticNetConfigsPage.enableFormView();
      staticNetConfigsPage.confirmViewChange();

      commonActions.getCurrentWizzardStep().should(($steps) => {
        expect($steps).to.have.length(2);
        expect($steps.eq(0)).to.contain("Static network configurations");
        expect($steps.eq(1)).to.contain("Network-wide configurations");
      });
      
      staticNetConfigsPage.formView.inputDns("192.0.0.2");
      staticNetConfigsPage.formView.inputIpv4MachineNetwork("192.0.0.0");
      staticNetConfigsPage.formView.inputIpv4MachineNetworkPrefixLength(25);

      staticNetConfigsPage.formView.inputIpv4DefaultGateway("192.0.0.1");

      utils.setTransformSignal('static-ip-1');
      cy.wait("@update-infra-env");

      commonActions.waitForSave();
    });

    it('Can read network-wide configurations from the infra-env YAML', () => {
      staticNetConfigsPage.getFormView().should('be.checked');
      staticNetConfigsPage.formView.getProtocolVersionSelect().should('have.value', 'ipv4');
      staticNetConfigsPage.formView.getVlanCheckbox().should('not.be.checked');

      staticNetConfigsPage.formView.getDNS().should('have.value', '192.0.0.2');
      staticNetConfigsPage.formView.getIPv4MachineNetwork().should('have.value', '192.0.0.0');
      staticNetConfigsPage.formView.getIpv4MachineNetworkPrefixLength().should('have.value', 25);
      staticNetConfigsPage.formView.getIPv4DefaultGateway().should('have.value', '192.0.0.1');
    })

    it('Should have empty host specific configurations', () => {
      commonActions.clickNextButton();

      staticNetConfigsPage.formView.getMACAddress().should('be.empty');
      staticNetConfigsPage.formView.getIPv4Address().should('be.empty');
    })
    
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

      staticNetConfigsPage.formView.getAddHostConfigButton().should('not.exist');

      utils.setTransformSignal("static-ip-host-1");
      cy.wait("@update-infra-env");
      commonActions.waitForSave();
    });
    
    it('Should have empty host specific configurations', () => {

      commonActions.clickBackButton(); // host discovery -> operators
      commonActions.clickBackButton(); // operators -> static ip
      commonActions.clickNextButton(); // network-wide -> host specific

      staticNetConfigsPage.formView.getMACAddress().should('have.value', "00:00:5e:00:53:af");
      staticNetConfigsPage.formView.getIPv4Address().should('have.value', "192.0.0.10");
      commonActions.clickNextButton();
      commonActions.getHeader('h2').should('contain', 'Operators');
    })

    it('Can configure network-wide to dual-stack', () => {

      commonActions.clickBackButton(); // host discovery -> operators
      commonActions.clickBackButton(); // operators -> static ip
      staticNetConfigsPage.formView.selectInternetProtocolVersion('Dual Stack');

      staticNetConfigsPage.formView.inputIpv6MachineNetwork("1234:db8::");
      staticNetConfigsPage.formView.inputIpv6MachineNetworkPrefixLength("100");
      staticNetConfigsPage.formView.inputIpv6DefaultGateway("1234:db8::ab");

      utils.setTransformSignal("static-ip-dual-stack");
      cy.wait("@update-infra-env");
      commonActions.waitForSave();
    })

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

      staticNetConfigsPage.formView.inputDns("192.0.0.2");
      
      staticNetConfigsPage.formView.inputIpv4MachineNetwork("192.0.0.0");
      staticNetConfigsPage.formView.inputIpv4MachineNetworkPrefixLength("25");

      staticNetConfigsPage.formView.inputIpv4DefaultGateway("192.0.0.1");

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

      staticNetConfigsPage.formView.getAddHostConfigButton().should('exist');
      staticNetConfigsPage.formView.getAddHostConfigButton().should('exist').click();

      staticNetConfigsPage.formView.inputHostMacAddress("00:00:5e:00:53:ae", 1);
      staticNetConfigsPage.formView.inputHostIPAddress("192.0.0.11", 1);

      utils.setTransformSignal("static-ip-host-2");
      cy.wait("@update-infra-env");
      commonActions.clickNextButton();
      commonActions.getHeader('h2').should('contain', 'Operators');
    });

    it('Can configure host specific configurations in yaml view', () => {
      commonActions.clickBackButton(); // host discovery -> operators
      commonActions.clickBackButton(); // operators -> static ip
      
      commonActions.getCurrentWizzardStep().should(($steps) => {
        expect($steps).to.have.length(2);
        expect($steps.eq(0)).to.contain("Static network configurations");
        expect($steps.eq(1)).to.contain("Network-wide configurations");
      });

      staticNetConfigsPage.enableYamlView();
      staticNetConfigsPage.confirmViewChange();

      cy.get(Cypress.env('inputTypeFile')).attachFile(`files/static-ip.yaml`);
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
      commonActions.getHeader('h2').should('contain', 'Operators');
    });
  });
});
