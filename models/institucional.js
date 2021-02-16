const sequelize = require('sequelize')
const connection = require('../database/connection')

const institucional = connection.define('institucional', {
    titulo: {
        type: sequelize.STRING,
        allowNull: false
    },
    conteudo: {
        type: sequelize.TEXT({ length: 'long' })
    },
    slug:{
        type: sequelize.STRING,
        allowNull: false
    }
})

//institucional.sync({ alter: true })

module.exports = institucional