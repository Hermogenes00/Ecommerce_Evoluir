const sequelize = require('sequelize')
const connection = require('../database/connection')
const order = require('../models/order')

const client = connection.define('clientes', {
    nome: {
        type: sequelize.STRING,
        allowNull: false

    },
    cnpjCpf: {
        type: sequelize.STRING,
        allowNull: false
    },
    email: {
        type: sequelize.STRING,
        allowNull: false
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    },
    tel: {
        type: sequelize.STRING,
        allowNull: false
    },
    cel1: {
        type: sequelize.STRING,
        allowNull: false
    },
    cel2: {
        type: sequelize.STRING,
        allowNull: false
    },
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
    uf: {
        type: sequelize.STRING,
        allowNull: false
    },
    codigoSeguranca:{
        type: sequelize.TEXT,
        allowNull: true
    }
})

//Relacionamento



//client.sync({alter:true})


module.exports = client;