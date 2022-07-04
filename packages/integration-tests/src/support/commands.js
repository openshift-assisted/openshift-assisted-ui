// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import 'cypress-fill-command';

Cypress.Commands.add('pasteText', (selector, text) => {
  cy.get(selector).then((elem) => {
    elem.text(text);
    elem.val(text);
    cy.get(selector).type(' {backspace}');
  });
});

Cypress.Commands.add('runCmdOnNode', (user, host, cmd) => {
  cy.runCmd(`ssh -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa ${user}@${host} ${cmd}`)
    .its('code')
    .should('eq', 0);
});

Cypress.Commands.add(
  'runCmd',
  (
    cmd,
    setAlias = false,
    failOnNonZeroExit = true,
    timeout = Cypress.config('defaultCommandTimeout'),
  ) => {
    if (Cypress.env('DEV_FLAG')) {
      cmd = `${Cypress.env('sshCmd')} ${cmd}`;
    }
    cy.log(`Executing command: ${cmd}`);
    if (setAlias) {
      cy.exec(`${cmd}`, { timeout: timeout, failOnNonZeroExit: failOnNonZeroExit }).then((obj) => {
        cy.wrap(obj).as('runCmdAlias');
      });
    } else {
      cy.exec(`${cmd}`, { timeout: timeout, failOnNonZeroExit: failOnNonZeroExit });
    }
  },
);

Cypress.Commands.add(
  'runCopyCmd',
  (source, dest, failOnNonZeroExit = true, timeout = Cypress.config('defaultCommandTimeout')) => {
    let cmd = '';
    if (Cypress.env('DEV_FLAG')) {
      cmd = `scp ${source} ${Cypress.env('REMOTE_USER')}@${Cypress.env('REMOTE_HOST')}:${dest}`;
    } else {
      cmd = `cp ${source} ${dest}`;
    }
    cy.log(`Executing command: ${cmd}`);
    cy.exec(`${cmd}`, { timeout: timeout, failOnNonZeroExit: failOnNonZeroExit });
  },
);

Cypress.Commands.add(
  'virshDestroyAllHost',
  (numMasters = Cypress.env('NUM_MASTERS'), numWorkers = Cypress.env('NUM_WORKERS')) => {
    for (let i = 0; i <= numMasters - 1; i++) {
      cy.runCmd(`virsh destroy master-0-${i}`, false, false);
    }
    for (let i = 0; i <= numWorkers - 1; i++) {
      cy.runCmd(`virsh destroy worker-0-${i}`, false, false);
    }
  },
);

Cypress.Commands.add(
  'virshStartNodes',
  (numMasters = Cypress.env('NUM_MASTERS'), numWorkers = Cypress.env('NUM_WORKERS')) => {
    for (let i = 0; i <= numMasters - 1; i++) {
      cy.runCmd(`virsh start master-0-${i}`);
    }
    for (let i = 0; i <= numWorkers - 1; i++) {
      cy.runCmd(`virsh start worker-0-${i}`);
    }
  },
);

Cypress.Commands.add('vmWareUploadISO', () => {
  if (Cypress.env('ASSISTED_SNO_DEPLOYMENT') === true) {
    cy.runCmd('scripts/vmware/sno/uploadISO.sh');
  } else {
    cy.runCmd('scripts/vmware/multinode/uploadISO.sh');
  }
});

Cypress.Commands.add('vmWareCreateAndStartNodes', () => {
  if (Cypress.env('ASSISTED_SNO_DEPLOYMENT') === true) {
    cy.runCmd('scripts/vmware/sno/create_master.sh');
  } else {
    cy.runCmd('scripts/vmware/multinode/create_masters.sh');
    cy.runCmd('scripts/vmware/multinode/create_workers.sh');
  }
});

Cypress.Commands.add('cleanStaleFiles', () => {
  cy.runCmd(`rm -rf ${Cypress.env('DISCOVERY_IMAGE_GLOB_PATTERN')}`);
  cy.runCmd(`rm -rf ${Cypress.env('DISCOVERY_IMAGE_PATH')}`);
});

Cypress.Commands.add('runAnsiblePlaybook', (inventory, playbookFile, extraVars, venv) => {
  cy.exec(`sh scripts/run_ansible_playbook.sh ${inventory} ${playbookFile} ${extraVars} ${venv}`);
});

Cypress.Commands.add(
  'updateDnsmasq',
  (
    apiBaseUrl = Cypress.env('API_BASE_URL'),
    clusterId = Cypress.env('clusterId'),
    clusterName = Cypress.env('CLUSTER_NAME'),
    clusterDomain = Cypress.env('DNS_DOMAIN_NAME'),
    assistedSNODeployment = Cypress.env('ASSISTED_SNO_DEPLOYMENT'),
    apiVip = '',
    ingressVip = '',
  ) => {
    // Only for virtual deployments
    let inventory = 'localhost';
    let ipv4Address = 'SNO Only';
    if (Cypress.env('DEV_FLAG')) {
      const splitSshCmd = Cypress.env('sshCmd').split('@');
      inventory = splitSshCmd[splitSshCmd.length - 1];
    }
    cy.getClusterDetails(apiBaseUrl, clusterId, true);
    cy.get('@getClusterDetails')
      .its('body')
      .then((clusterDetails) => {
        if (assistedSNODeployment) {
          ipv4Address = JSON.parse(clusterDetails.hosts[0].inventory).interfaces[0]
            .ipv4_addresses[0];
        }
        if (apiVip == '') {
          apiVip = clusterDetails.api_vip;
        }
        if (ingressVip == '') {
          ingressVip = clusterDetails.ingress_vip;
        }
        const playbookFile = 'cypress/playbooks/update-dnsmasq.yaml';
        const extraVars = `"cluster_domain=${clusterName}.${clusterDomain} deployed_api_vip=${apiVip} deployed_ingress_vip=${ingressVip} assisted_sno_deployment=${assistedSNODeployment} ipv4_address=${ipv4Address}"`;
        cy.runAnsiblePlaybook(inventory, playbookFile, extraVars, Cypress.env('VENV_REMOTE'));
      });
  },
);

const getImageName = () => {
  return `${Cypress.env('NODE_MANAGEMENT_IMAGE_ROOT')}/discovery_image_${Cypress.env(
    'CLUSTER_NAME',
  )}.iso`;
};

Cypress.Commands.add('deploySingleNodeOnServer', () => {
  const commandParts = [];

  if (Cypress.env('NODE_MANAGEMENT_POOL')) {
    commandParts.push(`STORAGE_POOL=${Cypress.env('NODE_MANAGEMENT_POOL')}`);
  }
  commandParts.push(`${Cypress.env('NODE_MANAGEMENT_HOME')}/host_scripts/setup-env.sh`);
  commandParts.push(`--cluster-name=${Cypress.env('CLUSTER_NAME')} --num-of-nodes=1 --debug`);
  commandParts.push(getImageName());

  cy.runCmd(commandParts.join(' ')).its('code').should('eq', 0);
});

Cypress.Commands.add('cleanUpE2eNodeResources', () => {
  const failOnError = false;

  // Removing the Discover ISO
  cy.runCmd(`rm ${getImageName()}`, false, failOnError);

  // Deleting the VM
  cy.runCmd(`kcli list vm | grep ${Cypress.env('CLUSTER_NAME')} | awk '{printf "%s ",$2}'`).then(
    (result) => {
      const vmName = result.stdout;
      if (vmName !== '') {
        cy.runCmd(`kcli delete vm ${vmName} -y`).its('code').should('eq', 0);
      }
    },
  );
});
