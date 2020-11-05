const connection = require('../database/connection')
const sequelize = require('sequelize')
const express = require('express')

const category = connection.define('categorias', {
    nome: {
        type: sequelize.STRING,
        allowNull: false
    }
})

//categoria.sync({ force: true })

module.exports = category