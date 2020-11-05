//const localStorage = require('node-localstorage').LocalStorage
function clientAuthentication(req, res, next) {

    if (req.session.client) {
        res.locals.user = req.session.client;
        next();
    } else {
        res.redirect('/client/login')
    }

}

module.exports = clientAuthentication;