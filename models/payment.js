const sequelize = require('sequelize')
const connection = require('../database/connection')
const order = require('../models/order')

const payment = connection.define('pagamento', {
    total: {
        type: sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    referencia: {
        type: sequelize.TEXT,
        allowNull: false
    }

})

payment.belongsTo(order)
order.hasOne(payment)
//payment.sync({ alter: true })

module.exports = payment;