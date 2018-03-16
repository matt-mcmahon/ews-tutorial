// source/ews.test.js
'use strict'

const test = require('blue-tape')
const ews = require('./ews')

const typeString = o => Object.prototype.toString.call(o)

test('Testing EWS Module Exports', async t => {
  {
    const actual = typeString(ews)
    const expected = '[object Object]'
    const message = `ews should be "${expected}"`
    t.same(actual, expected, message)
  }

  {
    const actual = Object.keys(ews).sort()
    const expected = ['create'].sort()
    const message = `enumerables should be: ${expected.join(', ')}`
    t.same(actual, expected, message)
  }

  {
    const actual = typeString(ews.create)
    const expected = '[object Factory]'
    const message = `ews.create should be "${expected}"`
    t.same(actual, expected, message)
  }
})

ews.create().then(server => {
  test(`server with default port/hostname`, async t => {
    {
      const expected = `[object EchoWebServer]`
      const actual = typeString(server)
      const message = `type string for server should be "${expected}"`
      t.same(actual, expected, message)
    }

    {
      const actual = server.constructor
      const expected = ews.create
      const message = `server.constructor should be "${expected.name}"`
      t.same(actual, expected, message)
    }

    {
      const actual = Object.keys(server).sort()
      const expected = [
        'listen',
        'close',
        'hostname',
        'listening',
        'port'
      ].sort()
      const message = `enumerables should be: ${expected.join(', ')}`
      t.same(actual, expected, message)
    }

    {
      const actual = typeString(server.close)
      const expected = '[object Function]'
      const message = `server.close should be "${expected}"`
      t.same(actual, expected, message)
    }

    {
      const actual = server.hostname
      const expected = undefined
      const message = `server.hostname should be "${expected}"`
      t.same(actual, expected, message)
    }

    {
      const actual = server.port
      const expected = undefined
      const message = `server.port should be "${expected}"`
      t.same(actual, expected, message)
    }

    {
      const actual = server.listening
      const expected = false
      const message = `server.listening should be "${expected}"`
      t.same(actual, expected, message)
    }

    {
      const actual = typeString(server.listen)
      const expected = '[object Function]'
      const message = `server.listen should be "${expected}"`
      t.same(actual, expected, message)
    }
  })

  test('listening server', async t => {
    {
      const message = `server should successfully listen`
      try {
        await server.listen()
      } catch (err) {
        t.fail(message)
      }
    }

    {
      const actual = server.hostname
      const message = `server.hostname should not be nothing — is "${actual}"`
      t.ok(actual, message)
    }

    {
      const actual = server.port
      const message = `server.port should be an integer — is "${actual}"`
      t.ok(Number.isSafeInteger(actual), message)
    }

    {
      const actual = server.port
      const message = `server.port should be greater than zero — is "${actual}"`
      t.ok(actual > 0, message)
    }

    {
      const actual = server.listening
      const expected = true
      const message = `server.listening should be "${expected}"`
      t.same(actual, expected, message)
    }

    {
      const serverWithDuplicatePort = await ews.create()
      const actual = () => serverWithDuplicatePort.listen(server.port)
      const message = `attempt to bind to a used port should fail with "EADDRINUSE" error`
      return t.shouldFail(actual(), message)
    }
  })

  test('closing server', async t => {
    {
      const actual = async () => {
        await server.close()
      }
      const message = `closing a server should not throw`
      t.doesNotThrow(actual, message)
    }

    {
      const actual = server.listening
      const expected = false
      const message = `server.listening should be "${expected}"`
      t.same(actual, expected, message)
    }
  })
})
