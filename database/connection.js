const sequelize = require('sequelize')
const connection = new sequelize('loja','root','admin',{
    host:'localhost',
    dialect:'mysql'
})

module.exports = connection;