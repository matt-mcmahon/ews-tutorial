// source/ews.test.js
'use strict'

const test = require('blue-tape')
const ews = require('./ews')

test('ews.test.js', async t => {
  const actual = typeof ews
  const expected = 'object'
  const message = 'ews should export an object'
  t.same(actual, expected, message)
})

test('ews.create', async t => {
  {
    const actual = typeof ews.create
    const expected = 'function'
    const message = 'ews should have a create method'
    t.same(actual, expected, message)
  }

  {
    const actual = ews.create().constructor
    const expected = Promise
    const message = 'invoking ews.create should return a Promise'
    t.same(actual, expected, message)
  }

  const server = await ews.create()

  {
    const actual = typeof server
    const expected = 'object'
    const message = 'created server is an object'
    t.same(actual, expected, message)
  }

  {
    const actual = server.constructor
    const expected = ews.create
    const message = `server's constructor should be ews.create`
    t.same(actual, expected, message)
  }

  {
    const actual = server.propertyIsEnumerable('constructor')
    const expected = false
    const message = 'constructor property should NOT be enumerable'
    t.same(actual, expected, message)
  }
})
