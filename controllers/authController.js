const repl = require("node:repl");

class AuthController {
    static get(req, reply) {
        reply.view('auth');
    }

    static checkAuth(req, reply, done) {
        if (!req.session || !req.session.authenticated) {
            reply.redirect('/auth');
        } else {
            done()
        }
    }

    static async auth(req, reply) {
        const parts = req.parts()
        for await (const part of parts) {
            if (part.type === 'field') {
                if (part.fieldname === 'password') {
                    if (part.value === 'password') {
                        req.session.authenticated = true
                        reply.redirect('/')
                    } else {
                        reply.redirect('/auth')
                    }
                }
            }
        }
    }
}

module.exports = AuthController;