// source/ews.js
'use strict'

const create = () => {
  const server = Object.defineProperties({}, {
    'constructor': {
      value: create
    },
    'listen': {
      value: () => {}
    }
  })

  return Promise.resolve(server)
}

module.exports = {
  create
}
