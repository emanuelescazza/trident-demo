async function routes(fastify, options) {

  const opts = {
    preValidation: [fastify.authenticate],
    schema: {
      body: {
        type: 'object',
        required: ['name', 'price', 'description'],
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          price: { type: 'number' },
          description: { type: 'string' }
        }
      }
    }
  }

  fastify.get('/', async function (req, reply) {
    const res = await this.productService.find()
    reply
      .status(200)
      .send(res)
  })

  fastify.get('/:id', async function (request, reply) {
    const id = request.params.id
    const res = await this.productService.findById(id)
    reply
      .status(200)
      .send(res)
  })

  fastify.post('/', opts, async function (req, reply) {
    const { name, price, description } = req.body
    const res = await this.productService.create({ name, price, description, author: req.user.payload.email })
    reply
      .status(201)
      .send(res)
  })

  fastify.delete('/:id', { preValidation: [fastify.authenticate] }, async function (req, reply) {
    const id = req.params.id
    const res = await this.productService.delete(id)
    reply
      .status(204)
      .send(res)
  })

  fastify.put('/', opts, async function (req, reply) {
    const { _id, name, price, description } = req.body
    const res = await this.productService.update({ _id, name, price, description })
    reply
      .status(200)
      .send(res)
  })
}

module.exports = routes