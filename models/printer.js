const sequelize = require('sequelize')
const connection = require('../database/connection')
const product = require('../models/product')

const printer = connection.define('impressoras', {

    marca: {
        type: sequelize.STRING,
        allowNull: false
    },
    modelo: {
        type: sequelize.STRING,
        allowNull: false
    },
    imagem:{
        type: sequelize.TEXT,
        allowNull: false
    },
    ativo:{
        type:sequelize.BOOLEAN,
        allowNull:false
    }

})



//printer.sync({ alter: true })
module.exports = printer