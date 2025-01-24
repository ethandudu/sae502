const fastify = require('fastify')()
const fs = require('node:fs')
const fastifyView = require('@fastify/view')
const cors = require('@fastify/cors')

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

fastify.register(require('./routes'))

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

async function parseLog() {
    const logPattern = /(\S+) (\S+) (\S+) \[(.+?)] "(\S+) (.+?) (\S+)" (\d{3}) (\d+) "([^"]*)" "([^"]*)" (\d+)/
    const file = fs.readFileSync('./uploaded.log', 'utf8')
    const logs = []

    for await (const line of file.split('\n')) {
        const match = line.match(logPattern)
        if (match) {
            const log = {
                ip: match[1],
                user: match[3],
                date: match[4],
                method: match[5],
                url: match[6],
                protocol: match[7],
                status: match[8],
                size: match[9],
                referer: match[10],
                agent: match[11],
                thread: match[12]
            }
            logs.push(log)
        }
    }
    return JSON.stringify(logs)
}

start()