// source/ews.js
'use strict'

const create = () => {
  const server = Object.defineProperty({}, 'constructor', {
    value: create
  })
  return Promise.resolve(server)
}

module.exports = {
  create
}
