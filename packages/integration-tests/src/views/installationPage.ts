export const installationPage = {
  waitForInstalled: (timeout = Cypress.env('CLUSTER_CREATION_TIMEOUT')) => {
    for (let i = 0; i <= Cypress.env('WORKER_HOST_ROW_MAX_INDEX'); i += 2) {
      cy.get(`[data-testid=host-row-${i}] > [data-testid=host-status]`, {
        timeout: timeout,
      }).should('contain', 'Installed');
    }
  },
  waitForStatusToNotContain: (status, timeout = Cypress.env('CLUSTER_CREATION_TIMEOUT')) => {
    for (let i = 0; i <= Cypress.env('WORKER_HOST_ROW_MAX_INDEX'); i += 2) {
      cy.get(`[data-testid=host-row-${i}] > [data-testid=host-status]`, {
        timeout: timeout,
      }).should('not.contain', status);
    }
  },
  validateHostNames: (
    numMasters: number = Cypress.env('NUM_MASTERS'),
    numWorkers: number = Cypress.env('NUM_WORKERS'),
    hostNames = Cypress.env('requestedHostnames'),
  ) => {
    cy.get(Cypress.env('hostnameDataTestId'))
      .should('have.length', numMasters + numWorkers)
      .each((hostName, idx) => {
        expect(hostName).to.contain(hostNames[idx]);
      });
  },
  validateHostRoles: (
    numMasters: number = Cypress.env('NUM_MASTERS'),
    numWorkers: number = Cypress.env('NUM_WORKERS'),
  ) => {
    cy.get(Cypress.env('roleDataLabel'))
      .should('have.length', numMasters + numWorkers)
      .each((hostRole, idx) => {
        if (idx <= numMasters - 1) {
          expect(hostRole).to.contain(Cypress.env('HOST_ROLE_MASTER_LABEL'));
        } else {
          expect(hostRole).to.contain(Cypress.env('HOST_ROLE_WORKER_LABEL'));
        }
      });
  },
  validateHostCpuCores: (
    numMasters: number = Cypress.env('NUM_MASTERS'),
    numWorkers: number = Cypress.env('NUM_WORKERS'),
  ) => {
    cy.get(Cypress.env('cpuCoresDataLabel'))
      .should('have.length', numMasters + numWorkers)
      .each((hostCpuCores, idx) => {
        if (idx <= numMasters - 1) {
          expect(hostCpuCores).to.contain(Cypress.env('masterCPU'));
        } else {
          expect(hostCpuCores).to.contain(Cypress.env('workerCPU'));
        }
      });
  },
  validateHostMemory: (
    numMasters: number = Cypress.env('NUM_MASTERS'),
    numWorkers: number = Cypress.env('NUM_WORKERS'),
  ) => {
    cy.get(Cypress.env('memoryDataLabel'))
      .should('have.length', numMasters + numWorkers)
      .each((hostMemory, idx) => {
        if (idx <= numMasters - 1) {
          expect(hostMemory).to.contain(Cypress.env('masterMemory'));
        } else {
          expect(hostMemory).to.contain(Cypress.env('workerMemory'));
        }
      });
  },
  validateHostDisk: (
    numMasters: number = Cypress.env('NUM_MASTERS'),
    numWorkers: number = Cypress.env('NUM_WORKERS'),
  ) => {
    const gBToTBDivider = 1000;
    cy.get(Cypress.env('totalStorageDataLabel'))
      .should('have.length', numMasters + numWorkers)
      .each((hostDisk, idx) => {
        if (idx <= numMasters - 1) {
          if (hostDisk.text().includes('TB')) {
            const masterDiskTBTotalSize = (
              Cypress.env('masterDiskTotalSize') / gBToTBDivider
            ).toFixed(2);
            cy.log(`Master Disk Total Size, TB: ${masterDiskTBTotalSize}`);
            expect(hostDisk).to.contain(masterDiskTBTotalSize);
          } else {
            expect(hostDisk).to.contain(Cypress.env('masterDiskTotalSize'));
          }
        } else {
          if (hostDisk.text().includes('TB')) {
            const workerDiskTBTotalSize = (
              Cypress.env('workerDiskTotalSize') / gBToTBDivider
            ).toFixed(2);
            cy.log(`Worker Disk Total Size, TB: ${workerDiskTBTotalSize}`);
            expect(hostDisk).to.contain(workerDiskTBTotalSize);
          } else {
            expect(hostDisk).to.contain(Cypress.env('workerDiskTotalSize'));
          }
        }
      });
  },
  validateInstallConfigWarning: (msg) => {
    cy.get(`.pf-m-warning:contains(${msg})`);
  },
  waitForDownloadKubeconfigToBeEnabled: (timeout = 600000) => {
    cy.get(Cypress.env('clusterDetailButtonDownloadKubeconfigId'), { timeout: timeout }).should(
      'be.enabled',
    );
  },
  downloadKubeconfigAndSetKubeconfigEnv: (
    kubeconfigFile,
    timeout = Cypress.env('KUBECONFIG_DOWNLOAD_TIMEOUT'),
  ) => {
    cy.get(Cypress.env('clusterDetailButtonDownloadKubeconfigId')).should('be.visible').click();
    cy.readFile(kubeconfigFile, { timeout: timeout })
      .should('have.length.gt', 50)
      .then((kubeconfig) => {
        Cypress.env('kubeconfig', kubeconfig);
      });
  },
  copyAllFiles: () => {
    installationPage.downloadKubeconfigAndSetKubeconfigEnv(
      Cypress.env('kubeconfigFile'),
      Cypress.env('KUBECONFIG_DOWNLOAD_TIMEOUT'),
    );
    cy.runCopyCmd(Cypress.env('kubeconfigFile'), '~/clusterconfigs/auth/kubeconfig');
    cy.runCopyCmd(Cypress.env('kubeconfigFile'), '~/kubeconfig');
    cy.runCopyCmd(
      Cypress.env('kubeconfigFile'),
      `${Cypress.env(
        'BASE_REPO_DIR_REMOTE',
      )}/linchpin-workspace/hooks/ansible/ocp-edge-setup/kubeconfig`,
    );
    cy.setKubeAdminPassword(Cypress.env('API_BASE_URL'), Cypress.env('clusterId'), true);
    cy.get('@kubeadmin-password').then((kubeadminPassword) => {
      cy.writeFile(Cypress.env('kubeadminPasswordFilePath'), kubeadminPassword);
    });
    cy.runCopyCmd(
      Cypress.env('kubeadminPasswordFilePath'),
      '~/clusterconfigs/auth/kubeadmin-password',
    );
    cy.runCopyCmd(Cypress.env('kubeadminPasswordFilePath'), '~/kubeadmin-password');
    cy.runCopyCmd(
      Cypress.env('kubeadminPasswordFilePath'),
      `${Cypress.env(
        'BASE_REPO_DIR_REMOTE',
      )}/linchpin-workspace/hooks/ansible/ocp-edge-setup/kubeadmin-password`,
    );
    cy.setInstallConfig(Cypress.env('API_BASE_URL'), Cypress.env('clusterId'), true);
    cy.get('@install-config').then((installConfig) => {
      cy.writeFile(Cypress.env('installConfigFilePath'), installConfig);
    });
    cy.runCopyCmd(Cypress.env('installConfigFilePath'), '~/install-config.yaml');
    cy.runCopyCmd(
      Cypress.env('installConfigFilePath'),
      `${Cypress.env(
        'BASE_REPO_DIR_REMOTE',
      )}/linchpin-workspace/hooks/ansible/ocp-edge-setup/install-config.yaml`,
    );
  },
  waitForConsoleTroubleShootingHintToBeVisible: (
    timeout = Cypress.env('WAIT_FOR_CONSOLE_TIMEOUT'),
  ) => {
    cy.newByDataTestId(Cypress.env('clusterDetailClusterCredsTshootHintOpen'), timeout)
      .scrollIntoView()
      .should('be.visible');
  },
  progressStatusShouldContain: (
    status = 'Installed',
    timeout = Cypress.env('WAIT_FOR_PROGRESS_STATUS_INSTALLED'),
  ) => {
    cy.get(Cypress.env('clusterProgressStatusValueId')).scrollIntoView().should('be.visible');
    cy.get(Cypress.env('clusterProgressStatusValueId'), { timeout: timeout }).should(
      'contain',
      status,
    );
  },
  operatorsPopover: {
    open: () => {
      cy.get(Cypress.env('operatorsProgressItem')).click();
    },
    validateListItemContents: (msg) => {
      cy.get('.pf-c-popover__body').within(() => {
        cy.get('li').should('contain', msg);
      });
    },
    close: () => {
      cy.get('.pf-c-popover__content > .pf-c-button > svg').should('be.visible').click();
    },
  },
};
