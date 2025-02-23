const fs = require('node:fs')

class dataModel {
    static getParsedLogs() {
        return parseLogs()
    }

    static getStatistics() {
        return getStatistics()
    }

    static getDetection() {
        return detect()
    }
}

function parseLogs() {
    //check if file exists
    if (!fs.existsSync('./uploaded.log')) {
        return JSON.stringify({})
    }
    const logPattern = /(\S+) (\S+) (\S+) \[(.+?)] "(\S+) (.+?) (\S+)" (\d{3}) (\d+) "([^"]*)" "([^"]*)" (\d+)/
    const file = fs.readFileSync('./uploaded.log', 'utf8')
    const logs = []

    for (const line of file.split('\n')) {
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

function getStatistics() {
    let parsedlog = JSON.parse(parseLogs())
    if (!Array.isArray(parsedlog)) {
        return null
    }
    let ips = {}
    let totalRequests = 0
    let totalSize = 0

    for (const line of parsedlog) {
        //count the number of unique ips
        if (ips[line.ip]) {
            ips[line.ip]++
        } else {
            ips[line.ip] = 1
        }
        totalRequests++
        totalSize += parseInt(line.size)
    }

    let response = {
        totalRequests,
        totalSize,
        uniqueIps: Object.keys(ips).length,
    }

    return JSON.stringify(response)
}

function detect(threshold = 0.1) { // seuil par défaut de 10%
    let parsedLogs = JSON.parse(parseLogs());
    if (!Array.isArray(parsedLogs)) {
        return null;
    }

    const errorCodes = [400, 401, 403, 404];
    const ipRequests = {};

    for (const log of parsedLogs) {
        if (!ipRequests[log.ip]) {
            ipRequests[log.ip] = { total: 0, errors: 0};
        }
        ipRequests[log.ip].total++;
        if (errorCodes.includes(parseInt(log.status))) {
            ipRequests[log.ip].errors++;
        }
    }

    const result = [];
    for (const ip in ipRequests) {
        const { total, errors } = ipRequests[ip];
        let errorRate = errors / total;
        if (errorRate >= threshold) {
            errorRate = Math.round(errorRate * 100);
            result.push({ ip, errorRate });
        }
    }
    return JSON.stringify(result);
}

module.exports = dataModel;