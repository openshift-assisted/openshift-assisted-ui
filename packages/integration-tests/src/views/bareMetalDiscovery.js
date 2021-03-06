export const bareMetalDiscoveryPage = {
  getAddHostsButton: () => {
    return cy.get(Cypress.env('hostInventoryDownloadDiscoveryIso'));
  },
  openAddHostsModal: () => {
    // This button is detached sometimes. We add extra guards to always be able to click it
    cy.get(Cypress.env('hostInventoryDownloadDiscoveryIso')).scrollIntoView().click();
  },
  getGenerateDay2IsoButton: () => {
    return cy.get(Cypress.env('bareMetalInventoryAddHostsButtonDownloadDiscoveryIso'));
  },
  setClusterIdFromUrl: () => {
    cy.url().then((url) => {
      const clusterId = url.split('/')[url.split('/').length - 1];
      Cypress.env('clusterId', clusterId);
    });
  },
  getCnvField: () => {
    return cy.get(Cypress.env('useContainerNativeVirtualizationField'));
  },
  getOcsOperator: () => {
    return cy.get(Cypress.env('useExtraDisksForLocalStorageField'));
  },
  getIntegrationWithvSphere: () => {
    return cy.get('#form-input-usePlatformIntegration-field');
  },
  getIntegrationWithvSphereToggle: () => {
    return cy
      .contains('.pf-c-switch', Cypress.env('integrateWithVsphere'))
      .find('.pf-c-switch__toggle');
  },
  toggleIntegrateWithvSphere: () => {
    bareMetalDiscoveryPage.getIntegrationWithvSphereToggle().click();
  },
  validateToggleIntegrateWithvSphereIsBlue: () => {
    bareMetalDiscoveryPage
      .getIntegrationWithvSphereToggle()
      .should('have.css', 'background-color', 'rgb(0, 102, 204)');
  },
  waitForHostTablePopulation: (
    numMasters = Cypress.env('NUM_MASTERS'),
    numWorkers = Cypress.env('NUM_WORKERS'),
    timeout = Cypress.env('HOST_REGISTRATION_TIMEOUT'),
  ) => {
    cy.get('table.hosts-table > tbody', { timeout: timeout }).should(($els) => {
      expect($els.length).to.be.eq(numMasters + numWorkers);
      if (numMasters + numWorkers === 1) {
        expect($els[0].textContent).not.to.contain('Waiting for host');
      }
    });
  },
  setHostRoles: () => {
    // temporary until MGMT-10634 is resolved
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
    for (let i = 0; i <= Cypress.env('WORKER_HOST_ROW_MAX_INDEX'); i += 2) {
      cy.get(`[data-testid=host-row-${i}] > ${Cypress.env('hostRole')} > .pf-c-dropdown`).trigger(
        'click',
      );
      cy.get('.pf-c-dropdown__menu').should('be.visible');
      if (i <= Cypress.env('MASTER_HOST_ROW_MAX_INDEX')) {
        cy.get('.pf-c-dropdown__menu-item-main')
          .contains(Cypress.env('HOST_ROLE_MASTER_LABEL'))
          .click();
      } else {
        cy.get('.pf-c-dropdown__menu-item-main')
          .contains(Cypress.env('HOST_ROLE_WORKER_LABEL'))
          .click();
      }
      cy.get('.pf-c-dropdown__menu').should('not.exist');
    }
  },
  waitForHardwareStatus: (
    status,
    numMasters = Cypress.env('NUM_MASTERS'),
    numWorkers = Cypress.env('NUM_WORKERS'),
    timeout = Cypress.env('HOST_READY_TIMEOUT'),
  ) => {
    // Start at index 2 here because of selector
    for (let i = 2; i <= numMasters + numWorkers + 1; i++) {
      cy.hostDetailSelector(i, 'Status', timeout).should('contain', status);
    }
  },
  waitForHostRowToContain: (text, timeout = Cypress.env('HOST_DISCOVERY_TIMEOUT')) => {
    cy.get('table.hosts-table > tbody > tr', { timeout: timeout }).should('contain', text);
  },
  selectHostRowKebabAction: (rowIndex, actionItem) => {
    cy.get(`[data-testid=host-row-${rowIndex}] > .pf-c-table__action`).scrollIntoView().click();
    cy.get('li').contains(actionItem).click();
  },
  getHostTableMassActions: () => {
    return cy.get('.pf-c-toolbar.table-toolbar');
  },
  getHostRowSelectCheckbox: (hostIndex = 0) => {
    return cy.get(`[data-testid=host-row-${hostIndex}]`).find('.pf-c-check__input');
  },
  validateIsReadOnlyHostMenu: () => {
    cy.get(`[data-testid=host-row-0] > .pf-c-table__action`).scrollIntoView().click();
    cy.get('[role="menuitem"][id^=button-view-host-events]').should('be.visible');
    cy.get('[role="menuitem"][id^=button-edit-host]').should('not.exist');
    cy.get('[role="menuitem"][id^=button-delete-host]').should('not.exist');
  },
  massRenameHosts: (prefix) => {
    cy.get('.table-toolbar .pf-c-toolbar__item:first').click();
    cy.get('.table-toolbar .pf-c-toolbar__item:last').click();
    cy.get('ul[role="menu"]').within(() => {
      cy.get('[role="menuitem"]')
        .contains(Cypress.env('hostRowKebabMenuChangeHostnameText'))
        .click();
    });
    bareMetalDiscoveryPage.renameHost(`${prefix}-{{n}}`);
    bareMetalDiscoveryPage.clickSaveEditHostsForm();
  },
  getHostNameInput: () => {
    return cy.get(Cypress.env('hostnameFieldId'));
  },
  renameHost: (newHostName) => {
    bareMetalDiscoveryPage
      .getHostNameInput()
      .clear()
      .type(newHostName, { parseSpecialCharSequences: false });
    bareMetalDiscoveryPage.getHostNameInput().should('have.value', newHostName);
  },
  deleteHost: () => {
    cy.get('.pf-c-modal-box__footer').should('be.visible');
    cy.get('.pf-c-modal-box__footer').within(() => {
      cy.get(Cypress.env('deleteHostSubmit')).click();
    });
  },
  validateHostRowColumnValue: (hostRowIndex, columnDataTestId, value) => {
    cy.get(
      `[data-testid=host-row-${hostRowIndex}] > [data-testid=${columnDataTestId}] > .pf-m-align-items-center > .pf-l-flex > .pf-c-button`,
    ).should('contain', value);
  },
  sortCpuAscending: () => {
    // first click will sort in Ascending order (lowest to highest)
    cy.get(`${Cypress.env('colHeaderCpuCoresId')} > .pf-c-table__button`).click();
    cy.get(`${Cypress.env('colHeaderCpuCoresId')} > .pf-c-table__button > div > span > svg > path`)
      .invoke('attr', 'd')
      .should('contain', 'M88');
  },
  sortCpuDescending: () => {
    // second click will sort in Descending order (highest to lowest)
    cy.get(`${Cypress.env('colHeaderCpuCoresId')} > .pf-c-table__button`).click();
    cy.get(`${Cypress.env('colHeaderCpuCoresId')} > .pf-c-table__button > div > span > svg > path`)
      .invoke('attr', 'd')
      .should('contain', 'M168');
  },
  clickSaveEditHostsForm: () => {
    cy.get(Cypress.env('submitButton')).click();
    cy.get('.pf-c-popover__content').should('not.exist');
  },
  clickCancelInFormFooter: () => {
    cy.get('.pf-c-modal-box__footer').within(() => {
      cy.get(`button:contains('Cancel')`).click();
    });
  },
  clickChangeHostnameErrorIcon: () => {
    cy.get('.pf-c-input-group > .pf-c-button > svg > path').click();
  },
  clickMainBody: () => {
    cy.get('.pf-c-wizard__main-body').click();
  },
};
