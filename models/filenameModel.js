let fileName = 'Unknown'

class FilenameModel {
    static  getFilename() {
        return fileName
    }

    static setFilename(name) {
        fileName = name
    }
}

module.exports = FilenameModel