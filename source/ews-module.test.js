// source/ews.test.js
'use strict'

const test = require('blue-tape')
const ews = require('./ews')

test('ews-module.test.js', async t => {
  {
    const actual = typeof ews
    const expected = 'object'
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
    const actual = typeof ews.create
    const expected = 'function'
    const message = `ews.create should be "${expected}"`
    t.same(actual, expected, message)
  }
})
