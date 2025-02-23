const repl = require("node:repl");

class AuthController {
    static get(req, reply) {
        if (req.query.errormsg) {
            return reply.view('auth', { errormsg: req.query.errormsg});
        }
        reply.view('auth', { errormsg: null});
    }

    static checkAuth(req, reply, done) {
        if (!req.session || !req.session.authenticated) {
            reply.redirect('/auth?errormsg=You are not authenticated')
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
                        reply.redirect('/auth?errormsg=Invalid password')
                    }
                }
            }
        }
    }
}

module.exports = AuthController;