// source/ews.js
'use strict'

const create = () => {
  const server = Object.defineProperties({}, {
    'constructor': {
      value: create
    },
    'listen': {
      value: () => Promise.resolve(server)
    }
  })

  return Promise.resolve(server)
}

module.exports = {
  create
}
