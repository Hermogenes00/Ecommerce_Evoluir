const connection = require('../database/connection')
const sequelize = require('sequelize')
const express = require('express')


const deliveryRegion = connection.define('regiaoEntrega', {
    cep: {
        type: sequelize.STRING,
        allowNull: false
    },
    rua: {
        type: sequelize.TEXT,
        allowNull: false
    },
    bairro: {
        type: sequelize.STRING,
        allowNull: false
    },
    numero: {
        type: sequelize.STRING,
        allowNull: false
    },
    complemento: {
        type: sequelize.STRING,
        allowNull: false
    },
    cidade: {
        type: sequelize.STRING,
        allowNull: false
    },
    ibge: {
        type: sequelize.STRING,
        allowNull: false
    },
    uf: {
        type: sequelize.STRING,
        allowNull: false
    },
    estabelecimento: {
        type: sequelize.STRING,
        allowNull: false
    }
})


//deliveryRegion.sync({ alter: true })
module.exports = deliveryRegion