'use strict'

const IPFSStorageEndpoint = require('./src/ipfs-store')
const {Mirador} = window

Mirador.IPFSStorageEndpoint = IPFSStorageEndpoint

Mirador({
  id: 'viewer',
  layout: '1x1',
  buildPath: 'vendor/mirador/',
  data: [{
    manifestUri: 'https://iiif.lib.harvard.edu/manifests/drs:48309543',
    location: 'Harvard University'
  }, {
    manifestUri: 'https://iiif.lib.harvard.edu/manifests/drs:5981093',
    location: 'Harvard University'
  }],
  windowObjects: [{
    loadedManifest: 'https://iiif.lib.harvard.edu/manifests/drs:48309543',
    canvasID: 'https://iiif.lib.harvard.edu/manifests/drs:48309543/canvas/canvas-48309545.json',
    viewType: 'ImageView'
  }],
  annotationEndpoint: {
    name: 'IPFS Storage',
    module: 'IPFSStorageEndpoint'
  },
  displayLayout: false,
  bottomPanel: false,
  bottomPanelAvailable: false,
  bottomPanelVisible: false,
  sidePanel: false
})
