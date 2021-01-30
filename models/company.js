const sequelize = require('sequelize')
const connection = require('../database/connection')

const company = connection.define('empresa', {
    rsocial: {
        type: sequelize.STRING,
        allowNull: false
    },
    fantasia: {
        type: sequelize.STRING,
        allowNull: false
    },
    cnpj: {
        type: sequelize.STRING,
        allowNull: false
    },
    inscricaoEstadual: {
        type: sequelize.STRING,
        allowNull: false
    },
    inscricaoMunicipal: {
        type: sequelize.STRING,
        allowNull: false
    },
    cep: {
        type: sequelize.STRING,
        allowNull: false
    },
    endereco: {
        type: sequelize.STRING,
        allowNull: false
    },
    numero: {
        type: sequelize.STRING,
        allowNull: false
    },
    bairro: {
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
    telefone: {
        type: sequelize.STRING,
        allowNull: false
    },
    celular1: {
        type: sequelize.STRING,
        allowNull: false
    },
    celular2: {
        type: sequelize.STRING,
        allowNull: false
    },
    regimeEspecialTributacao: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    regimeTributario: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    optanteSimplesNacional: {
        type: sequelize.BOOLEAN,
        allowNull: false
    },
    incentivadorCultural: {
        type: sequelize.BOOLEAN,
        allowNull: false
    },
    naturezaOperacao: {
        type: sequelize.INTEGER,
        allowNull: false
    }
})


//company.sync({ alter: true })


module.exports = company