'use strict'

const ipfs = require('ipfs-daemon')

ipfs({
  Flags: ['--enable-pubsub-experiment'], // Flags to pass to IPFS daemon
  Addresses: { // IPFS Daemon addresses
    API: '/ip4/127.0.0.1/tcp/5001',
    Swarm: ['/ip4/0.0.0.0/tcp/4001'],
    Gateway: '/ip4/0.0.0.0/tcp/8080'
  },
  API: { // API config for IPFS daemon
    HTTPHeaders: {
      'Access-Control-Allow-Origin': ['*'], // Origins from which to allow http requests
      'Access-Control-Allow-Methods': ['PUT', 'POST', 'GET'], // 'PUT', 'GET', 'POST', 'DELETE', etc.
      'Access-Control-Allow-Credentials': ['true'] // 'true' || 'false'
    }
  }
})
  .then((res) => res.ipfs.id())
  .then((id) => {
    console.log('daemon running with id %s', id.id)
    id.addresses.forEach((addr) => console.log('\t%s', addr))
  })
  .catch((err) => {
    throw err
  })
