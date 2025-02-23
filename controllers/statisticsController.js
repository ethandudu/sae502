const FileNameModel = require('../models/filenameModel');
const DataModel = require('../models/dataModel')

class StatisticsController {
    static statistics(req, reply) {
        reply.view('statistics', { filename: FileNameModel.getFilename(), stats: JSON.parse(DataModel.getStatistics())});
    }
}

module.exports = StatisticsController;