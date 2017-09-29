// source/ews.js
'use strict'

const facadeFor = (server, listen, close) =>
Object.freeze({
  listen,
  close,
  get listening () {
    return server.listening
  },
  get port () {
    return server.address() ? server.address().port : undefined
  },
  get hostname () {
    return server.address() ? server.address().address : undefined
  },
  constructor: create,
  get [Symbol.toStringTag] () {
    return 'EchoWebServer'
  }
})

const create = (http = require('http'), ...createServerArgs) => {
  const server = http.createServer(...createServerArgs)

  const listen = (port = 0, hostname = '::') =>
  new Promise((resolve, reject) => {
    server.listen(port, hostname, () => {
      resolve(facade)
      server.removeListener('error', reject)
    })
    server.once('error', reject)
  })

  const close = () => new Promise((resolve, reject) => {
    server.close(err => {
      err ? reject(err) : resolve(facade)
    })
  })

  const facade = facadeFor(server, listen, close)

  return Promise.resolve(facade)
}

module.exports = {
  create
}
