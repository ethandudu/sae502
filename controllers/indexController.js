const FileNameModel = require('../models/filenameModel');
const DataModel = require('../models/dataModel')
const { pipeline } = require('node:stream/promises')
const fs = require('node:fs')

class IndexController {
    static index(req, reply) {
        reply.view('index', { filename: FileNameModel.getFilename(), logs: JSON.parse(DataModel.getParsedLogs()), pattern: DataModel.getPattern()});
    }

    static async upload(req, reply) {
        const data = await req.file()
        const pattern = data.fields.pattern.value

        FileNameModel.setFilename(data.filename)
        DataModel.setPattern(pattern)
        await pipeline(data.file, fs.createWriteStream(`./uploaded.log`))
        reply.redirect('/')
    }

    static statistics(req, reply) {
        reply.view('statistics', { filename: FileNameModel.getFilename(), stats: DataModel.getStatistics(), pattern: DataModel.getPattern()});
    }
}

module.exports = IndexController;