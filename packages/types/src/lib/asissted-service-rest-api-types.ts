export interface AddHostsClusterCreateParams {
    /**
     * api vip domain.
     */
    apiVipDnsname: string;
    /**
     * Unique identifier of the object.
     */
    id: string; // uuid
    /**
     * Name of the OpenShift cluster.
     */
    name: string;
    /**
     * Version of the OpenShift cluster.
     */
    openshiftVersion: string;
}
export interface ApiVipConnectivityRequest {
    /**
     * A CA certficate to be used when contacting the URL via https.
     */
    caCertificate?: string;
    /**
     * A string which will be used as Authorization Bearer token to fetch the ignition from ignition_endpoint_url.
     */
    ignitionEndpointToken?: string;
    /**
     * URL address of the API.
     */
    url: string;
    /**
     * Whether to verify if the API VIP belongs to one of the interfaces (DEPRECATED).
     */
    verifyCidr?: boolean;
}
export interface ApiVipConnectivityResponse {
    /**
     * Ignition fetched from the specified API VIP
     */
    ignition?: string;
    /**
     * API VIP connectivity check result.
     */
    isSuccess?: boolean;
}
export interface AssistedServiceIsoCreateParams {
    /**
     * Version of the OpenShift cluster.
     */
    openshiftVersion?: string;
    /**
     * The pull secret obtained from Red Hat OpenShift Cluster Manager at console.redhat.com/openshift/install/pull-secret.
     */
    pullSecret?: string;
    /**
     * SSH public key for debugging the installation.
     */
    sshPublicKey?: string;
}
export interface BindHostParams {
    clusterId: string; // uuid
}
export interface Boot {
    currentBootMode?: string;
    pxeInterface?: string;
}
export interface Cluster {
    /**
     * A comma-separated list of NTP sources (name or IP) going to be added to all the hosts.
     */
    additionalNtpSource?: string;
    /**
     * Unique identifier of the AMS subscription in OCM.
     */
    amsSubscriptionId?: string; // uuid
    /**
     * The virtual IP used to reach the OpenShift cluster's API.
     */
    apiVip?: string; // ^(?:(?:(?:[0-9]{1,3}\.){3}[0-9]{1,3})|(?:(?:[0-9a-fA-F]*:[0-9a-fA-F]*){2,}))$
    /**
     * The domain name used to reach the OpenShift cluster API.
     */
    apiVipDnsName?: string;
    /**
     * Base domain of the cluster. All DNS records must be sub-domains of this base and include the cluster name.
     */
    baseDnsDomain?: string;
    /**
     * IP address block from which Pod IPs are allocated. This block must not overlap with existing physical networks. These IP addresses are used for the Pod network, and if you need to access the Pods from an external network, configure load balancers and routers to manage the traffic.
     */
    clusterNetworkCidr?: string; // ^(?:(?:(?:[0-9]{1,3}\.){3}[0-9]{1,3}\/(?:(?:[0-9])|(?:[1-2][0-9])|(?:3[0-2])))|(?:(?:[0-9a-fA-F]*:[0-9a-fA-F]*){2,})/(?:(?:[0-9])|(?:[1-9][0-9])|(?:1[0-1][0-9])|(?:12[0-8])))$
    /**
     * The subnet prefix length to assign to each individual node. For example, if clusterNetworkHostPrefix is set to 23, then each node is assigned a /23 subnet out of the given cidr (clusterNetworkCIDR), which allows for 510 (2^(32 - 23) - 2) pod IPs addresses. If you are required to provide access to nodes from an external network, configure load balancers and routers to manage the traffic.
     */
    clusterNetworkHostPrefix?: number;
    /**
     * Cluster networks that are associated with this cluster.
     */
    clusterNetworks?: ClusterNetwork[];
    /**
     * Json formatted string containing the majority groups for connectivity checks.
     */
    connectivityMajorityGroups?: string;
    controllerLogsCollectedAt?: string; // date-time
    controllerLogsStartedAt?: string; // date-time
    /**
     * The CPU architecture of the image (x86_64/arm64/etc).
     */
    cpuArchitecture?: string;
    /**
     * The time that this cluster was created.
     */
    createdAt?: string; // date-time
    /**
     * swagger:ignore
     */
    deletedAt?: unknown;
    /**
     * Information regarding hosts' installation disks encryption.
     */
    diskEncryption?: DiskEncryption;
    emailDomain?: string;
    /**
     * hosts associated to this cluster that are not in 'disabled' state.
     */
    enabledHostCount?: number; // int64
    /**
     * JSON-formatted string containing the usage information by feature name
     */
    featureUsage?: string;
    /**
     * Guaranteed availability of the installed cluster. 'Full' installs a Highly-Available cluster
     * over multiple master nodes whereas 'None' installs a full cluster over one node.
     * 
     */
    highAvailabilityMode?: "Full" | "None";
    /**
     * List of host networks to be filled during query.
     */
    hostNetworks?: HostNetwork[];
    /**
     * Hosts that are associated with this cluster.
     */
    hosts?: Host[];
    /**
     * Self link.
     */
    href: string;
    /**
     * A proxy URL to use for creating HTTP connections outside the cluster.
     * http://\<username\>:\<pswd\>@\<ip\>:\<port\>
     * 
     */
    httpProxy?: string;
    /**
     * A proxy URL to use for creating HTTPS connections outside the cluster.
     * http://\<username\>:\<pswd\>@\<ip\>:\<port\>
     * 
     */
    httpsProxy?: string;
    /**
     * Enable/disable hyperthreading on master nodes, worker nodes, or all nodes
     */
    hyperthreading?: "masters" | "workers" | "all" | "none";
    /**
     * Unique identifier of the object.
     */
    id: string; // uuid
    /**
     * Json formatted string containing the user overrides for the initial ignition config
     * example:
     * {"ignition": {"version": "3.1.0"}, "storage": {"files": [{"path": "/tmp/example", "contents": {"source": "data:text/plain;base64,aGVscGltdHJhcHBlZGluYXN3YWdnZXJzcGVj"}}]}}
     */
    ignitionConfigOverrides?: string;
    /**
     * Explicit ignition endpoint overrides the default ignition endpoint.
     */
    ignitionEndpoint?: IgnitionEndpoint;
    imageInfo: ImageInfo;
    /**
     * The virtual IP used for cluster ingress traffic.
     */
    ingressVip?: string; // ^(?:(?:(?:[0-9]{1,3}\.){3}[0-9]{1,3})|(?:(?:[0-9a-fA-F]*:[0-9a-fA-F]*){2,}))$
    /**
     * The time that this cluster completed installation.
     */
    installCompletedAt?: string; // date-time
    /**
     * JSON-formatted string containing the user overrides for the install-config.yaml file.
     * example:
     * {"networking":{"networkType": "OVNKubernetes"},"fips":true}
     */
    installConfigOverrides?: string;
    /**
     * The time that this cluster started installation.
     */
    installStartedAt?: string; // date-time
    /**
     * Indicates the type of this object. Will be 'Cluster' if this is a complete object,
     * 'AddHostsCluster' for cluster that add hosts to existing OCP cluster,
     * 
     */
    kind: "Cluster" | "AddHostsCluster";
    /**
     * The progress of log collection or empty if logs are not applicable
     */
    logsInfo?: LogsState;
    /**
     * A CIDR that all hosts belonging to the cluster should have an interfaces with IP address that belongs to this CIDR. The api_vip belongs to this CIDR.
     */
    machineNetworkCidr?: string; // ^(?:(?:(?:[0-9]{1,3}\.){3}[0-9]{1,3}\/(?:(?:[0-9])|(?:[1-2][0-9])|(?:3[0-2])))|(?:(?:[0-9a-fA-F]*:[0-9a-fA-F]*){2,})/(?:(?:[0-9])|(?:[1-9][0-9])|(?:1[0-1][0-9])|(?:12[0-8])))$
    /**
     * Machine networks that are associated with this cluster.
     */
    machineNetworks?: MachineNetwork[];
    /**
     * Operators that are associated with this cluster.
     */
    monitoredOperators?: MonitoredOperator[];
    /**
     * Name of the OpenShift cluster.
     */
    name?: string;
    /**
     * The desired network type used.
     */
    networkType?: "OpenShiftSDN" | "OVNKubernetes";
    /**
     * A comma-separated list of destination domain names, domains, IP addresses, or other network CIDRs to exclude from proxying.
     */
    noProxy?: string;
    /**
     * OpenShift release image URI.
     */
    ocpReleaseImage?: string;
    /**
     * Cluster ID on OCP system.
     */
    openshiftClusterId?: string; // uuid
    /**
     * Version of the OpenShift cluster.
     */
    openshiftVersion?: string;
    orgId?: string;
    platform?: Platform;
    /**
     * Installation progress percentages of the cluster.
     */
    progress?: ClusterProgressInfo;
    /**
     * True if the pull secret has been added to the cluster.
     */
    pullSecretSet?: boolean;
    /**
     * hosts associated to this cluster that are in 'known' state.
     */
    readyHostCount?: number; // int64
    /**
     * Schedule workloads on masters
     */
    schedulableMasters?: boolean;
    /**
     * The IP address pool to use for service IP addresses. You can enter only one IP address pool. If you need to access the services from an external network, configure load balancers and routers to manage the traffic.
     */
    serviceNetworkCidr?: string; // ^(?:(?:(?:[0-9]{1,3}\.){3}[0-9]{1,3}\/(?:(?:[0-9])|(?:[1-2][0-9])|(?:3[0-2])))|(?:(?:[0-9a-fA-F]*:[0-9a-fA-F]*){2,})/(?:(?:[0-9])|(?:[1-9][0-9])|(?:1[0-1][0-9])|(?:12[0-8])))$
    /**
     * Service networks that are associated with this cluster.
     */
    serviceNetworks?: ServiceNetwork[];
    /**
     * SSH public key for debugging OpenShift nodes.
     */
    sshPublicKey?: string;
    /**
     * Status of the OpenShift cluster.
     */
    status: "insufficient" | "ready" | "error" | "preparing-for-installation" | "pending-for-input" | "installing" | "finalizing" | "installed" | "adding-hosts" | "cancelled" | "installing-pending-user-action";
    /**
     * Additional information pertaining to the status of the OpenShift cluster.
     */
    statusInfo: string;
    /**
     * The last time that the cluster status was updated.
     */
    statusUpdatedAt?: string; // date-time
    /**
     * All hosts associated to this cluster.
     */
    totalHostCount?: number; // int64
    /**
     * The last time that this cluster was updated.
     */
    updatedAt?: string; // date-time
    /**
     * Indicate if the networking is managed by the user.
     */
    userManagedNetworking?: boolean;
    userName?: string;
    /**
     * JSON-formatted string containing the validation results for each validation id grouped by category (network, hosts-data, etc.)
     */
    validationsInfo?: string;
    /**
     * Indicate if virtual IP DHCP allocation mode is enabled.
     */
    vipDhcpAllocation?: boolean;
}
export interface ClusterCreateParams {
    /**
     * A comma-separated list of NTP sources (name or IP) going to be added to all the hosts.
     */
    additionalNtpSource?: string;
    /**
     * Base domain of the cluster. All DNS records must be sub-domains of this base and include the cluster name.
     */
    baseDnsDomain?: string;
    /**
     * IP address block from which Pod IPs are allocated. This block must not overlap with existing physical networks. These IP addresses are used for the Pod network, and if you need to access the Pods from an external network, configure load balancers and routers to manage the traffic.
     */
    clusterNetworkCidr?: string; // ^(?:(?:(?:[0-9]{1,3}\.){3}[0-9]{1,3}\/(?:(?:[0-9])|(?:[1-2][0-9])|(?:3[0-2])))|(?:(?:[0-9a-fA-F]*:[0-9a-fA-F]*){2,})/(?:(?:[0-9])|(?:[1-9][0-9])|(?:1[0-1][0-9])|(?:12[0-8])))$
    /**
     * The subnet prefix length to assign to each individual node. For example, if clusterNetworkHostPrefix is set to 23, then each node is assigned a /23 subnet out of the given cidr (clusterNetworkCIDR), which allows for 510 (2^(32 - 23) - 2) pod IPs addresses. If you are required to provide access to nodes from an external network, configure load balancers and routers to manage the traffic.
     */
    clusterNetworkHostPrefix?: number;
    /**
     * Cluster networks that are associated with this cluster.
     */
    clusterNetworks?: ClusterNetwork[];
    /**
     * The CPU architecture of the image (x86_64/arm64/etc).
     */
    cpuArchitecture?: string;
    /**
     * Installation disks encryption mode and host roles to be applied.
     */
    diskEncryption?: DiskEncryption;
    /**
     * Guaranteed availability of the installed cluster. 'Full' installs a Highly-Available cluster
     * over multiple master nodes whereas 'None' installs a full cluster over one node.
     * 
     */
    highAvailabilityMode?: "Full" | "None";
    /**
     * A proxy URL to use for creating HTTP connections outside the cluster.
     * http://\<username\>:\<pswd\>@\<ip\>:\<port\>
     * 
     */
    httpProxy?: string;
    /**
     * A proxy URL to use for creating HTTPS connections outside the cluster.
     * http://\<username\>:\<pswd\>@\<ip\>:\<port\>
     * 
     */
    httpsProxy?: string;
    /**
     * Enable/disable hyperthreading on master nodes, worker nodes, or all nodes.
     */
    hyperthreading?: "masters" | "workers" | "none" | "all";
    /**
     * Explicit ignition endpoint overrides the default ignition endpoint.
     */
    ignitionEndpoint?: IgnitionEndpoint;
    /**
     * The virtual IP used for cluster ingress traffic.
     */
    ingressVip?: string; // ^(?:(?:(?:[0-9]{1,3}\.){3}[0-9]{1,3})|(?:(?:[0-9a-fA-F]*:[0-9a-fA-F]*){2,}))$
    /**
     * Machine networks that are associated with this cluster.
     */
    machineNetworks?: MachineNetwork[];
    /**
     * Name of the OpenShift cluster.
     */
    name: string;
    /**
     * The desired network type used.
     */
    networkType?: "OpenShiftSDN" | "OVNKubernetes";
    /**
     * An "*" or a comma-separated list of destination domain names, domains, IP addresses, or other network CIDRs to exclude from proxying.
     */
    noProxy?: string;
    /**
     * OpenShift release image URI.
     */
    ocpReleaseImage?: string;
    /**
     * List of OLM operators to be installed.
     */
    olmOperators?: OperatorCreateParams[];
    /**
     * Version of the OpenShift cluster.
     */
    openshiftVersion: string;
    platform?: Platform;
    /**
     * The pull secret obtained from Red Hat OpenShift Cluster Manager at console.redhat.com/openshift/install/pull-secret.
     */
    pullSecret: string;
    /**
     * Schedule workloads on masters
     */
    schedulableMasters?: boolean;
    /**
     * The IP address pool to use for service IP addresses. You can enter only one IP address pool. If you need to access the services from an external network, configure load balancers and routers to manage the traffic.
     */
    serviceNetworkCidr?: string; // ^(?:(?:(?:[0-9]{1,3}\.){3}[0-9]{1,3}\/(?:(?:[0-9])|(?:[1-2][0-9])|(?:3[0-2])))|(?:(?:[0-9a-fA-F]*:[0-9a-fA-F]*){2,})/(?:(?:[0-9])|(?:[1-9][0-9])|(?:1[0-1][0-9])|(?:12[0-8])))$
    /**
     * Service networks that are associated with this cluster.
     */
    serviceNetworks?: ServiceNetwork[];
    /**
     * SSH public key for debugging OpenShift nodes.
     */
    sshPublicKey?: string;
    /**
     * Indicate if the networking is managed by the user.
     */
    userManagedNetworking?: boolean;
    /**
     * Indicate if virtual IP DHCP allocation mode is enabled.
     */
    vipDhcpAllocation?: boolean;
}
export interface ClusterDefaultConfig {
    clusterNetworkCidr?: string; // ^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)[\/]([1-9]|[1-2][0-9]|3[0-2]?)$
    clusterNetworkHostPrefix?: number;
    inactiveDeletionHours?: number;
    ntpSource?: string;
    serviceNetworkCidr?: string; // ^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)[\/]([1-9]|[1-2][0-9]|3[0-2]?)$
}
export interface ClusterHostRequirements {
    /**
     * Unique identifier of the host the requirements relate to.
     */
    hostId?: string; // uuid
    /**
     * Host requirements for the OCP installation
     */
    ocp?: ClusterHostRequirementsDetails;
    /**
     * Host requirements related to requested operators
     */
    operators?: OperatorHostRequirements[];
    /**
     * Total host requirements for the cluster configuration
     */
    total?: ClusterHostRequirementsDetails;
}
export interface ClusterHostRequirementsDetails {
    /**
     * Required number of CPU cores
     */
    cpuCores?: number;
    /**
     * Required disk size in GB
     */
    diskSizeGb?: number;
    /**
     * Required installation disk speed in ms
     */
    installationDiskSpeedThresholdMs?: number;
    /**
     * Maximum network average latency (RTT) at L3 for role.
     */
    networkLatencyThresholdMs?: number; // double
    /**
     * Maximum packet loss allowed at L3 for role.
     */
    packetLossPercentage?: number; // double
    /**
     * Required number of RAM in MiB
     */
    ramMib?: number;
    /**
     * Whether TPM module should be enabled in host's BIOS.
     */
    tpmEnabledInBios?: boolean;
}
export type ClusterHostRequirementsList = ClusterHostRequirements[];
export type ClusterList = Cluster[];
/**
 * IP address block for pod IP blocks.
 */
export interface ClusterNetwork {
    /**
     * The IP block address pool.
     */
    cidr?: Subnet; // ^(?:(?:(?:[0-9]{1,3}\.){3}[0-9]{1,3}\/(?:(?:[0-9])|(?:[1-2][0-9])|(?:3[0-2])))|(?:(?:[0-9a-fA-F]*:[0-9a-fA-F]*){2,})/(?:(?:[0-9])|(?:[1-9][0-9])|(?:1[0-1][0-9])|(?:12[0-8])))$
    /**
     * The cluster that this network is associated with.
     */
    clusterId?: string; // uuid
    /**
     * The prefix size to allocate to each node from the CIDR. For example, 24 would allocate 2^8=256 adresses to each node.
     */
    hostPrefix?: number;
}
export interface ClusterProgressInfo {
    finalizingStagePercentage?: number;
    installingStagePercentage?: number;
    preparingForInstallationStagePercentage?: number;
    totalPercentage?: number;
}
export interface ClusterUpdateParams {
    /**
     * A comma-separated list of NTP sources (name or IP) going to be added to all the hosts.
     */
    additionalNtpSource?: string;
    /**
     * The virtual IP used to reach the OpenShift cluster's API.
     */
    apiVip?: string; // ^(?:(?:(?:[0-9]{1,3}\.){3}[0-9]{1,3})|(?:(?:[0-9a-fA-F]*:[0-9a-fA-F]*){2,}))?$
    /**
     * The domain name used to reach the OpenShift cluster API.
     */
    apiVipDnsName?: string;
    /**
     * Base domain of the cluster. All DNS records must be sub-domains of this base and include the cluster name.
     */
    baseDnsDomain?: string;
    /**
     * IP address block from which Pod IPs are allocated. This block must not overlap with existing physical networks. These IP addresses are used for the Pod network, and if you need to access the Pods from an external network, configure load balancers and routers to manage the traffic.
     */
    clusterNetworkCidr?: string; // ^(?:(?:(?:[0-9]{1,3}\.){3}[0-9]{1,3}\/(?:(?:[0-9])|(?:[1-2][0-9])|(?:3[0-2])))|(?:(?:[0-9a-fA-F]*:[0-9a-fA-F]*){2,})/(?:(?:[0-9])|(?:[1-9][0-9])|(?:1[0-1][0-9])|(?:12[0-8])))$
    /**
     * The subnet prefix length to assign to each individual node. For example, if clusterNetworkHostPrefix is set to 23, then each node is assigned a /23 subnet out of the given cidr (clusterNetworkCIDR), which allows for 510 (2^(32 - 23) - 2) pod IPs addresses. If you are required to provide access to nodes from an external network, configure load balancers and routers to manage the traffic.
     */
    clusterNetworkHostPrefix?: number;
    /**
     * Cluster networks that are associated with this cluster.
     */
    clusterNetworks?: ClusterNetwork[];
    /**
     * Installation disks encryption mode and host roles to be applied.
     */
    diskEncryption?: DiskEncryption;
    disksSelectedConfig?: {
        id?: string; // uuid
        /**
         * The desired disks parameters (such as the disk's role).
         */
        disksConfig?: DiskConfigParams[];
    }[];
    /**
     * The desired machine config pool for hosts associated with the cluster.
     */
    hostsMachineConfigPoolNames?: {
        id?: string; // uuid
        machineConfigPoolName?: string;
    }[];
    /**
     * The desired hostname for hosts associated with the cluster.
     */
    hostsNames?: {
        id?: string; // uuid
        hostname?: string;
    }[];
    /**
     * The desired role for hosts associated with the cluster.
     */
    hostsRoles?: {
        id?: string; // uuid
        role?: HostRoleUpdateParams;
    }[];
    /**
     * A proxy URL to use for creating HTTP connections outside the cluster.
     * http://\<username\>:\<pswd\>@\<ip\>:\<port\>
     * 
     */
    httpProxy?: string;
    /**
     * A proxy URL to use for creating HTTPS connections outside the cluster.
     * http://\<username\>:\<pswd\>@\<ip\>:\<port\>
     * 
     */
    httpsProxy?: string;
    /**
     * Enable/disable hyperthreading on master nodes, worker nodes, or all nodes.
     */
    hyperthreading?: "masters" | "workers" | "all" | "none";
    /**
     * Explicit ignition endpoint overrides the default ignition endpoint.
     */
    ignitionEndpoint?: IgnitionEndpoint;
    /**
     * The virtual IP used for cluster ingress traffic.
     */
    ingressVip?: string; // ^(?:(?:(?:[0-9]{1,3}\.){3}[0-9]{1,3})|(?:(?:[0-9a-fA-F]*:[0-9a-fA-F]*){2,}))?$
    /**
     * A CIDR that all hosts belonging to the cluster should have an interfaces with IP address that belongs to this CIDR. The api_vip belongs to this CIDR.
     */
    machineNetworkCidr?: string; // ^(?:(?:(?:[0-9]{1,3}\.){3}[0-9]{1,3}\/(?:(?:[0-9])|(?:[1-2][0-9])|(?:3[0-2])))|(?:(?:[0-9a-fA-F]*:[0-9a-fA-F]*){2,})/(?:(?:[0-9])|(?:[1-9][0-9])|(?:1[0-1][0-9])|(?:12[0-8])))$
    /**
     * Machine networks that are associated with this cluster.
     */
    machineNetworks?: MachineNetwork[];
    /**
     * OpenShift cluster name.
     */
    name?: string;
    /**
     * The desired network type used.
     */
    networkType?: "OpenShiftSDN" | "OVNKubernetes";
    /**
     * An "*" or a comma-separated list of destination domain names, domains, IP addresses, or other network CIDRs to exclude from proxying.
     */
    noProxy?: string;
    /**
     * List of OLM operators to be installed.
     */
    olmOperators?: OperatorCreateParams[];
    platform?: Platform;
    /**
     * The pull secret obtained from Red Hat OpenShift Cluster Manager at console.redhat.com/openshift/install/pull-secret.
     */
    pullSecret?: string;
    /**
     * Schedule workloads on masters
     */
    schedulableMasters?: boolean;
    /**
     * The IP address pool to use for service IP addresses. You can enter only one IP address pool. If you need to access the services from an external network, configure load balancers and routers to manage the traffic.
     */
    serviceNetworkCidr?: string; // ^(?:(?:(?:[0-9]{1,3}\.){3}[0-9]{1,3}\/(?:(?:[0-9])|(?:[1-2][0-9])|(?:3[0-2])))|(?:(?:[0-9a-fA-F]*:[0-9a-fA-F]*){2,})/(?:(?:[0-9])|(?:[1-9][0-9])|(?:1[0-1][0-9])|(?:12[0-8])))$
    /**
     * Service networks that are associated with this cluster.
     */
    serviceNetworks?: ServiceNetwork[];
    /**
     * SSH public key for debugging OpenShift nodes.
     */
    sshPublicKey?: string;
    /**
     * Indicate if the networking is managed by the user.
     */
    userManagedNetworking?: boolean;
    /**
     * Indicate if virtual IP DHCP allocation mode is enabled.
     */
    vipDhcpAllocation?: boolean;
}
export type ClusterValidationId = "machine-cidr-defined" | "cluster-cidr-defined" | "service-cidr-defined" | "no-cidrs-overlapping" | "network-prefix-valid" | "machine-cidr-equals-to-calculated-cidr" | "api-vip-defined" | "api-vip-valid" | "ingress-vip-defined" | "ingress-vip-valid" | "all-hosts-are-ready-to-install" | "sufficient-masters-count" | "dns-domain-defined" | "pull-secret-set" | "ntp-server-configured" | "lso-requirements-satisfied" | "ocs-requirements-satisfied" | "cnv-requirements-satisfied" | "network-type-valid";
export interface CompletionParams {
    errorInfo?: string;
    isSuccess: boolean;
}
export interface ConnectivityCheckHost {
    hostId?: string; // uuid
    nics?: ConnectivityCheckNic[];
}
export interface ConnectivityCheckNic {
    ipAddresses?: string[];
    mac?: string;
    name?: string;
}
export type ConnectivityCheckParams = ConnectivityCheckHost[];
export interface ConnectivityRemoteHost {
    hostId?: string; // uuid
    l2Connectivity?: L2Connectivity[];
    l3Connectivity?: L3Connectivity[];
}
export interface ConnectivityReport {
    remoteHosts?: ConnectivityRemoteHost[];
}
export interface ContainerImageAvailability {
    /**
     * The rate of size/time in seconds MBps.
     */
    downloadRate?: number;
    /**
     * A fully qualified image name (FQIN).
     */
    name?: string;
    result?: ContainerImageAvailabilityResult;
    /**
     * Size of the image in bytes.
     */
    sizeBytes?: number;
    /**
     * Seconds it took to pull the image.
     */
    time?: number;
}
export interface ContainerImageAvailabilityRequest {
    /**
     * List of image names to be checked.
     */
    images: string[];
    /**
     * Positive number represents a timeout in seconds for a pull operation.
     */
    timeout?: number;
}
export interface ContainerImageAvailabilityResponse {
    /**
     * List of images that were checked.
     */
    images: ContainerImageAvailability[];
}
/**
 * Image availability result.
 */
export type ContainerImageAvailabilityResult = "success" | "failure";
export interface Cpu {
    architecture?: string;
    count?: number;
    flags?: string[];
    frequency?: number;
    modelName?: string;
}
export interface CreateManifestParams {
    /**
     * base64 encoded manifest content.
     */
    content: string;
    /**
     * The name of the manifest to customize the installed OCP cluster.
     */
    fileName: string; // ^[^/]*\.(yaml|yml|json)$
    /**
     * The folder that contains the files. Manifests can be placed in 'manifests' or 'openshift' directories.
     */
    folder?: "manifests" | "openshift";
}
export interface Credentials {
    consoleUrl?: string;
    password?: string;
    username?: string;
}
export interface DhcpAllocationRequest {
    /**
     * Contents of lease file to be used for API virtual IP.
     */
    apiVipLease?: string;
    /**
     * MAC address for the API virtual IP.
     */
    apiVipMac: string; // mac
    /**
     * Contents of lease file to be used for for Ingress virtual IP.
     */
    ingressVipLease?: string;
    /**
     * MAC address for the Ingress virtual IP.
     */
    ingressVipMac: string; // mac
    /**
     * The network interface (NIC) to run the DHCP requests on.
     */
    interface: string;
}
export interface DhcpAllocationResponse {
    /**
     * The IPv4 address that was allocated by DHCP for the API virtual IP.
     */
    apiVipAddress: string; // ipv4
    /**
     * Contents of last acquired lease for API virtual IP.
     */
    apiVipLease?: string;
    /**
     * The IPv4 address that was allocated by DHCP for the Ingress virtual IP.
     */
    ingressVipAddress: string; // ipv4
    /**
     * Contents of last acquired lease for Ingress virtual IP.
     */
    ingressVipLease?: string;
}
export interface DiscoveryIgnitionParams {
    config?: string;
}
export interface Disk {
    bootable?: boolean;
    /**
     * by-id is the World Wide Number of the device which guaranteed to be unique for every storage device
     */
    byId?: string;
    /**
     * by-path is the shortest physical path to the device
     */
    byPath?: string;
    driveType?: string;
    hctl?: string;
    /**
     * Determine the disk's unique identifier which is the by-id field if it exists and fallback to the by-path field otherwise
     */
    id?: string;
    installationEligibility?: {
        /**
         * Whether the disk is eligible for installation or not.
         */
        eligible?: boolean;
        /**
         * Reasons for why this disk is not eligible for installation.
         */
        notEligibleReasons?: string[];
    };
    ioPerf?: IoPerf;
    /**
     * Whether the disk appears to be an installation media or not
     */
    isInstallationMedia?: boolean;
    model?: string;
    name?: string;
    path?: string;
    removable?: boolean;
    serial?: string;
    sizeBytes?: number;
    smart?: string;
    vendor?: string;
    wwn?: string;
}
export interface DiskConfigParams {
    id: string;
    role?: DiskRole;
}
export interface DiskEncryption {
    /**
     * Enable/disable disk encryption on master nodes, worker nodes, or all nodes.
     */
    enableOn?: "none" | "all" | "masters" | "workers";
    /**
     * The disk encryption mode to use.
     */
    mode?: "tpmv2" | "tang";
    /**
     * JSON-formatted string containing additional information regarding tang's configuration
     * example:
     * [{"url":"http://tang.example.com:7500","thumbprint":"PLjNyRdGw03zlRoGjQYMahSZGu9"}, {"url":"http://tang.example.com:7501","thumbprint":"PLjNyRdGw03zlRoGjQYMahSZGu8"}]
     */
    tangServers?: string;
}
export interface DiskInfo {
    diskSpeed?: DiskSpeed;
    id?: string; // uuid
    path?: string;
}
export type DiskRole = "none" | "install";
export interface DiskSpeed {
    exitCode?: number;
    speedMs?: number;
    tested?: boolean;
}
export interface DiskSpeedCheckRequest {
    /**
     * --filename argument for fio (expects a file or a block device path).
     */
    path: string;
}
export interface DiskSpeedCheckResponse {
    /**
     * The 99th percentile of fdatasync durations in milliseconds.
     */
    ioSyncDuration?: number;
    /**
     * The device path.
     */
    path?: string;
}
export interface DomainResolutionRequest {
    domains: {
        /**
         * The domain name that should be resolved
         */
        domainName: string;
    }[];
}
export interface DomainResolutionResponse {
    resolutions: {
        /**
         * The domain that was resolved
         */
        domainName: string;
        /**
         * The IPv4 addresses of the domain, empty if none
         */
        ipv4Addresses?: string /* ipv4 */ [];
        /**
         * The IPv6 addresses of the domain, empty if none
         */
        ipv6Addresses?: string /* ipv6 */ [];
    }[];
}
export interface Error {
    /**
     * Globally unique code of the error, composed of the unique identifier of the API and the numeric identifier of the error. For example, if the numeric identifier of the error is 93 and the identifier of the API is assisted_install then the code will be ASSISTED-INSTALL-93.
     */
    code: string;
    /**
     * Self link.
     */
    href: string;
    /**
     * Numeric identifier of the error.
     */
    id: number; // int32
    /**
     * Indicates the type of this object. Will always be 'Error'.
     */
    kind: "Error";
    /**
     * Human-readable description of the error.
     */
    reason: string;
}
export interface Event {
    category?: "user" | "metrics";
    /**
     * Unique identifier of the cluster this event relates to.
     */
    clusterId?: string; // uuid
    eventTime: string; // date-time
    /**
     * Unique identifier of the host this event relates to.
     */
    hostId?: string; // uuid
    /**
     * Unique identifier of the infra-env this event relates to.
     */
    infraEnvId?: string; // uuid
    message: string;
    /**
     * Event Name.
     */
    name?: string;
    /**
     * Additional properties for the event in JSON format.
     */
    props?: string;
    /**
     * Unique identifier of the request that caused this event to occur.
     */
    requestId?: string; // uuid
    severity: "info" | "warning" | "error" | "critical";
}
export type EventList = Event[];
export interface FeatureSupportLevel {
    features?: {
        /**
         * The ID of the feature
         */
        featureId?: "ADDITIONAL_NTP_SOURCE" | "REQUESTED_HOSTNAME" | "PROXY" | "SNO" | "DAY2_HOSTS" | "VIP_AUTO_ALLOC" | "DISK_SELECTION" | "OVN_NETWORK_TYPE" | "SDN_NETWORK_TYPE" | "PLATFORM_SELECTION" | "SCHEDULABLE_MASTERS" | "AUTO_ASSIGN_ROLE" | "CUSTOM_MANIFEST" | "DISK_ENCRYPTION" | "CLUSTER_MANAGED_NETWORKING_WITH_VMS" | "ARM64_ARCHITECTURE";
        supportLevel?: "supported" | "unsupported" | "tech-preview" | "dev-preview";
    }[];
    /**
     * Version of the OpenShift cluster.
     */
    openshiftVersion?: string;
}
export type FeatureSupportLevels = FeatureSupportLevel[];
export type FreeAddressesList = string /* ipv4 */ [];
export type FreeAddressesRequest = string /* ^([0-9]{1,3}\.){3}[0-9]{1,3}\/[0-9]|[1-2][0-9]|3[0-2]?$ */ [];
export interface FreeNetworkAddresses {
    freeAddresses?: string /* ipv4 */ [];
    network?: string; // ^([0-9]{1,3}\.){3}[0-9]{1,3}\/[0-9]|[1-2][0-9]|3[0-2]?$
}
export type FreeNetworksAddresses = FreeNetworkAddresses[];
export interface Gpu {
    /**
     * Device address (for example "0000:00:02.0")
     */
    address?: string;
    /**
     * ID of the device (for example "3ea0")
     */
    deviceId?: string;
    /**
     * Product name of the device (for example "UHD Graphics 620 (Whiskey Lake)")
     */
    name?: string;
    /**
     * The name of the device vendor (for example "Intel Corporation")
     */
    vendor?: string;
    /**
     * ID of the vendor (for example "8086")
     */
    vendorId?: string;
}
export interface Host {
    apiVipConnectivity?: string;
    bootstrap?: boolean;
    /**
     * The last time the host's agent communicated with the service.
     */
    checkedInAt?: string; // date-time
    /**
     * The cluster that this host is associated with.
     */
    clusterId?: string; // uuid
    connectivity?: string;
    createdAt?: string; // date-time
    /**
     * swagger:ignore
     */
    deletedAt?: unknown;
    discoveryAgentVersion?: string;
    /**
     * Additional information about disks, formatted as JSON.
     */
    disksInfo?: string;
    /**
     * The domain name resolution result.
     */
    domainNameResolutions?: string;
    freeAddresses?: string;
    /**
     * Self link.
     */
    href: string;
    /**
     * Unique identifier of the object.
     */
    id: string; // uuid
    /**
     * Json formatted string containing the user overrides for the host's pointer ignition
     * example:
     * {"ignition": {"version": "3.1.0"}, "storage": {"files": [{"path": "/tmp/example", "contents": {"source": "data:text/plain;base64,aGVscGltdHJhcHBlZGluYXN3YWdnZXJzcGVj"}}]}}
     */
    ignitionConfigOverrides?: string;
    /**
     * True if the token to fetch the ignition from ignition_endpoint_url is set.
     */
    ignitionEndpointTokenSet?: boolean;
    /**
     * Array of image statuses.
     */
    imagesStatus?: string;
    /**
     * The infra-env that this host is associated with.
     */
    infraEnvId?: string; // uuid
    /**
     * Contains the inventory disk id to install on.
     */
    installationDiskId?: string;
    /**
     * Contains the inventory disk path, This field is replaced by installation_disk_id field and used for backward compatability with the old UI.
     * example:
     * /dev/sda
     */
    installationDiskPath?: string;
    installerArgs?: string;
    /**
     * Installer version.
     */
    installerVersion?: string;
    inventory?: string;
    /**
     * Indicates the type of this object. Will be 'Host' if this is a complete object or 'HostLink' if it is just a link, or
     * 'AddToExistingClusterHost' for host being added to existing OCP cluster, or
     * 
     */
    kind: "Host" | "AddToExistingClusterHost";
    logsCollectedAt?: string; // datetime
    /**
     * The progress of log collection or empty if logs are not applicable
     */
    logsInfo?: LogsState;
    logsStartedAt?: string; // datetime
    machineConfigPoolName?: string;
    /**
     * The configured NTP sources on the host.
     */
    ntpSources?: string;
    progress?: HostProgressInfo;
    progressStages?: HostStage[];
    requestedHostname?: string;
    role?: HostRole;
    /**
     * Time at which the current progress stage started.
     */
    stageStartedAt?: string; // date-time
    /**
     * Time at which the current progress stage was last updated.
     */
    stageUpdatedAt?: string; // date-time
    status: "discovering" | "known" | "disconnected" | "insufficient" | "disabled" | "preparing-for-installation" | "preparing-failed" | "preparing-successful" | "pending-for-input" | "installing" | "installing-in-progress" | "installing-pending-user-action" | "resetting-pending-user-action" | "installed" | "error" | "resetting" | "added-to-existing-cluster" | "cancelled" | "binding" | "unbinding" | "unbinding-pending-user-action" | "known-unbound" | "disconnected-unbound" | "insufficient-unbound" | "disabled-unbound" | "discovering-unbound";
    statusInfo: string;
    /**
     * The last time that the host status was updated.
     */
    statusUpdatedAt?: string; // date-time
    suggestedRole?: HostRole;
    updatedAt?: string; // date-time
    userName?: string;
    /**
     * JSON-formatted string containing the validation results for each validation id grouped by category (network, hardware, etc.)
     */
    validationsInfo?: string;
}
export interface HostCreateParams {
    discoveryAgentVersion?: string;
    hostId: string; // uuid
}
export interface HostIgnitionParams {
    config?: string;
}
export type HostList = Host[];
export interface HostNetwork {
    cidr?: string;
    hostIds?: string /* uuid */ [];
}
export interface HostProgress {
    currentStage?: HostStage;
    progressInfo?: string;
}
export interface HostProgressInfo {
    currentStage?: HostStage;
    installationPercentage?: number;
    progressInfo?: string;
    /**
     * Time at which the current progress stage started.
     */
    stageStartedAt?: string; // date-time
    /**
     * Time at which the current progress stage was last updated.
     */
    stageUpdatedAt?: string; // date-time
}
export interface HostRegistrationResponse {
    apiVipConnectivity?: string;
    bootstrap?: boolean;
    /**
     * The last time the host's agent communicated with the service.
     */
    checkedInAt?: string; // date-time
    /**
     * The cluster that this host is associated with.
     */
    clusterId?: string; // uuid
    connectivity?: string;
    createdAt?: string; // date-time
    /**
     * swagger:ignore
     */
    deletedAt?: unknown;
    discoveryAgentVersion?: string;
    /**
     * Additional information about disks, formatted as JSON.
     */
    disksInfo?: string;
    /**
     * The domain name resolution result.
     */
    domainNameResolutions?: string;
    freeAddresses?: string;
    /**
     * Self link.
     */
    href: string;
    /**
     * Unique identifier of the object.
     */
    id: string; // uuid
    /**
     * Json formatted string containing the user overrides for the host's pointer ignition
     * example:
     * {"ignition": {"version": "3.1.0"}, "storage": {"files": [{"path": "/tmp/example", "contents": {"source": "data:text/plain;base64,aGVscGltdHJhcHBlZGluYXN3YWdnZXJzcGVj"}}]}}
     */
    ignitionConfigOverrides?: string;
    /**
     * True if the token to fetch the ignition from ignition_endpoint_url is set.
     */
    ignitionEndpointTokenSet?: boolean;
    /**
     * Array of image statuses.
     */
    imagesStatus?: string;
    /**
     * The infra-env that this host is associated with.
     */
    infraEnvId?: string; // uuid
    /**
     * Contains the inventory disk id to install on.
     */
    installationDiskId?: string;
    /**
     * Contains the inventory disk path, This field is replaced by installation_disk_id field and used for backward compatability with the old UI.
     * example:
     * /dev/sda
     */
    installationDiskPath?: string;
    installerArgs?: string;
    /**
     * Installer version.
     */
    installerVersion?: string;
    inventory?: string;
    /**
     * Indicates the type of this object. Will be 'Host' if this is a complete object or 'HostLink' if it is just a link, or
     * 'AddToExistingClusterHost' for host being added to existing OCP cluster, or
     * 
     */
    kind: "Host" | "AddToExistingClusterHost";
    logsCollectedAt?: string; // datetime
    /**
     * The progress of log collection or empty if logs are not applicable
     */
    logsInfo?: LogsState;
    logsStartedAt?: string; // datetime
    machineConfigPoolName?: string;
    /**
     * The configured NTP sources on the host.
     */
    ntpSources?: string;
    progress?: HostProgressInfo;
    progressStages?: HostStage[];
    requestedHostname?: string;
    role?: HostRole;
    /**
     * Time at which the current progress stage started.
     */
    stageStartedAt?: string; // date-time
    /**
     * Time at which the current progress stage was last updated.
     */
    stageUpdatedAt?: string; // date-time
    status: "discovering" | "known" | "disconnected" | "insufficient" | "disabled" | "preparing-for-installation" | "preparing-failed" | "preparing-successful" | "pending-for-input" | "installing" | "installing-in-progress" | "installing-pending-user-action" | "resetting-pending-user-action" | "installed" | "error" | "resetting" | "added-to-existing-cluster" | "cancelled" | "binding" | "unbinding" | "unbinding-pending-user-action" | "known-unbound" | "disconnected-unbound" | "insufficient-unbound" | "disabled-unbound" | "discovering-unbound";
    statusInfo: string;
    /**
     * The last time that the host status was updated.
     */
    statusUpdatedAt?: string; // date-time
    suggestedRole?: HostRole;
    updatedAt?: string; // date-time
    userName?: string;
    /**
     * JSON-formatted string containing the validation results for each validation id grouped by category (network, hardware, etc.)
     */
    validationsInfo?: string;
    /**
     * Command for starting the next step runner
     */
    nextStepRunnerCommand?: {
        command?: string;
        args?: string[];
        /**
         * How long in seconds to wait before retrying registration if the command fails
         */
        retrySeconds?: number;
    };
}
export type HostRole = "auto-assign" | "master" | "worker" | "bootstrap";
export type HostRoleUpdateParams = "auto-assign" | "master" | "worker";
export type HostStage = "Starting installation" | "Waiting for control plane" | "Waiting for bootkube" | "Waiting for controller" | "Installing" | "Writing image to disk" | "Rebooting" | "Waiting for ignition" | "Configuring" | "Joined" | "Done" | "Failed";
export interface HostStaticNetworkConfig {
    /**
     * mapping of host macs to logical interfaces used in the network yaml
     */
    macInterfaceMap?: MacInterfaceMap;
    /**
     * yaml string that can be processed by nmstate
     */
    networkYaml?: string;
}
export interface HostTypeHardwareRequirements {
    /**
     * Host requirements that cannot be quantified at the time of calculation. Descriptions or formulas of requiements
     */
    qualitative?: string[];
    /**
     * Host requirements that can be quantified
     */
    quantitative?: ClusterHostRequirementsDetails;
}
export interface HostTypeHardwareRequirementsWrapper {
    /**
     * Requirements towards a master node
     */
    master?: HostTypeHardwareRequirements;
    /**
     * Requirements towards a worker node
     */
    worker?: HostTypeHardwareRequirements;
}
export interface HostUpdateParams {
    disksSelectedConfig?: DiskConfigParams[];
    hostName?: string;
    hostRole?: "auto-assign" | "master" | "worker";
    /**
     * A string which will be used as Authorization Bearer token to fetch the ignition from ignition_endpoint_url.
     */
    ignitionEndpointToken?: string;
    machineConfigPoolName?: string;
}
export type HostValidationId = "connected" | "has-inventory" | "has-min-cpu-cores" | "has-min-valid-disks" | "has-min-memory" | "machine-cidr-defined" | "has-cpu-cores-for-role" | "has-memory-for-role" | "hostname-unique" | "hostname-valid" | "belongs-to-machine-cidr" | "ignition-downloadable" | "belongs-to-majority-group" | "valid-platform-network-settings" | "ntp-synced" | "container-images-available" | "lso-requirements-satisfied" | "ocs-requirements-satisfied" | "sufficient-installation-disk-speed" | "cnv-requirements-satisfied" | "sufficient-network-latency-requirement-for-role" | "sufficient-packet-loss-requirement-for-role" | "has-default-route" | "api-domain-name-resolved-correctly" | "api-int-domain-name-resolved-correctly" | "apps-domain-name-resolved-correctly" | "compatible-with-cluster-platform" | "dns-wildcard-not-configured" | "disk-encryption-requirements-satisfied";
/**
 * Explicit ignition endpoint overrides the default ignition endpoint.
 */
export interface IgnitionEndpoint {
    /**
     * base64 encoded CA certficate to be used when contacting the URL via https.
     */
    caCertificate?: string;
    /**
     * The URL for the ignition endpoint.
     */
    url?: string;
}
export interface ImageCreateParams {
    /**
     * Type of image that should be generated.
     */
    imageType?: ImageType;
    /**
     * SSH public key for debugging the installation.
     */
    sshPublicKey?: string;
    staticNetworkConfig?: HostStaticNetworkConfig[];
}
export interface ImageInfo {
    createdAt?: string; // date-time
    downloadUrl?: string;
    expiresAt?: string; // date-time
    /**
     * Image generator version.
     */
    generatorVersion?: string;
    sizeBytes?: number;
    /**
     * SSH public key for debugging the installation.
     */
    sshPublicKey?: string;
    /**
     * static network configuration string in the format expected by discovery ignition generation
     */
    staticNetworkConfig?: string;
    type?: ImageType;
}
export type ImageType = "full-iso" | "minimal-iso";
export interface ImportClusterParams {
    /**
     * The domain name used to reach the OpenShift cluster API.
     */
    apiVipDnsname: string;
    /**
     * OpenShift cluster name.
     */
    name: string;
    /**
     * The id of the OCP cluster, that hosts will be added to
     */
    openshiftClusterId: string; // uuid
    /**
     * Version of the OpenShift cluster.
     */
    openshiftVersion?: string;
}
export interface InfraEnv {
    /**
     * A comma-separated list of NTP sources (name or IP) going to be added to all the hosts.
     */
    additionalNtpSources?: string;
    /**
     * If set, all hosts that register will be associated with the specified cluster.
     */
    clusterId?: string; // uuid
    /**
     * The CPU architecture of the image (x86_64/arm64/etc).
     */
    cpuArchitecture?: string;
    createdAt: string; // date-time
    downloadUrl?: string;
    emailDomain?: string;
    expiresAt?: string; // date-time
    /**
     * Image generator version.
     */
    generatorVersion?: string;
    /**
     * Self link.
     */
    href: string;
    /**
     * Unique identifier of the object.
     */
    id: string; // uuid
    /**
     * Json formatted string containing the user overrides for the initial ignition config.
     */
    ignitionConfigOverride?: string;
    /**
     * Indicates the type of this object.
     */
    kind: "InfraEnv";
    /**
     * Name of the infra-env.
     */
    name: string;
    /**
     * Version of the OpenShift cluster (used to infer the RHCOS version - temporary until generic logic implemented).
     */
    openshiftVersion?: string;
    orgId?: string;
    proxy?: Proxy;
    /**
     * True if the pull secret has been added to the cluster.
     */
    pullSecretSet?: boolean;
    sizeBytes?: number;
    /**
     * SSH public key for debugging the installation.
     */
    sshAuthorizedKey?: string;
    /**
     * static network configuration string in the format expected by discovery ignition generation.
     */
    staticNetworkConfig?: string;
    type: ImageType;
    /**
     * The last time that this infra-env was updated.
     */
    updatedAt: string; // date-time
    userName?: string;
}
export interface InfraEnvCreateParams {
    /**
     * A comma-separated list of NTP sources (name or IP) going to be added to all the hosts.
     */
    additionalNtpSources?: string;
    /**
     * If set, all hosts that register will be associated with the specified cluster.
     */
    clusterId?: string; // uuid
    /**
     * The CPU architecture of the image (x86_64/arm64/etc).
     */
    cpuArchitecture?: string;
    /**
     * JSON formatted string containing the user overrides for the initial ignition config.
     */
    ignitionConfigOverride?: string;
    imageType?: ImageType;
    /**
     * Name of the infra-env.
     */
    name: string;
    /**
     * Version of the OpenShift cluster (used to infer the RHCOS version - temporary until generic logic implemented).
     */
    openshiftVersion: string;
    proxy?: Proxy;
    /**
     * The pull secret obtained from Red Hat OpenShift Cluster Manager at console.redhat.com/openshift/install/pull-secret.
     */
    pullSecret: string;
    /**
     * SSH public key for debugging the installation.
     */
    sshAuthorizedKey?: string;
    staticNetworkConfig?: HostStaticNetworkConfig[];
}
export interface InfraEnvImageUrl {
    /**
     * Expiration time for the URL token.
     */
    expiresAt?: string; // date-time
    /**
     * Pre-signed URL for downloading the infra-env discovery image.
     */
    url?: string;
}
export type InfraEnvList = InfraEnv[];
export interface InfraEnvUpdateParams {
    /**
     * A comma-separated list of NTP sources (name or IP) going to be added to all the hosts.
     */
    additionalNtpSources?: string;
    /**
     * JSON formatted string containing the user overrides for the initial ignition config.
     */
    ignitionConfigOverride?: string;
    imageType?: ImageType;
    proxy?: Proxy;
    /**
     * The pull secret obtained from Red Hat OpenShift Cluster Manager at console.redhat.com/openshift/install/pull-secret.
     */
    pullSecret?: string;
    /**
     * SSH public key for debugging the installation.
     */
    sshAuthorizedKey?: string;
    staticNetworkConfig?: HostStaticNetworkConfig[];
}
export interface InfraError {
    /**
     * Numeric identifier of the error.
     */
    code: number; // int32
    /**
     * Human-readable description of the error.
     */
    message: string;
}
export type IngressCertParams = string;
export interface InstallerArgsParams {
    /**
     * List of additional arguments passed to coreos-installer
     * example:
     * --append-karg,ip=192.0.2.2::192.0.2.254:255.255.255.0:core0.example.com:enp1s0:none,--save-partindex,1,-n
     */
    args?: string[];
}
export interface Interface {
    biosdevname?: string;
    clientId?: string;
    flags?: string[];
    hasCarrier?: boolean;
    ipv4Addresses?: string[];
    ipv6Addresses?: string[];
    macAddress?: string;
    mtu?: number;
    name?: string;
    product?: string;
    speedMbps?: number;
    vendor?: string;
}
export interface Inventory {
    bmcAddress?: string;
    bmcV6address?: string;
    boot?: Boot;
    cpu?: Cpu;
    disks?: Disk[];
    gpus?: Gpu[];
    hostname?: string;
    interfaces?: Interface[];
    memory?: Memory;
    routes?: Route[];
    systemVendor?: SystemVendor;
    timestamp?: number;
    tpmVersion?: "none" | "1.2" | "2.0";
}
export interface IoPerf {
    /**
     * 99th percentile of fsync duration in milliseconds
     */
    syncDuration?: number;
}
export interface L2Connectivity {
    outgoingIpAddress?: string;
    outgoingNic?: string;
    remoteIpAddress?: string;
    remoteMac?: string;
    successful?: boolean;
}
export interface L3Connectivity {
    /**
     * Average round trip time in milliseconds.
     */
    averageRttMs?: number; // double
    outgoingNic?: string;
    /**
     * Percentage of packets lost during connectivity check.
     */
    packetLossPercentage?: number; // double
    remoteIpAddress?: string;
    successful?: boolean;
}
export type ListManagedDomains = ManagedDomain[];
export type ListManifests = Manifest[];
export interface ListVersions {
    releaseTag?: string;
    versions?: Versions;
}
export interface LogsProgressParams {
    /**
     * The state of collecting logs.
     */
    logsState: LogsState;
}
export type LogsState = "requested" | "collecting" | "completed" | "timeout" | "";
export type LogsType = "host" | "controller" | "all" | "";
export type MacInterfaceMap = {
    /**
     * mac address present on the host
     */
    macAddress?: string; // ^([0-9A-Fa-f]{2}[:]){5}([0-9A-Fa-f]{2})$
    /**
     * nic name used in the yaml, which relates 1:1 to the mac address
     */
    logicalNicName?: string;
}[];
/**
 * IP address block for node IP blocks.
 */
export interface MachineNetwork {
    /**
     * The IP block address pool for machines within the cluster.
     */
    cidr?: Subnet; // ^(?:(?:(?:[0-9]{1,3}\.){3}[0-9]{1,3}\/(?:(?:[0-9])|(?:[1-2][0-9])|(?:3[0-2])))|(?:(?:[0-9a-fA-F]*:[0-9a-fA-F]*){2,})/(?:(?:[0-9])|(?:[1-9][0-9])|(?:1[0-1][0-9])|(?:12[0-8])))$
    /**
     * The cluster that this network is associated with.
     */
    clusterId?: string; // uuid
}
export interface ManagedDomain {
    domain?: string;
    provider?: "route53";
}
export interface Manifest {
    /**
     * The file name prefaced by the folder that contains it.
     */
    fileName?: string;
    /**
     * The folder that contains the files. Manifests can be placed in 'manifests' or 'openshift' directories.
     */
    folder?: "manifests" | "openshift";
}
export interface Memory {
    physicalBytes?: number;
    /**
     * The method by which the physical memory was set
     */
    physicalBytesMethod?: MemoryMethod;
    usableBytes?: number;
}
export type MemoryMethod = "dmidecode" | "ghw" | "meminfo";
export interface MonitoredOperator {
    /**
     * The cluster that this operator is associated with.
     */
    clusterId?: string; // uuid
    /**
     * Unique name of the operator.
     */
    name?: string;
    /**
     * Namespace where to deploy an operator. Only some operators require a namespace.
     */
    namespace?: string;
    operatorType?: OperatorType;
    /**
     * Blob of operator-dependent parameters that are required for installation.
     */
    properties?: string;
    status?: OperatorStatus;
    /**
     * Detailed information about the operator state.
     */
    statusInfo?: string;
    /**
     * Time at which the operator was last updated.
     */
    statusUpdatedAt?: string; // date-time
    /**
     * The name of the subscription of the operator.
     */
    subscriptionName?: string;
    /**
     * Positive number represents a timeout in seconds for the operator to be available.
     */
    timeoutSeconds?: number;
}
export type MonitoredOperatorsList = MonitoredOperator[];
export interface NtpSource {
    /**
     * NTP source name or IP.
     */
    sourceName?: string;
    /**
     * Indication of state of an NTP source.
     */
    sourceState?: SourceState;
}
export interface NtpSynchronizationRequest {
    /**
     * A comma-separated list of NTP sources (name or IP) going to be added to all the hosts.
     */
    ntpSource: string;
}
export interface NtpSynchronizationResponse {
    ntpSources?: NtpSource[];
}
export interface OpenshiftVersion {
    /**
     * Available CPU architectures.
     */
    cpuArchitectures?: string[];
    /**
     * Indication that the version is the recommended one.
     */
    default?: boolean;
    /**
     * Name of the version to be presented to the user.
     */
    displayName?: string;
    /**
     * The installation image of the OpenShift cluster.
     */
    releaseImage?: string;
    /**
     * OCP version from the release metadata.
     */
    releaseVersion?: string;
    /**
     * The base RHCOS image used for the discovery iso.
     */
    rhcosImage?: string;
    /**
     * The RHCOS rootfs url.
     */
    rhcosRootfs?: string;
    /**
     * Build ID of the RHCOS image.
     */
    rhcosVersion?: string;
    /**
     * Level of support of the version.
     */
    supportLevel?: "beta" | "production" | "maintenance";
}
export interface OpenshiftVersions {
    [name: string]: OpenshiftVersion;
}
export interface OperatorCreateParams {
    name?: string;
    /**
     * Blob of operator-dependent parameters that are required for installation.
     */
    properties?: string;
}
export interface OperatorHardwareRequirements {
    /**
     * List of other operator unique names that are required to be installed. Corresponds to name property of the monitored-operator, i.e. "lso", "cnv", etc.
     */
    dependencies?: string[];
    /**
     * Unique name of the operator. Corresponds to name property of the monitored-operator, i.e. "lso", "cnv", etc.
     */
    operatorName?: string;
    requirements?: HostTypeHardwareRequirementsWrapper;
}
export interface OperatorHostRequirements {
    /**
     * Name of the operator
     */
    operatorName?: string;
    /**
     * Host requirements for the operator
     */
    requirements?: ClusterHostRequirementsDetails;
}
export interface OperatorMonitorReport {
    /**
     * Unique name of the operator.
     */
    name?: string;
    status?: OperatorStatus;
    /**
     * Detailed information about the operator state.
     */
    statusInfo?: string;
}
export type OperatorProperties = OperatorProperty[];
export interface OperatorProperty {
    /**
     * Type of the property
     */
    dataType?: "boolean" | "string" | "integer" | "float";
    /**
     * Default value for the property
     */
    defaultValue?: string;
    /**
     * Description of a property
     */
    description?: string;
    /**
     * Indicates whether the property is reqired
     */
    mandatory?: boolean;
    /**
     * Name of the property
     */
    name?: string;
    /**
     * Values to select from
     */
    options?: string[];
}
/**
 * Represents the operator state.
 */
export type OperatorStatus = "failed" | "progressing" | "available";
/**
 * Kind of operator. Different types are monitored by the service differently.
 */
export type OperatorType = "builtin" | "olm";
export interface OsImage {
    /**
     * The CPU architecture of the image (x86_64/arm64/etc).
     */
    cpuArchitecture: string;
    /**
     * Version of the OpenShift cluster.
     */
    openshiftVersion: string;
    /**
     * The OS rootfs url.
     */
    rootfsUrl: string;
    /**
     * The base OS image used for the discovery iso.
     */
    url: string;
    /**
     * Build ID of the OS image.
     */
    version: string;
}
export type OsImages = OsImage[];
/**
 * oVirt platform-specific configuration upon which to perform the installation.
 */
export interface OvirtPlatform {
    /**
     * The CA Bundle of the oVirt's engine certificate.
     */
    caBundle?: string;
    /**
     * The oVirt cluster ID.
     */
    clusterId?: string; // uuid
    /**
     * The oVirt's engine fully qualified domain name.
     */
    fqdn?: string;
    /**
     * Verify oVirt engine certificate.
     */
    insecure?: boolean;
    /**
     * The oVirt network the VMs will be attached to.
     */
    networkName?: string;
    /**
     * The password for the oVirt user name.
     */
    password?: string; // password
    /**
     * The oVirt storage domain ID.
     */
    storageDomainId?: string; // uuid
    /**
     * The user name to use to connect to the oVirt instance.
     */
    username?: string;
    /**
     * The oVirt VNIC profile ID.
     */
    vnicProfileId?: string; // uuid
}
/**
 * The configuration for the specific platform upon which to perform the installation.
 */
export interface Platform {
    ovirt?: OvirtPlatform;
    type: PlatformType;
}
export type PlatformType = "baremetal" | "vsphere" | "ovirt" | "none";
export interface PreflightHardwareRequirements {
    /**
     * Preflight OCP requirements
     */
    ocp?: HostTypeHardwareRequirementsWrapper;
    /**
     * Preflight operators hardware requirements
     */
    operators?: OperatorHardwareRequirements[];
}
export interface Presigned {
    url: string;
}
export interface Proxy {
    /**
     * A proxy URL to use for creating HTTP connections outside the cluster.
     * http://\<username\>:\<pswd\>@\<ip\>:\<port\>
     * 
     */
    httpProxy?: string;
    /**
     * A proxy URL to use for creating HTTPS connections outside the cluster.
     * http://\<username\>:\<pswd\>@\<ip\>:\<port\>
     * 
     */
    httpsProxy?: string;
    /**
     * An "*" or a comma-separated list of destination domain names, domains, IP addresses, or other network CIDRs to exclude from proxying.
     */
    noProxy?: string;
}
export interface ReleaseImage {
    /**
     * The CPU architecture of the image (x86_64/arm64/etc).
     */
    cpuArchitecture: string;
    /**
     * Indication that the version is the recommended one.
     */
    default?: boolean;
    /**
     * Version of the OpenShift cluster.
     */
    openshiftVersion: string;
    /**
     * Level of support of the version.
     */
    supportLevel?: "beta" | "production" | "maintenance";
    /**
     * The installation image of the OpenShift cluster.
     */
    url: string;
    /**
     * OCP version from the release metadata.
     */
    version: string;
}
export type ReleaseImages = ReleaseImage[];
export interface Route {
    /**
     * The destination network or destination host
     */
    destination?: string;
    /**
     * Defines whether this is an IPv4 (4) or IPv6 route (6)
     */
    family?: number; // int32
    /**
     * Gateway address where the packets are sent
     */
    gateway?: string;
    /**
     * Interface to which packets for this route will be sent
     */
    interface?: string;
}
/**
 * IP address block for service IP blocks.
 */
export interface ServiceNetwork {
    /**
     * The IP block address pool.
     */
    cidr?: Subnet; // ^(?:(?:(?:[0-9]{1,3}\.){3}[0-9]{1,3}\/(?:(?:[0-9])|(?:[1-2][0-9])|(?:3[0-2])))|(?:(?:[0-9a-fA-F]*:[0-9a-fA-F]*){2,})/(?:(?:[0-9])|(?:[1-9][0-9])|(?:1[0-1][0-9])|(?:12[0-8])))$
    /**
     * The cluster that this network is associated with.
     */
    clusterId?: string; // uuid
}
export type SourceState = "synced" | "combined" | "not_combined" | "error" | "variable" | "unreachable";
export interface Step {
    args?: string[];
    command?: string;
    stepId?: string;
    stepType?: StepType;
}
export interface StepReply {
    error?: string;
    exitCode?: number;
    output?: string;
    stepId?: string;
    stepType?: StepType;
}
export type StepType = "connectivity-check" | "execute" | "inventory" | "install" | "free-network-addresses" | "reset-installation" | "dhcp-lease-allocate" | "api-vip-connectivity-check" | "ntp-synchronizer" | "installation-disk-speed-check" | "container-image-availability" | "domain-resolution";
export interface Steps {
    instructions?: Step[];
    nextInstructionSeconds?: number;
    /**
     * What to do after finishing to run step instructions
     */
    postStepAction?: "exit" | "continue";
}
export type StepsReply = StepReply[];
export type Subnet = string; // ^(?:(?:(?:[0-9]{1,3}\.){3}[0-9]{1,3}\/(?:(?:[0-9])|(?:[1-2][0-9])|(?:3[0-2])))|(?:(?:[0-9a-fA-F]*:[0-9a-fA-F]*){2,})/(?:(?:[0-9])|(?:[1-9][0-9])|(?:1[0-1][0-9])|(?:12[0-8])))$
export interface SystemVendor {
    manufacturer?: string;
    productName?: string;
    serialNumber?: string;
    /**
     * Whether the machine appears to be a virtual machine or not
     */
    virtual?: boolean;
}
export interface Usage {
    /**
     * additional properties of the feature
     */
    data?: {
        [name: string]: {
        };
    };
    /**
     * Unique idenftifier of the feature
     */
    id?: string;
    /**
     * name of the feature to track
     */
    name?: string;
}
export interface V2ClusterUpdateParams {
    /**
     * A comma-separated list of NTP sources (name or IP) going to be added to all the hosts.
     */
    additionalNtpSource?: string;
    /**
     * The virtual IP used to reach the OpenShift cluster's API.
     */
    apiVip?: string; // ^(?:(?:(?:[0-9]{1,3}\.){3}[0-9]{1,3})|(?:(?:[0-9a-fA-F]*:[0-9a-fA-F]*){2,}))?$
    /**
     * The domain name used to reach the OpenShift cluster API.
     */
    apiVipDnsName?: string;
    /**
     * Base domain of the cluster. All DNS records must be sub-domains of this base and include the cluster name.
     */
    baseDnsDomain?: string;
    /**
     * IP address block from which Pod IPs are allocated. This block must not overlap with existing physical networks. These IP addresses are used for the Pod network, and if you need to access the Pods from an external network, configure load balancers and routers to manage the traffic.
     */
    clusterNetworkCidr?: string; // ^(?:(?:(?:[0-9]{1,3}\.){3}[0-9]{1,3}\/(?:(?:[0-9])|(?:[1-2][0-9])|(?:3[0-2])))|(?:(?:[0-9a-fA-F]*:[0-9a-fA-F]*){2,})/(?:(?:[0-9])|(?:[1-9][0-9])|(?:1[0-1][0-9])|(?:12[0-8])))$
    /**
     * The subnet prefix length to assign to each individual node. For example, if clusterNetworkHostPrefix is set to 23, then each node is assigned a /23 subnet out of the given cidr (clusterNetworkCIDR), which allows for 510 (2^(32 - 23) - 2) pod IPs addresses. If you are required to provide access to nodes from an external network, configure load balancers and routers to manage the traffic.
     */
    clusterNetworkHostPrefix?: number;
    /**
     * Cluster networks that are associated with this cluster.
     */
    clusterNetworks?: ClusterNetwork[];
    /**
     * Installation disks encryption mode and host roles to be applied.
     */
    diskEncryption?: DiskEncryption;
    /**
     * A proxy URL to use for creating HTTP connections outside the cluster.
     * http://\<username\>:\<pswd\>@\<ip\>:\<port\>
     * 
     */
    httpProxy?: string;
    /**
     * A proxy URL to use for creating HTTPS connections outside the cluster.
     * http://\<username\>:\<pswd\>@\<ip\>:\<port\>
     * 
     */
    httpsProxy?: string;
    /**
     * Enable/disable hyperthreading on master nodes, worker nodes, or all nodes.
     */
    hyperthreading?: "masters" | "workers" | "all" | "none";
    /**
     * Explicit ignition endpoint overrides the default ignition endpoint.
     */
    ignitionEndpoint?: IgnitionEndpoint;
    /**
     * The virtual IP used for cluster ingress traffic.
     */
    ingressVip?: string; // ^(?:(?:(?:[0-9]{1,3}\.){3}[0-9]{1,3})|(?:(?:[0-9a-fA-F]*:[0-9a-fA-F]*){2,}))?$
    /**
     * A CIDR that all hosts belonging to the cluster should have an interfaces with IP address that belongs to this CIDR. The api_vip belongs to this CIDR.
     */
    machineNetworkCidr?: string; // ^(?:(?:(?:[0-9]{1,3}\.){3}[0-9]{1,3}\/(?:(?:[0-9])|(?:[1-2][0-9])|(?:3[0-2])))|(?:(?:[0-9a-fA-F]*:[0-9a-fA-F]*){2,})/(?:(?:[0-9])|(?:[1-9][0-9])|(?:1[0-1][0-9])|(?:12[0-8])))$
    /**
     * Machine networks that are associated with this cluster.
     */
    machineNetworks?: MachineNetwork[];
    /**
     * OpenShift cluster name.
     */
    name?: string;
    /**
     * The desired network type used.
     */
    networkType?: "OpenShiftSDN" | "OVNKubernetes";
    /**
     * An "*" or a comma-separated list of destination domain names, domains, IP addresses, or other network CIDRs to exclude from proxying.
     */
    noProxy?: string;
    /**
     * List of OLM operators to be installed.
     */
    olmOperators?: OperatorCreateParams[];
    platform?: Platform;
    /**
     * The pull secret obtained from Red Hat OpenShift Cluster Manager at console.redhat.com/openshift/install/pull-secret.
     */
    pullSecret?: string;
    /**
     * Schedule workloads on masters
     */
    schedulableMasters?: boolean;
    /**
     * The IP address pool to use for service IP addresses. You can enter only one IP address pool. If you need to access the services from an external network, configure load balancers and routers to manage the traffic.
     */
    serviceNetworkCidr?: string; // ^(?:(?:(?:[0-9]{1,3}\.){3}[0-9]{1,3}\/(?:(?:[0-9])|(?:[1-2][0-9])|(?:3[0-2])))|(?:(?:[0-9a-fA-F]*:[0-9a-fA-F]*){2,})/(?:(?:[0-9])|(?:[1-9][0-9])|(?:1[0-1][0-9])|(?:12[0-8])))$
    /**
     * Service networks that are associated with this cluster.
     */
    serviceNetworks?: ServiceNetwork[];
    /**
     * SSH public key for debugging OpenShift nodes.
     */
    sshPublicKey?: string;
    /**
     * Indicate if the networking is managed by the user.
     */
    userManagedNetworking?: boolean;
    /**
     * Indicate if virtual IP DHCP allocation mode is enabled.
     */
    vipDhcpAllocation?: boolean;
}
export interface V2Events {
    categories?: string[];
    clusterId?: string;
    hostId?: string;
    infraEnvId?: string;
}
export interface V2InfraEnvs {
    clusterId?: string;
}
export interface VersionedHostRequirements {
    /**
     * Master node requirements
     */
    master?: ClusterHostRequirementsDetails;
    /**
     * Single node OpenShift node requirements
     */
    sno?: ClusterHostRequirementsDetails;
    /**
     * Version of the component for which requirements are defined
     */
    version?: string;
    /**
     * Worker node requirements
     */
    worker?: ClusterHostRequirementsDetails;
}
export interface Versions {
    [name: string]: string;
}
