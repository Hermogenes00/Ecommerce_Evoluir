const connection = require('../database/connection')
const sequelize = require('sequelize')
const category = require('../models/category')
const products = require('../models/product')

const subCategory = connection.define('subcategorias', {
    nome: {
        type: sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: sequelize.STRING,
        allowNull: false
    }
})

subCategory.belongsTo(category)
category.hasMany(subCategory)


//subCategory.sync({ alter: true })

module.exports = subCategory