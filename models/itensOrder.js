const sequelize = require('sequelize')
const connection = require('../database/connection')
const products = require('../models/product')
const order = require('../models/order')

const itensOrder = connection.define('itensPedido', {
    valor: {
        type: sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    qtd: {
        type: sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    arquivo: {
        type: sequelize.TEXT,
        allowNull: true
    }, 
    status: {
        type: sequelize.TEXT,
        allowNull: true
    },
    altura: {
        type: sequelize.DECIMAL(10, 2),
        allowNull: true
    },
    largura: {
        type: sequelize.DECIMAL(10, 2),
        allowNull: true
    }
})

//=========Relecionamentos========
//hasMany = Tem muitos
//hasOne  = Tem um
//belongsTo = Pertence a

itensOrder.belongsTo(products)
products.hasMany(itensOrder)

//itensOrder.sync({alter:true})
//products.sync({alter:true})



module.exports = itensOrder