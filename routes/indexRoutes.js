const IndexController = require('../controllers/indexController');
async function indexRoutes(fastify, options) {
    fastify.get('/', IndexController.index);
}

module.exports = indexRoutes;