'use strict'

const OrbitDB = require('orbit-db')
const findIndex = require('lodash.findindex')

const {jQuery, IpfsApi} = window

module.exports = class IPFSStorageEndpoint {
  constructor (options) {
    jQuery.extend(this, {
      token: null,
      prefix: null,
      dfd: null,
      annotationsList: [],
      windowID: null,
      eventEmitter: null
    }, options)

    this.init()
  }

  // Set up some options for catch
  init () {
    this.ipfs = new IpfsApi('localhost', '5001')
    this.orbitdb = new OrbitDB(this.ipfs, 'mirador-annotations')
    this.db = this.orbitdb.docstore('hello')
    this.db.events.on('data', (dbname, ev) => {
      // this.db.sync(ev.hash).catch((e) => console.error(e.stack))
    })
    this.ready = new Promise((resolve, reject) => {
      this.db.events.on('ready', () => {
        console.log('synchronized')
        resolve()
      })
    })
  }

  set (prop, value, options) {
    if (options) {
      this[options.parent][prop] = value
    } else {
      this[prop] = value
    }
  }

  // Search endpoint for all annotations with a given URI
  search (options, successCallback, errorCallback) {
    successCallback = successCallback || (() => this.dfd.resolve(true))
    errorCallback = errorCallback || noop

    this.annotationsList = []
    const key = options.uri
    console.log('searching for %s', key)
    this.ready.then(() => {
      const res = this.db.get(key)
      console.log('got results', res)
      if (res && res.length > 0) {
        this.annotationsList = res[0].list.map((el) => {
          el.endpoint = this
          return el
        })

        successCallback(this.annotationsList)
      }
    }).catch(errorCallback)
  }

  deleteAnnotation (annotationID, successCallback, errorCallback) {
    successCallback = successCallback || noop
    errorCallback = errorCallback || noop

    const key = this.annotationsList[0].on.full
    this.annotationsList = this.annotationsList.filter((el) => {
      return el['@id'] !== annotationID
    })

    this.db.delete(key).then(() => this.save(key))
    .then((removed) => {
      console.log('deleted', removed)
      successCallback()
    }).catch(errorCallback)
  }

  update (oaAnnotation, successCallback, errorCallback) {
    successCallback = successCallback || noop
    errorCallback = errorCallback || noop

    const key = oaAnnotation.on.full
    const id = oaAnnotation['@id']
    oaAnnotation.endpoint = this

    const index = findIndex(this.annotationsList, (el) => el['@id'] === id)

    if (index) {
      this.annotationsList[index] = oaAnnotation
    }

    this.save(key).then((hash) => {
      console.log('updated', hash)
      successCallback(oaAnnotation)
    }).catch(errorCallback)
  }

  // takes OA Annotation, gets Endpoint Annotation, and saves
  // if successful, MUST return the OA rendering of the annotation
  create (oaAnnotation, successCallback, errorCallback) {
    successCallback = successCallback || noop
    errorCallback = errorCallback || noop

    const key = oaAnnotation.on.full
    oaAnnotation['@id'] = `${key}/${Date.now()}`
    oaAnnotation.endpoint = this
    this.annotationsList.push(oaAnnotation)

    this.save(key).then((hash) => {
      console.log('stored', oaAnnotation, hash)
      successCallback(oaAnnotation)
    }, errorCallback)
  }

  save (id) {
    console.log('saving', id)
    return this.db.put({
      _id: id,
      list: this.annotationsList.map((elem) => {
        elem.endpoint = null
        return elem
      })
    })
  }

  userAuthorize (action, annotation) {
    return true
  }
}

function noop () {}
