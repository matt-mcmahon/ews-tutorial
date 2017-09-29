// source/ews.js
'use strict'

const facadeFor = (server, listen, close) => {
  const getListening = () => server.listening

  const getPort = () => server.address()
    ? server.address().port
    : undefined

  const getHostname = () => server.address()
    ? server.address().address
    : undefined

  return Object.freeze(Object.defineProperties({
    listen,
    close
  }, {
    listening: {
      get: getListening,
      enumerable: true
    },
    port: {
      get: getPort,
      enumerable: true
    },
    hostname: {
      get: getHostname,
      enumerable: true
    },
    constructor: {
      value: create
    },
    [Symbol.toStringTag]: {
      value: 'EchoWebServer'
    }
  }))
}

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

Object.defineProperties(create, {
  [Symbol.toStringTag]: {
    get: () => 'Factory'
  }
})

module.exports = {
  create
}
