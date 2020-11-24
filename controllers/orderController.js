const express = require('express')
const router = express.Router();
const orders = require('../models/order')
const itensOrder = require('../models/itensOrder')
const product = require('../models/product')
const client = require('../models/client')
const category = require('../models/category')
const subCategory = require('../models/subCategory')
const address = require('../models/address')

const clientAuthentication = require('../middleware/clientAuthentication')
const collaboratorAuthentication = require('../middleware/collaboratorAuthentication')


//Criação do middleware para menu
router.use(async (req, res, next) => {
    try {
        res.locals.menu = await category.findAll({ include: subCategory })
    } catch (error) {
        console.log('Erro ao tentar consultar as categorias->' + error);
    }
    next()
})


router.get('/admin/orders', clientAuthentication, async (req, res) => {

    try {

        let objOrders = await orders.findAll();
        res.render('admin/order/orders', { orders: objOrders })

    } catch (error) {
        console.log('Erro ao buscar pedidos: ' + error);
        res.send('Erro ' + error)
    }
})


router.post('/order/resume', collaboratorAuthentication, async (req, res) => {
    let data = req.body;
    
    try {
        let ord = await orders.findOne({ where: { id: data.idOrder }, include: [{ model: client }, { model: address }] })
        let itens = await itensOrder.findAll({
            where: {
                pedidoId: data.idOrder
            }, include: product
        })

        if (ord) {
            res.render('admin/order/resume', { ord: ord, itens: itens })
        }
        else {
            console.log('RESULTADO------------' + JSON.parse(ord));
            res.redirect('/main/orders/');
        }

    } catch (error) {
        res.json('Erro ao tentar consultar a ficha ' + error)
    }
})



module.exports = router