import { getSnoCluster } from './1-cluster-created';
import { isoDownloadedClusterBuilder } from './2-iso-downloaded';
import { hostDiscoveredBuilder } from './3-host-discovered';
import { hostRenamedBuilder } from './4-host-renamed';
import { clusterReadyBuilder } from './5-cluster-ready';

const clusterName = Cypress.env('CLUSTER_NAME');

const initialCluster = getSnoCluster({ name: clusterName });
const isoDownloadedCluster = isoDownloadedClusterBuilder(initialCluster);
const hostDiscoveredCluster = hostDiscoveredBuilder(isoDownloadedCluster);
const hostRenamedCluster = hostRenamedBuilder(hostDiscoveredCluster);
const readyToInstallCluster = clusterReadyBuilder(hostRenamedCluster);

const createSnoFixtureMapping = {
  READY_TO_INSTALL: readyToInstallCluster,
  HOST_RENAMED_1: hostRenamedCluster,
  HOST_DISCOVERED_1: hostDiscoveredCluster,
  ISO_DOWNLOADED: isoDownloadedCluster,
  default: initialCluster,
};

export default createSnoFixtureMapping;
