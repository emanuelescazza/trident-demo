const fastify = require("fastify")({
  logger: true,
})

fastify.register(require('./db/database'))

fastify.register(require('./routes/auth'))
fastify.register(require('./routes/product'), { prefix: '/product' })

fastify.listen(3000, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});

