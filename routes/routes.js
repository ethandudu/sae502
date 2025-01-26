const IndexController = require('../controllers/indexController')
async function routes(fastify, options) {
    fastify.get('/', IndexController.index)
    fastify.post('/', IndexController.upload)
}

module.exports = routes;