// source/ews.test.js
'use strict'

const test = require('blue-tape')
const ews = require('./ews')

test('ews.test.js', async t => {
  {
    const actual = typeof ews
    const expected = 'object'
    const message = 'ews should export an object'
    t.same(actual, expected, message)
  }

  {
    const actual = Object.keys(ews).sort()
    const expected = ['create'].sort()
    const message = `expect enumerables: ${expected.join(', ')}`
    t.same(actual, expected, message)
  }

  {
    const actual = typeof ews.create
    const expected = 'function'
    const message = 'ews.create should be a function'
    t.same(actual, expected, message)
  }

  const serverPromise = ews.create()
  const server = await serverPromise //eslint-disable-line

  t.test('ews.create()', async t => {
    {
      const actual = serverPromise.constructor
      const expected = Promise
      const message = 'invoking ews.create should return a Promise'
      t.same(actual, expected, message)
    }

    // {
    //   const actual = server.constructor
    //   const expected = ews.create
    //   const message = `server.constructor should be ews.create`
    //   t.same(actual, expected, message)
    // }

    // {
    //   const actual = server.propertyIsEnumerable('constructor')
    //   const expected = false
    //   const message = 'server.constructor should NOT be enumerable'
    //   t.same(actual, expected, message)
    // }

    // {
    //   const actual = Object.keys(server).sort()
    //   const expected = [ 'close', 'hostname', 'listen', 'listening', 'port' ].sort()
    //   const message = `expected enumerables: ${expected.join(', ')}`
    //   t.same(actual, expected, message)
    // }

    // {
    //   const actual = typeof server.close
    //   const expected = 'function'
    //   const message = 'server.close should be a function'
    //   t.same(actual, expected, message)
    // }

    // {
    //   const actual = server.hostname
    //   const expected = undefined
    //   const message = 'server.hostname should be undefined'
    //   t.same(actual, expected, message)
    // }

    // {
    //   const actual = typeof server.listen
    //   const expected = 'function'
    //   const message = 'server.listen should be a function'
    //   t.same(actual, expected, message)
    // }

    // {
    //   const actual = server.listening
    //   const expected = false
    //   const message = 'server should not be listening'
    //   t.same(actual, expected, message)
    // }

    // {
    //   const actual = server.port
    //   const expected = undefined
    //   const message = 'server.port should be undefined'
    //   t.same(actual, expected, message)
    // }
  })

  // const listeningServerPromise = server.listen()
  // const listeningServer = await listeningServerPromise

  t.test(`server.listen(...)`, async t => {
    // {
    //   const actual = listeningServerPromise.constructor
    //   const expected = Promise
    //   const message = 'invoking server.listen should return a Promise'
    //   t.same(actual, expected, message)
    // }

    // {
    //   const actual = Object.prototype.toString(listeningServer)
    //   const expected = '[object EchoWebServer]'
    //   const message = `Promise should resolve to a server instance`
    //   t.same(actual, expected, message)
    // }

    // {
    //   const actual = Object.keys(listeningServer).sort()
    //   const expected = [ 'close', 'hostname', 'listen', 'listening', 'port' ].sort()
    //   const message = `expected enumerables: ${expected.join(', ')}`
    //   t.same(actual, expected, message)
    // }

    // {
    //   const actual = listeningServer.hostname
    //   const expected = undefined
    //   const message = 'server.hostname should be defined'
    //   t.notSame(actual, expected, message)
    // }

    // {
    //   const actual = listeningServer.port
    //   const expected = undefined
    //   const message = 'server.port should be defined'
    //   t.notSame(actual, expected, message)
    // }

    // {
    //   const actual = listeningServer.listening
    //   const expected = true
    //   const message = 'server should be listening'
    //   t.same(actual, expected, message)
    // }
  })

  // const closedServerPromise = listeningServer.close()
  // const closedServer = await closedServerPromise //eslint-disable-line

  t.test('server.close', async t => {
    // {
    //   const actual = typeof listeningServer.close
    //   const expected = 'function'
    //   const message = 'listeningServer.close should be a function'
    //   t.same(actual, expected, message)
    // }

    // {
    //   const actual = closedServerPromise.constructor
    //   const expected = Promise
    //   const message = 'invoking server.close should return a promise'
    //   t.same(actual, expected, message)
    // }

    // {
    //   const actual = closedServer.constructor
    //   const expected = ews.create
    //   const message = 'Promise should resolve a server'
    //   t.same(actual, expected, message)
    // }
  })
})
