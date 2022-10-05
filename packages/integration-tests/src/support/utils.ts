const signalOrder = [
  'CLUSTER_CREATED',
  'ISO_DOWNLOADED',
  'HOST_DISCOVERED_1',
  'HOST_RENAMED_1',
  'HOST_DISCOVERED_2',
  'HOST_RENAMED_2',
  'HOST_DISCOVERED_3',
  'HOST_RENAMED_3',
  'READY_TO_INSTALL',
  'READY_TO_INSTALL_DUALSTACK',
];

type SignalName = typeof signalOrder[number];

export const setLastWizardSignal = (signalName: SignalName) => {
  Cypress.env('AI_LAST_SIGNAL', signalName);
};

export const hasWizardSignal = (signalName: SignalName) => {
  const currentSignalOrder = signalOrder.findIndex((signal) => signal === Cypress.env('AI_LAST_SIGNAL'));

  const reqSignalOrder = signalOrder.findIndex((signal) => signal === signalName);
  return reqSignalOrder !== -1 && reqSignalOrder <= currentSignalOrder;
};

export const setTransformSignal = (signalName: SignalName) => {
  Cypress.env('TRANSFORM_SIGNAL', signalName);
};

export const clearTransformSignal = () => {
  Cypress.env('TRANSFORM_SIGNAL', undefined);
};

export const getTransformSignal = (): SignalName | undefined => Cypress.env('TRANSFORM_SIGNAL');

export const getUiVersion = () => {
  return new Cypress.Promise((resolve) => {
    if (Cypress.env('AI_MOCKED_UI_VERSION')) {
      resolve(Cypress.env('AI_MOCKED_UI_VERSION'));
    } else {
      cy.newByDataTestId('assisted-ui-lib-version')
        .invoke('text')
        .then((uiVersion) => {
          resolve(uiVersion);
        });
    }
  });
};

export const getCwd = () => {
  return new Cypress.Promise((resolve) => {
    cy.exec('echo $HOME').then((homeDir) => {
      resolve(homeDir.stdout);
    });
  });
};

export const hostDetailSelector = (row: number, label: string) =>
  // NOTE: The first row is number 2! Shift your indexes...
  `table.hosts-table > tbody:nth-child(${row}) > tr:nth-child(1) > [data-label="${label}"]`;

export const setHostsRole = (
  numMasters: number = Cypress.env('NUM_MASTERS'),
  numWorkers: number = Cypress.env('NUM_WORKERS'),
) => {
  // set hosts role
  for (let i = 2; i < 2 + numMasters; i++) {
    cy.get(hostDetailSelector(i, 'Role')).click().find('li#master').click();
  }
  for (let i = 2 + numMasters; i < 2 + numMasters + numWorkers; i++) {
    cy.get(hostDetailSelector(i, 'Role')).click().find('li#worker').click();
  }
};

export const isVersionIncluding = (testVersion, minVersion) => {
  const semver = Cypress.env('semver');
  return semver.gte(
    semver.valid(semver.coerce(testVersion)),
    semver.valid(semver.coerce(minVersion)),
  );
};
