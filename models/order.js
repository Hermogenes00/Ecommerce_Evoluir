const sequelize = require('sequelize')
const connection = require('../database/connection')
const itensOrder = require('../models/itensOrder')
const client = require('../models/client')
const deliveryRegion = require('../models/deliveryRegion')
const address = require('../models/address')

const orders = connection.define('pedidos', {
    createdOrder: {
        type: sequelize.DATE,
        allowNull: true
    },
    total: {
        type: sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    },
    status: {
        type: sequelize.STRING,
        allowNull: false
    }, cep: {
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
    valorFrete: {
        type: sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    },
    valorFinal: {
        type: sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    },
    metodoEnvio: {
        type: sequelize.STRING,
        allowNull: true,
        defaultValue: null
    }
})

//=========Relacionamentos========
client.hasMany(orders)
orders.belongsTo(client)

itensOrder.belongsTo(orders)
orders.hasMany(itensOrder)


orders.belongsTo(address)
address.hasMany(orders)

orders.belongsTo(deliveryRegion)
deliveryRegion.hasMany(orders)

//orders.sync({alter:true})
//itensOrder.sync({alter:true}) 

module.exports = orders;