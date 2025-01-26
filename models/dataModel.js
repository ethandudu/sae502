const fs = require('node:fs')
let pattern = ''

class dataModel {
    static getParsedLogs() {
        return parseLogs()
    }

    static getPattern() {
        return pattern
    }

    static setPattern(newPattern) {
        pattern = newPattern
    }
}

async function parseLogs() {
    //check if file exists
    if (!fs.existsSync('./uploaded.log')) {
        return
    }
    const logPattern = /(\S+) (\S+) (\S+) \[(.+?)] "(\S+) (.+?) (\S+)" (\d{3}) (\d+) "([^"]*)" "([^"]*)" (\d+)/
    const file = fs.readFileSync('./uploaded.log', 'utf8')
    const logs = []

    for await (const line of file.split('\n')) {
        const match = line.match(logPattern)
        if (match) {
            const log = {
                ip: match[1],
                user: match[3],
                date: match[4],
                method: match[5],
                url: match[6],
                protocol: match[7],
                status: match[8],
                size: match[9],
                referer: match[10],
                agent: match[11],
                thread: match[12]
            }
            logs.push(log)
        }
    }
    return JSON.stringify(logs)
}

module.exports = dataModel;