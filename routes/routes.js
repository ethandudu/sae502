const IndexController = require('../controllers/indexController')
const StatisticsController = require('../controllers/statisticsController')

async function routes(fastify, options) {
    fastify.get('/', IndexController.index)
    fastify.post('/', IndexController.upload)

    fastify.get('/statistics', StatisticsController.statistics)

    //fastify.get('/detection', IndexController.detection)
}

module.exports = routes;