const fastify = require('fastify')()
const fastifyView = require('@fastify/view')
const cors = require('@fastify/cors')
const path = require('path')

fastify.register(cors, {
    origin: '*',
    methods: ['GET', 'POST']
})
fastify.register(require('@fastify/multipart'))

fastify.register(fastifyView, {
    engine: {
        ejs: require('ejs')
    },
    root: path.join(__dirname, 'views'),
})

fastify.register(require('./routes/indexRoutes'))

const start = async () => {
    try {
        await fastify.listen({ port: 3000 }, err => {
            console.log(`server listening on ${fastify.server.address().port}`)
        })
    } catch (e) {
        fastify.log.error(e)
        process.exit(1)
    }
}

start()