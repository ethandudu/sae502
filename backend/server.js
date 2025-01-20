const fastify = require('fastify')()
const fs = require('node:fs')
const { pipeline } = require('node:stream/promises')

fastify.register(require('@fastify/multipart'))

fastify.post('/upload', async function (req, reply) {
    // process a single file
    // also, consider that if you allow to upload multiple files
    // you must consume all files otherwise the promise will never fulfill
    const data = await req.file()

    data.file // stream
    data.fields // other parsed parts
    data.fieldname
    data.filename
    data.encoding
    data.mimetype

    // to accumulate the file in memory! Be careful!
    //
    // await data.toBuffer() // Buffer
    //
    // or

    await pipeline(data.file, fs.createWriteStream('backend/uploaded-file.txt'))

    // be careful of permission issues on disk and not overwrite
    // sensitive files that could cause security risks

    // also, consider that if the file stream is not consumed, the promise will never fulfill

    reply.send()
})

fastify.listen({ port: 3000 }, err => {
    if (err) throw err
    console.log(`server listening on ${fastify.server.address().port}`)
})