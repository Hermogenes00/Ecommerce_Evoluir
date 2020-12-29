const axios = require('axios')

let instance = axios.create({
    baseURL: 'http://localhost:8090/'
})


module.exports = instance