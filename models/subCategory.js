const connection = require('../database/connection')
const sequelize = require('sequelize')
const express = require('express')
const category = require('../models/category')
const subCategory = connection.define('subcategorias', {
    nome: {
        type: sequelize.STRING,
        allowNull: false
    }
})

subCategory.belongsTo(category)
category.hasMany(subCategory)

subCategory.sync({ alter: true })

module.exports = subCategory