// source/ews.test.js
'use strict'

const test = require('blue-tape')
const ews = require('./ews')

test('ews.test.js', async t => {
  const serverPromise = ews.create()
  {
    const expected = 'function'
    const actual = typeof serverPromise.then
    const message = `should be then-able`
    t.same(actual, expected, message)
  }
  return serverPromise
})
