const fp = require('fastify-plugin')
const { MongoMemoryServer } = require('mongodb-memory-server');

async function db(fastify, options) {

  const mongod = await MongoMemoryServer.create({ dbName: 'test' })

  fastify.register(require('fastify-mongodb'), {
    forceClose: true,
    url: mongod.getUri('test')
  })

  fastify.register(require('../services/product'))
}

module.exports = fp(db)