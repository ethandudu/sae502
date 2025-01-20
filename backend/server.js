const fastify = require('fastify')()
const fs = require('node:fs')
const { pipeline } = require('node:stream/promises')

fastify.register(require('@fastify/multipart'))

fastify.post('/upload', async function (req, reply) {
    const data = await req.file()

    data.file // stream
    data.fields // other parsed parts
    data.fieldname
    data.filename
    data.encoding
    data.mimetype

    await pipeline(data.file, fs.createWriteStream('backend/uploaded-file.txt'))

    reply.send({ uploaded: true })
})

fastify.listen({ port: 3000 }, err => {
    if (err) throw err
    console.log(`server listening on ${fastify.server.address().port}`)
})