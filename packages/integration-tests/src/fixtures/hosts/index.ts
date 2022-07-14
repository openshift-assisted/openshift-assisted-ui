import { hasWizardSignal } from '../../support/utils';
import { hostDiscover } from './host-discover';
import { hostRename } from './host-rename';
import { hostReady } from './host-ready';

const hostIds = [
  '1e40aa5d-0b69-4122-a562-bff1e35e7071',
  '2e40aa5d-0b69-4122-a562-bff1e35e7072',
  '3e40aa5d-0b69-4122-a562-bff1e35e7073',
];
const hostIPs = ['192.168.122.0/24', 'IP2', 'IP3'];

const discoveredHosts = [hostDiscover(0), hostDiscover(1), hostDiscover(2)];

const getDiscoveredHostsCount = () => {
  const signals = ['HOST_DISCOVERED_1', 'HOST_DISCOVERED_2', 'HOST_DISCOVERED_3'];
  const firstUndiscoveredIndex = signals.findIndex((signal) => !hasWizardSignal(signal));
  if (firstUndiscoveredIndex === -1) {
    return 3;
  }
  return firstUndiscoveredIndex;
};

const getUpdatedHosts = () => {
  const discoveredHostsCount = getDiscoveredHostsCount();
  if (discoveredHostsCount === 0) {
    return [];
  }

  const lastSignal: string = Cypress.env('AI_LAST_SIGNAL');

  let transformer: (index: number) => Record<string, unknown>;
  if (/HOST_DISCOVERED_\d/.test(lastSignal)) {
    transformer = (index) => discoveredHosts[index];
  } else if (/HOST_RENAMED_\d/.test(lastSignal)) {
    transformer = (index) =>
      hostRename(discoveredHosts[index], `${Cypress.env('HOST_RENAME')}-${index + 1}`);
  } else if (hasWizardSignal('READY_TO_INSTALL')) {
    transformer = (index) =>
      hostReady(hostRename(discoveredHosts[index], Cypress.env('HOST_RENAME')));
  }

  return new Array(discoveredHostsCount).fill(0).map((_, index) => {
    const updates = {};
    return {
      ...transformer(index),
      bootstrap: index === 0,
      ...updates,
    };
  });
};

export { hostIds, hostIPs, getUpdatedHosts };
