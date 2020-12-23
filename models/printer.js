const sequelize = require('sequelize')
const connection = require('../database/connection')

const printer = connection.define('impressoras', {

    marca: {
        type: sequelize.STRING,
        allowNull: false
    },
    modelo: {
        type: sequelize.STRING,
        allowNull: false
    },

})

//printer.sync({ alter: true })
module.exports = printer