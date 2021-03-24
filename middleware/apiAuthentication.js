const modelClient = require('../models/client')
const jwtClient = require('../jwtValidation/jwtClient')
const jwtCollaborator = require('../jwtValidation/jwtCollaborator')

//Middlewares
const apiCollaboratorAuthentication = (req, res, next) => {

    if (req.session.collaborator)
        next()

    let token = req.headers['authorization']
    let response = jwtCollaborator.verify(token)

    if (!response.err)
        next()

    res.status(404)
    res.json(response.err)
}

const apiClientAuthentication = (req, res, next) => {

    if (req.session.client)
        next()

    let token = req.headers['authorization']
    let response = jwtCollaborator.verify(token)

    if (!response.err)
        next()

    res.status(404)
    res.json(response.err)
}




module.exports = { apiCollaboratorAuthentication, apiClientAuthentication }