const fastify = require('fastify')()
const fastifyView = require('@fastify/view')
const fastifySession = require('@fastify/session')
const fastifyCookie = require('@fastify/cookie')
const cors = require('@fastify/cors')
const path = require('path')


fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'public'), // Dossier public pour les fichiers statiques
    prefix: '/public/', // URL de base pour accéder aux fichiers statiques
});

fastify.register(cors, {
    origin: '*',
    methods: ['GET', 'POST']
})

fastify.register(require('@fastify/multipart'))
fastify.register(require('@fastify/formbody'))

fastify.register(fastifyView, {
    engine: {
        ejs: require('ejs')
    },
    root: path.join(__dirname, 'views'),
})

fastify.register(fastifyCookie)
fastify.register(fastifySession, {
    cookieName: 'sessionId',
    secret: 'S-P$3f\\ZruQm=aTG7$\\1vh9WdK=Xt1^W',
    cookie: { maxAge: 1800000, secure: false }
})

fastify.register(require('./routes/routes'))

const start = async () => {
    try {
        await fastify.listen({ port: 3000 }, err => {
            //remove uploaded.log file
            const fs = require('fs')
            if (fs.existsSync('./uploaded.log')) {
                fs.unlinkSync('./uploaded.log')
            }
            console.log(`server listening on http://localhost:${fastify.server.address().port}`)
        })
    } catch (e) {
        fastify.log.error(e)
        process.exit(1)
    }
}

start()