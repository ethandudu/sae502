const FileNameModel = require('../models/filenameModel');
const DataModel = require('../models/dataModel')

class DetectionController {
    static get(req, reply) {
        reply.view('detection', { filename: FileNameModel.getFilename(), data: JSON.parse(DataModel.getDetection())});
    }
}

module.exports = DetectionController;