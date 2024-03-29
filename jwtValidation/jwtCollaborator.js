const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_JWT_CLIENT

//24 hours
let dayInHours = Math.floor(Date.now() / 1000) + (60 * 60)

//payload of the token
const sign = name => {

    let tokenResponse = undefined;

    let payload = { name, authorization: ['collaborator', 'client'] }

    jwt.sign(payload, SECRET, { expiresIn: dayInHours }, (err, token) => {
        if (!err)
            tokenResponse = token
    })

    return tokenResponse
}

const verify = token => {

    let response = undefined

    jwt.verify(token, SECRET, (err, decoded) => {
        response = { err, decoded }
    })

    return response
}


module.exports = { sign, verify }