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
})
