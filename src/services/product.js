const fp = require('fastify-plugin')
const { ObjectId } = require('mongodb');

async function service(fastify, options) {

  const coll = fastify.mongo.db.collection('product')

  const create = async (product) => {
    if (!product)
      throw new Error('Missing product')

    const res = await coll.insertOne(product)
    return res
  }

  const find = async () => {
    const el = await coll.find()
    return el.toArray()
  }

  const findById = async (id) => {
    const el = await coll.findOne({ _id: ObjectId(id) })
    return el
  }

  const remove = async (id) => {
    const res = await coll.deleteOne({ _id: ObjectId(id) })
    return res
  }

  const update = async ({ _id, name, price, description }) => {
    const res = await coll.updateOne({ _id: ObjectId(_id) }, { $set: { name, price, description } })
    return res
  }

  fastify.decorate("productService", { create, find, findById, delete: remove, update })

}

module.exports = fp(service)