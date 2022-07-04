// TODO generalise the functions to use them ina  single place

import { multinodeCluster } from './1-cluster-created';
import { isoDownloadedClusterBuilder } from '../create-sno/2-iso-downloaded';
import { hostDiscoveredBuilder } from '../create-sno/3-host-discovered';
import { hostRenamedBuilder } from '../create-sno/4-host-renamed';
import { clusterReadyBuilder } from '../create-sno/5-cluster-ready';

const isoDownloadedCluster = isoDownloadedClusterBuilder(multinodeCluster);
const hostDiscoveredCluster = (hostNumber = 1) =>
  hostDiscoveredBuilder(isoDownloadedCluster, hostNumber);
const hostRenamedCluster = (hostNumber = 1) =>
  hostRenamedBuilder(hostDiscoveredCluster(hostNumber));
const readyToInstallCluster = clusterReadyBuilder(hostRenamedCluster());

const createMultinodeFixtureMapping = {
  ISO_DOWNLOADED: isoDownloadedCluster,
  HOST_DISCOVERED_1: hostDiscoveredCluster(1),
  HOST_DISCOVERED_2: hostDiscoveredCluster(2),
  HOST_DISCOVERED_3: hostDiscoveredCluster(3),
  HOST_RENAMED_1: hostRenamedCluster(1),
  HOST_RENAMED_2: hostRenamedCluster(2),
  HOST_RENAMED_3: hostRenamedCluster(3),
  READY_TO_INSTALL: readyToInstallCluster,
  default: multinodeCluster,
};

export default createMultinodeFixtureMapping;
