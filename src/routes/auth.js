const fp = require("fastify-plugin")
const dotenv = require('dotenv')
dotenv.config()

async function routes(fastify, options) {

  fastify.register(require('fastify-jwt'), {
    secret: process.env.JWT_KEY || 'secret'
  })

  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })

  fastify.post('/signup', opts, (req, reply) => {
    const payload = req.body
    const token = fastify.jwt.sign({ payload })
    reply.send({ token })
  })
}

const opts = {
  schema: {
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string' },
        password: { type: 'string' }
      }
    }
  }
}

module.exports = fp(routes)