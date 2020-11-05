const connection = require('../database/connection')
const sequelize = require('sequelize')
const express = require('express')

const subCategory = connection.define('subcategorias', {
    nome: {
        type: sequelize.STRING,
        allowNull: false
    }
})

//subCategoria.sync({ force: true })

module.exports = subCategory