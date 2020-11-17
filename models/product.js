const connection = require('../database/connection')
const sequelize = require('sequelize')
const express = require('express')
const itensOrder = require('./itensOrder')

const product = connection.define('produtos', {
    nome: {
        type: sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: sequelize.TEXT,
        allowNull: false
    },
    codRef: {
        type: sequelize.STRING,
        allowNull: false
    },
    tamFinalAltura: {
        type: sequelize.STRING,
        allowNull: false
    },
    tamFinalLargura: {
        type: sequelize.STRING,
        allowNull: false
    },
    vlrProduto: {
        type: sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    material: {
        type: sequelize.STRING,
        allowNull: false
    },
    gramatura: {
        type: sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    peso: {
        type: sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    tamSangriaAltura: {
        type: sequelize.STRING,
        allowNull: false
    },
    tamSangriaLargura:{
        type: sequelize.STRING,
        allowNull: false
    },
    qtd: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    propriedadeDivisao: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    slug: {
        type: sequelize.STRING,
        allowNull: false
    },
    gabarito: {
        type: sequelize.TEXT,
        allowNull: true
    }
})


//product.sync({ alter: true })

module.exports = product