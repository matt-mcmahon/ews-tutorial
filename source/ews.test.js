// source/ews.test.js
'use strict'

const test = require('blue-tape')
const ews = require('./ews')

test('ews.test.js', async t => {
  t.test('module properties', async t => {
    {
      const actual = typeof ews
      const expected = 'object'
      const message = 'ews should export an object'
      t.same(actual, expected, message)
    }

    {
      const actual = Object.keys(ews).sort()
      const expected = ['create'].sort()
      const message = `ews should have these properties: ${expected.join()}`
      t.same(actual, expected, message)
    }

    {
      const actual = typeof ews.create
      const expected = 'function'
      const message = 'ews.create should be a function'
      t.same(actual, expected, message)
    }
  })

  const serverPromise = ews.create()

  t.test('ews.create', async t => {
    {
      const actual = serverPromise.constructor
      const expected = Promise
      const message = 'invoking ews.create should return a Promise'
      t.same(actual, expected, message)
    }
  })

  const server = await serverPromise

  t.test('ews server instance', async t => {
    {
      const actual = typeof server
      const expected = 'object'
      const message = 'server instance should be an object'
      t.same(actual, expected, message)
    }

    {
      const actual = server.constructor
      const expected = ews.create
      const message = `server.constructor should be ews.create`
      t.same(actual, expected, message)
    }

    {
      const actual = server.propertyIsEnumerable('constructor')
      const expected = false
      const message = 'server.constructor should NOT be enumerable'
      t.same(actual, expected, message)
    }
  })

  t.test('server.listen', async t => {
    {
      const actual = typeof server.listen
      const expected = 'function'
      const message = 'server.listen should be a function'
      t.same(actual, expected, message)
    }

    {
      const actual = server.propertyIsEnumerable('listen')
      const expected = true
      const message = 'server.listen should be enumerable'
      t.same(actual, expected, message)
    }
  })

  const listeningServerPromise = server.listen()

  t.test(`server.listen()`, async t => {
    {
      const actual = listeningServerPromise.constructor
      const expected = Promise
      const message = 'invoking server.listen should return a Promise'
      t.same(actual, expected, message)
    }
  })

  // const listeningServer = await listeningServerPromise
})
