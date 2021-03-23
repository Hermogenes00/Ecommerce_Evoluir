const jwt = require('jsonwebtoken')

const secret = 'b26d3201e81a21f3ff8cccce85d64da3'

const modelCollaborator = require('../models/collaborator')
const modelClient = require('../models/client')

const bcrypt = require('bcrypt')

//Middlewares
const apiCollaboratorAuthentication = (req, res, next) => {

    let token = req.headers['authorization'];
    
    if(condition) {

    }
}

const apiClientAuthentication = (req, res, next) > {
    if(condition) {

    }
}




module.exports = { apiCollaboratorAuthentication, apiClientAuthentication }