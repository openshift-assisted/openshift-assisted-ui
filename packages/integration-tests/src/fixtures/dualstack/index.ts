/* eslint-disable @typescript-eslint/naming-convention */

import { dualstackClusterBase, featureUsage } from './1-cluster-created';
import { clusterReadyBuilder, clusterDualstackBuilder, featureUsageDualstack } from './5-cluster-ready';

const readyToInstallCluster = clusterReadyBuilder(dualstackClusterBase);
const readyToInstallDualstackCluster = clusterDualstackBuilder(readyToInstallCluster);

const singleStackEnhancements = {
  feature_usage: JSON.stringify(featureUsage),
  e2e_mock_source: '5-dualstack-ipv4',
  status: 'ready',
  status_info: 'Cluster ready to be installed',
};

const dualStackEnhancements = {
  feature_usage: JSON.stringify(featureUsageDualstack),
};

const createDualStackFixtureMapping = {
  HOST_RENAMED_3: dualstackClusterBase,
  READY_TO_INSTALL: readyToInstallCluster,
  READY_TO_INSTALL_DUALSTACK: readyToInstallDualstackCluster,
  default: dualstackClusterBase,
};

export { createDualStackFixtureMapping, singleStackEnhancements, dualStackEnhancements };
