const fastify = require('fastify')()
const fs = require('node:fs')
const { pipeline } = require('node:stream/promises')

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

fastify.get('/getlog', async function(req, reply) {
    const resp = await parseLog()
    reply.send(resp)
})

fastify.listen({ port: 3000 }, err => {
    if (err) throw err
    console.log(`server listening on ${fastify.server.address().port}`)
})

async function parseLog() {

    return JSON.stringify(data)
}

// on fastify server stop
fastify.addHook('onClose', async (instance, done) => {
    //delete uploaded file
    fs.unlinkSync('./uploaded.log')
    done()
})