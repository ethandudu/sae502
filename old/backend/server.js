const fastify = require('fastify')()
const fs = require('node:fs')
const { pipeline } = require('node:stream/promises')
const cors = require('@fastify/cors')

fastify.register(cors, {
    origin: '*',
    methods: ['GET', 'POST']
})
fastify.register(require('@fastify/multipart'))

let fileName = 'Unknown'

fastify.post('/upload', async function (req, reply) {
    const data = await req.file()

    data.file // stream
    data.fields // other parsed parts
    data.fieldname
    data.filename
    data.encoding
    data.mimetype

    fileName = data.filename
    //write file to disk
    await pipeline(data.file, fs.createWriteStream(`./uploaded.log`))

    reply.send({ success: true })
})

fastify.get('/filename', async function(req, reply) {
    return { filename: fileName }
})

fastify.get('/logs', async function(req, reply) {
    const resp = await parseLog()
    reply.send(resp).header('Content-Type', 'application/json')
})

fastify.listen({ port: 3000 }, err => {
    if (err) throw err
    console.log(`server listening on ${fastify.server.address().port}`)
})

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

// on fastify server stop
fastify.addHook('onClose', async (instance, done) => {
    //delete uploaded file
    fs.unlinkSync('./uploaded.log')
    done()
})