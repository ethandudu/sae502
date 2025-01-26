const FileNameModel = require('../models/filenameModel');
const DataModel = require('../models/dataModel')
const { pipeline } = require('node:stream/promises')
const fs = require('node:fs')

class IndexController {
    static index(req, reply) {
        reply.view('index', { filename: FileNameModel.getFilename(), table: DataModel.getParsedLogs(), pattern: DataModel.getPattern()});
    }

    static async upload(req, reply) {
        const data = await req.file()
        const pattern = req.body.pattern
        data.file
        data.fields
        data.fieldname
        data.filename
        data.encoding
        data.mimetype

        FileNameModel.setFilename(data.filename)
        await pipeline(data.file, fs.createWriteStream(`./uploaded.log`))
        reply.redirect('/')
    }
}

module.exports = IndexController;