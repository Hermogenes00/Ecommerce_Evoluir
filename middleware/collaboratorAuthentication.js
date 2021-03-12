
function collaboratorAuthentication(req, res, next) {

    if (req.session.collaborator) {
        res.locals.collaborator = {...req.session.collaborator}
        next()
    } else {
        res.redirect('/collaborator/login')
    }
}

module.exports = collaboratorAuthentication;