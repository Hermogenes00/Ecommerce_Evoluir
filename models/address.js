const sequelize = require('sequelize')
const connection = require('../database/connection')
const client = require('./client')

const address = connection.define('enderecos', {

    cep: {
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
    }

})

address.belongsTo(client)
client.hasMany(address)

/*
address.sync({alter:true}).then(clb => {
    console.log(clb);
}).catch(error => {
    console.log(error);
})*/

module.exports = address;