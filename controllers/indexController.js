const FileNameModel = require('../models/filenameModel');
const DataModel = require('../models/dataModel')

class IndexController {
    static index(req, reply) {
        reply.view('index', { filename: FileNameModel.getFilename(), table: DataModel.getParsedLogs() });
    }
}

module.exports = IndexController;