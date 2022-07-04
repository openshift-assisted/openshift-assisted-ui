export const setVarsBasedOnHostname = () => {
  cy.runCmd('hostname', true);
  cy.get('@runCmdAlias').then((obj) => {
    if (obj.stdout.includes('tlv')) {
      Cypress.env('WAIT_FOR_CONSOLE_TIMEOUT', Cypress.env('WAIT_FOR_CONSOLE_TIMEOUT') * 2);
    }
    if (obj.stdout.includes(Cypress.env('BAREMETAL_QE3'))) {
      Cypress.env('IS_BAREMETAL', true);
    }
  });
};

export const transformBasedOnUIVersion = () => {
  // This is just a placeholder function.
  // If at some point we need to adapt selectors for version changes, apply the pattern below:
  // Define a map with a structure similar to this:
  // const selectorChangesMap = {
  //   selectorX: {
  //     introducedIn: '1.34.3',
  //     before: 'SelectorBefore',
  //     after: 'SelectorAfter',
  //   },
  // }
  // Create functions that will check if the adaptation is required and that will apply them
  // if (isAdaptationRequired('SelectorX', uiVersion)) {
  //   applySelectorXAdaptation('SelectorX');
  // }
};

export const transformBasedOnBEVersion = () => {
  cy.getComponentVersions(Cypress.env('API_BASE_URL'), true);
  cy.get('@getComponentVersions')
    .its('body')
    .then((getComponentVersions) => {
      const beVersion = getComponentVersions.release_tag || 'latest';
      cy.log(`BE Version: ${beVersion}`);
    });
};
