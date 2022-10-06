export const clusterDetailsPage = {
  getClusterNameField: () => {
    return cy.get(Cypress.env('clusterNameFieldId'));
  },
  inputClusterName: (clusterName = Cypress.env('CLUSTER_NAME')) => {
    clusterDetailsPage.getClusterNameField().should('be.visible').clear().type(clusterName);
  },
  getOpenshiftVersionField: () => {
    return cy.get(Cypress.env('openshiftVersionFieldId'));
  },
  inputOpenshiftVersion: (version = Cypress.env('OPENSHIFT_VERSION')) => {   
    // since version 2.11 we change the openshiftVersion dropdown
    cy.get(`#form-input-openshiftVersion-field > button.pf-c-dropdown__toggle`).click();
    cy.get(`ul.pf-c-dropdown__menu`).within(() => {
      cy.get('li').contains(version).click();
    });
    cy.get(`#form-input-openshiftVersion-field .pf-c-dropdown__toggle-text`).should(
      'contain',
      `OpenShift ${version}`,
    );
  },
  getPullSecret: () => {
    return cy.get(Cypress.env('pullSecretFieldId'));
  },
  getPullSecretFieldHelper: () => {
    return cy.get(Cypress.env('pullSecretFieldHelperId'));
  },
  inputPullSecret: (pullSecret = Cypress.env('PULL_SECRET')) => {
    if (Cypress.env('OCM_USER')) {
      clusterDetailsPage.getPullSecret().check();
    }
    clusterDetailsPage.getPullSecret().clear();
    cy.pasteText(Cypress.env('pullSecretFieldId'), pullSecret);
    clusterDetailsPage.getPullSecret().should('contain', pullSecret);
  },
  checkAiTechSupportLevel: () => {
    cy.get(Cypress.env('assistedInstallerSupportLevel'))
      .should('be.visible')
      .contains(Cypress.env('techPreviewSupportLevel'));
  },
  checkSnoDevSupportLevel: () => {
    cy.get(Cypress.env('snoSupportLevel')).should('be.visible').contains(Cypress.env('devPreviewSupportLevel'));
  },
  getBaseDnsDomain: () => {
    return cy.get(Cypress.env('baseDnsDomainFieldId'));
  },
  inputbaseDnsDomain: (dns = Cypress.env('DNS_DOMAIN_NAME')) => {
    clusterDetailsPage.getBaseDnsDomain().clear().type(dns).should('have.value', dns);
  },
  getSno: () => {
    return cy.get(Cypress.env('highAvailabilityModeFieldId'));
  },
  enableSno: () => {
    clusterDetailsPage.getSno().should('be.visible').check();
    clusterDetailsPage.getSno().should('be.checked');
  },
  getCpuArchitectureField: () => {
    return cy.get(Cypress.env('cpuArchitectureFieldId'));
  },
  validateInputCpuArchitectureLabelHelper: (msg) => {
    cy.get('.pf-c-form__group-control > .pf-c-check > .pf-c-check__label > .pf-c-button > svg').click();
    cy.get('.pf-c-popover__content').should('contain', msg);
  },
  enableCpuArchitecture: () => {
    clusterDetailsPage.getCpuArchitectureField().should('be.visible').check();
    clusterDetailsPage.getCpuArchitectureField().should('be.checked');
  },
  disableCpuArchitecture: () => {
    clusterDetailsPage.getCpuArchitectureField().should('be.visible').uncheck();
    clusterDetailsPage.getCpuArchitectureField().should('not.be.checked');
  },
  getSnoDisclaimer: () => {
    return cy.get(Cypress.env('checkboxSNODisclaimerFieldId'));
  },
  getRedHatDnsServiceCheck: () => {
    return cy.get(Cypress.env('useRedHatDnsServiceFieldId'));
  },
  setRedHatDnsService: () => {
    // set first option val to dnsDomain
    cy.get(`#form-input-baseDnsDomain-field > option`)
      .eq(0)
      .then((option) => {
        Cypress.env('route53Dns', option.val());
      });
  },
  enableStaticNetworking: () => {
    cy.get(`.pf-c-radio__label:contains(${Cypress.env('enableStaticIpRadioButtonText')})`)
      .scrollIntoView()
      .click({ force: true });
  },
  validateInputNameFieldHelper: (status) => {
    cy.get(`[aria-label='Validation'] > svg`)
      .invoke('attr', 'fill')
      .should('contain', status === 'fail' ? '#c9190b' : '#3e8635');
  },
  getClusterNameFieldValidator: () => {
    return cy.get(Cypress.env('clusterNameFieldValidator'));
  },
  validateInputNameFieldHelperError: (...childNums: number[]) => {
    clusterDetailsPage.getClusterNameFieldValidator().click();
    for (let i = 0; i < childNums.length; i++) {
      cy.get(`[id^=popover-pf-] > ul > :nth-child(${childNums[i]})`).should(
        'have.class',
        'pf-c-helper-text__item pf-m-error pf-m-dynamic',
      );
    }
  },
  getInputDnsDomainFieldHelper: () => {
    return cy.get(Cypress.env('baseDnsDomainFieldHelperId'));
  },
  getClusterDetailsBody: () => {
    return cy.get('.pf-l-grid');
  },
};
