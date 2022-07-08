import {
  clusterDualstackBuilder,
  dualstackCluster,
  featureUsage,
  featureUsageDualstack,
} from './1-cluster-created';
import { clusterReadyBuilder } from './5-cluster-ready';

const readyToInstallCluster = clusterReadyBuilder(dualstackCluster);
const readyToInstallDualStackCluster = clusterDualstackBuilder(readyToInstallCluster);

const singleStackEnhancements = { feature_usage: JSON.stringify(featureUsage) };
const dualStackEnhancements = { feature_usage: JSON.stringify(featureUsageDualstack) };

const createDualStackFixtureMapping = {
  READY_TO_INSTALL: readyToInstallCluster,
  READY_TO_INSTALL_DUALSTACK: readyToInstallDualStackCluster,
  default: dualstackCluster,
};

export {
  createDualStackFixtureMapping,
  singleStackEnhancements,
  dualStackEnhancements,
};
