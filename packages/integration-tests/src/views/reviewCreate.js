export const reviewAndCreatePage = {
  validateClusterDetails: (
    clusterName = Cypress.env('CLUSTER_NAME'),
    dns = Cypress.env('DNS_DOMAIN_NAME'),
    version = Cypress.env('OPENSHIFT_VERSION'),
  ) => {
    cy.get(Cypress.env('clusterAddressValueId')).should('contain', `${clusterName}.${dns}`);
    cy.get(Cypress.env('openshiftVersionValueId')).should('contain', version);
  },
  getClusterValidations: (timeout = 1000) => {
    return cy.get(Cypress.env('clusterValidationsValueId'), { timeout: timeout });
  },
  getHostValidations: (timeout = 1000) => {
    return cy.get(Cypress.env('hostValidationsValueId'), { timeout: timeout });
  },
  checkAllValidationsPassed: (element) => {
    element.should('contain', Cypress.env('allValidationsPassedText'));
  },
  waitForInstallButton: (timeout = Cypress.env('START_INSTALLATION_TIMEOUT')) => {
    cy.get(Cypress.env('buttonInstall'), { timeout: timeout }).should('be.enabled');
  },
  getInstallButton: () => {
    return cy.get(Cypress.env('buttonInstall'));
  },
};
