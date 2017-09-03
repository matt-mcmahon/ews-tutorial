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

  t.test(`creating a server`, async t => {
    const server = await ews.create()

    {
      const actual = server.constructor
      const expected = ews.create
      const message = `server.constructor should be ews.create`
      t.same(actual, expected, message)
    }

    {
      const actual = Object.keys(server).sort()
      const expected = [ 'close', 'constructor', 'hostname', 'listen', 'listening', 'port' ].sort()
      const message = `expected enumerables: ${expected.join(', ')}`
      t.same(actual, expected, message)
    }

    {
      const actual = typeof server.close
      const expected = 'function'
      const message = 'server.close should be a function'
      t.same(actual, expected, message)
    }

    {
      const actual = server.hostname
      const expected = undefined
      const message = 'server.hostname should be undefined'
      t.same(actual, expected, message)
    }

    {
      const actual = typeof server.listen
      const expected = 'function'
      const message = 'server.listen should be a function'
      t.same(actual, expected, message)
    }

    {
      const actual = server.listening
      const expected = false
      const message = 'server should not be listening'
      t.same(actual, expected, message)
    }

    {
      const actual = server.port
      const expected = undefined
      const message = 'server.port should be undefined'
      t.same(actual, expected, message)
    }
  })

  test('server life cycle', async t => {
    const server = await ews.create()

    await server.listen()

    {
      const actual = server.hostname
      const message = `server.hostname should not be nothing — is "${actual}"`
      t.ok(actual, message)
    }

    {
      const actual = server.port
      const message = `server.port should not be nothing — is "${actual}"`
      t.ok(actual, message)
    }

    {
      const actual = server.listening
      const expected = true
      const message = 'server should be listening'
      t.same(actual, expected, message)
    }

    try {
      await (await ews.create()).listen(server.port)
      t.fail('binding a new server to the same port should fail')
    } catch (err) {
      const actual = err.code
      const expected = 'EADDRINUSE'
      const message = 'new server on same port should fail with "address in use" error'
      t.same(actual, expected, message)
    }

    await server.close()

    {
      const actual = server.listening
      const expected = false
      const message = 'server should NOT be listening'
      t.same(actual, expected, message)
    }
  })
})
