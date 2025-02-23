const AuthController = require('../controllers/authController')

const IndexController = require('../controllers/indexController')
const StatisticsController = require('../controllers/statisticsController')
const DetectionController = require('../controllers/detectionController')

async function routes(fastify, options) {
    fastify.get('/', { preHandler: AuthController.checkAuth }, IndexController.index)
    fastify.post('/', { preHandler: AuthController.checkAuth }, IndexController.upload)

    fastify.get('/statistics', { preHandler: AuthController.checkAuth }, StatisticsController.statistics)

    fastify.get('/auth', AuthController.get)
    fastify.post('/auth', AuthController.auth)

    fastify.get('/detection', { preHandler: AuthController.checkAuth }, DetectionController.get)
}

module.exports = routes;