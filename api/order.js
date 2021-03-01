
const express = require('express')
const router = express.Router();

const orders = require('../models/order')
const itensOrder = require('../models/itensOrder')
const product = require('../models/product')
const client = require('../models/client')
const address = require('../models/address')
const payment = require('../models/payment')
const deliveryRegion = require('../models/deliveryRegion')
const mercadoPago = require('../mercadoPago/mercadoPago')

//Retorna o pedido e os seus itens, através do id
router.post('/order/resume', async (req, res) => {

    let data = req.body;

    try {

        let ord = await orders.findOne({
            where: { id: data.idOrder },
            include: [{ model: client }, { model: address }, { model: deliveryRegion }]
        })

        let itens = await itensOrder.findAll({
            where: {
                pedidoId: data.idOrder
            }, include: product
        })

        if (ord) {
            res.statusCode = 200
            res.json({ ord: ord, itens: itens })
        }
        else {
            res.statusCode = 400
            res.send('Pedido não encontrado')
        }

    } catch (error) {
        res.statusCode = 400
        res.send('Erro ao tentar consultar')
    }
})


router.get('/api/payment/:externalReference', (req, res) => {

    let { externalReference } = req.params
    
    mercadoPago.payment.get().then(response => {
        res.json(response)
    }).catch(err => {
        res.json({ err })
    })
})


module.exports = router