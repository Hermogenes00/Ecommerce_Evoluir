const jwt = require('jsonwebtoken')
const SECRET = '288c200024cfa9f3f6bbf6ea5b38e143'

//24 hours
let dayInHours = Math.floor(Date.now() / 1000) + (60 * 60)

//payload of the token
const sign = name => {

    let response = undefined

    let payload = { name, authorization: ['client'] }

    jwt.sign(payload, SECRET, { expiresIn: dayInHours }, (err, token) => {
        response = { err, token }
    })

    return response
}

const verify = token => {

    let response = undefined

    jwt.verify(token, SECRET, (err, decoded) => {
        response = { err, decoded }
    })

    return response
}


module.exports = { sign, verify }