
async function defaultAuthentication(req, res, next) {

    if (req.session.client) {
        res.locals.user = { ...req.session.client };
    }else {
        res.locals.user = {
            nome: 'Visitante'
        }
    }
    next()

}

module.exports = defaultAuthentication;