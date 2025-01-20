const fastify = require('fastify')()
const fs = require('node:fs')
const { pipeline } = require('node:stream/promises')

fastify.register(require('@fastify/multipart'))

let fileName = ''
let fileContent = ''

fastify.post('/upload', async function (req, reply) {
    const data = await req.file()

    data.file // stream
    data.fields // other parsed parts
    data.fieldname
    data.filename
    data.encoding
    data.mimetype

    fileName = data.filename
    fileContent = data.file

    reply.send({ success: true })
})

fastify.get('/filename', async function(req, reply) {
    return { filename: fileName }
})

fastify.listen({ port: 3000 }, err => {
    if (err) throw err
    console.log(`server listening on ${fastify.server.address().port}`)
})
