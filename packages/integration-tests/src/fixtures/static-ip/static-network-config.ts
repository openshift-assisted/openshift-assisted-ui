const dummyStaticNetworkConfig = [
  {
    network_yaml:
      '#generated by ui form view\ninterfaces:\n  - name: DUMMY4\n    type: ethernet\n    state: up\n    ipv4:\n      address:\n        - ip: 0.0.0.0\n          prefix-length: 24\n      enabled: true\n      dhcp: false\n',
    mac_interface_map: [{ mac_address: '01:23:45:67:89:AB', logical_nic_name: 'DUMMY4' }],
  },
];

const networkWideConfigured = [
  {
    network_yaml:
      '#generated by ui form view\n#ipv4MachineNetwork 192.168.1.222/11\ninterfaces:\n  - name: DUMMY4\n    type: ethernet\n    state: up\n    ipv4:\n      address:\n        - ip: 0.0.0.0\n          prefix-length: 24\n      enabled: true\n      dhcp: false\ndns-resolver:\n  config:\n    server:\n      - 192.168.1.22\nroutes:\n  config:\n    - destination: 0.0.0.0/0\n      next-hop-address: 192.168.1.224\n      next-hop-interface: DUMMY4\n      table-id: 254\n',
    mac_interface_map: [{ mac_address: '01:23:45:67:89:AB', logical_nic_name: 'DUMMY4' }],
  },
];

export { dummyStaticNetworkConfig, networkWideConfigured };