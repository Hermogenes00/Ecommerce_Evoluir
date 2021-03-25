const axios = require('axios')
const constants = require('../utils/constants')

//Config axios
axios.default.baseUrl = `http://localhost:${constants.PORTA}/api`












module.exports = axios;