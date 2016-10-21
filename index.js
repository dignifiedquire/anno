'use strict'

const IPFSStorageEndpoint = require('./src/ipfs-store')
const {Mirador} = window

Mirador.IPFSStorageEndpoint = IPFSStorageEndpoint

Mirador({
  id: 'viewer',
  layout: '1x1',
  buildPath: 'vendor/mirador/',
  data: [
    { 'manifestUri': 'https://purl.stanford.edu/qm670kv1873/iiif/manifest.json', 'location': 'Stanford University'}//,
    // { 'manifestUri': 'https://purl.stanford.edu/jr903ng8662/iiif/manifest.json', 'location': 'Stanford University'},
    // { 'manifestUri': 'https://purl.stanford.edu/ch264fq0568/iiif/manifest.json', 'location': 'Stanford University'},
    // { 'manifestUri': 'https://purl.stanford.edu/wh234bz9013/iiif/manifest.json', 'location': 'Stanford University'},
    // { 'manifestUri': 'https://purl.stanford.edu/rd447dz7630/iiif/manifest.json', 'location': 'Stanford University'},
    // { 'manifestUri': 'http://dms-data.stanford.edu/data/manifests/Stanford/ege1/manifest.json', 'location': 'Stanford University'},
    // { 'manifestUri': 'http://dams.llgc.org.uk/iiif/4574752/manifest.json', 'location': 'National Library of Wales'},
    // { 'manifestUri': 'http://manifests.ydc2.yale.edu/manifest/Admont23', 'location': 'Yale University'},
    // { 'manifestUri': 'http://manifests.ydc2.yale.edu/manifest/Admont43', 'location': 'Yale University'},
    // { 'manifestUri': 'http://manifests.ydc2.yale.edu/manifest/BeineckeMS10', 'location': 'Yale University'},
    // { 'manifestUri': 'http://manifests.britishart.yale.edu/manifest/5005', 'location': 'Yale Center For British Art'}
  ],
  windowObjects: [],
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
