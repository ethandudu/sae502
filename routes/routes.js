const IndexController = require('../controllers/indexController')
const StatisticsController = require('../controllers/statisticsController')
const AuthController = require('../controllers/authController')

async function routes(fastify, options) {
    fastify.get('/', { preHandler: AuthController.checkAuth }, IndexController.index)
    fastify.post('/', { preHandler: AuthController.checkAuth }, IndexController.upload)

    fastify.get('/statistics', { preHandler: AuthController.checkAuth }, StatisticsController.statistics)

    fastify.get('/auth', AuthController.get)
    fastify.post('/auth', AuthController.auth)

    //fastify.get('/detection', IndexController.detection)
}

module.exports = routes;