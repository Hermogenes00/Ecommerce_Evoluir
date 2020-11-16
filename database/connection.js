const sequelize = require('sequelize')
const connection = new sequelize('loja','root','neto1994',{
    host:'localhost',
    dialect:'mysql'
})

module.exports = connection;