const IndexController = require('../controllers/indexController')
async function routes(fastify, options) {
    fastify.get('/', IndexController.index)
    fastify.post('/', IndexController.upload)

    fastify.get('/statistics', IndexController.statistics)

    //fastify.get('/detection', IndexController.detection)
}

module.exports = routes;