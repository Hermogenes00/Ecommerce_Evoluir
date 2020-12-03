const sequelize = require('sequelize')
const connection = require('../database/connection')

let slide = connection.define('slide', {
    titulo: {
        type: sequelize.STRING,
        allowNull: false
    },
    subTitulo: {
        type: sequelize.STRING,
        allowNull: false
    },
    imagem: {
        type: sequelize.TEXT,
        allowNull: false
    },
})


//slide.sync({ alter: true })

module.exports = slide