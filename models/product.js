const connection = require('../database/connection')
const sequelize = require('sequelize')
const subCategory = require('./subCategory')
const category = require('./category')
const printer = require('../models/printer')

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
        type: sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    tamFinalLargura: {
        type: sequelize.DECIMAL(10, 2),
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
        type: sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    tamSangriaLargura: {
        type: sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    qtd: {
        type: sequelize.BIGINT,
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
        type: sequelize.TEXT({ length: 'long' }),
        allowNull: true
    },
    previsaoProducao: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    und:{
        type: sequelize.STRING,
        allowNull: false
    },
    imagem:{
        type: sequelize.TEXT({ length: 'long' }),
        allowNull: true
    },
    desconto:{
        type: sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    ativo:{
        type: sequelize.BOOLEAN,
        allowNull: false
    }

})

product.belongsTo(category)
category.hasMany(product)
product.belongsTo(subCategory)
subCategory.hasMany(product)

product.belongsTo(printer)
printer.hasMany(product)

//product.sync({ alter: true })

module.exports = product