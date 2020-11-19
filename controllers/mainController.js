const express = require('express')
const router = express.Router();
const clients = require('../models/client')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)
const orders = require('../models/order');
const itemsOrders = require('../models/itensOrder')
const products = require('../models/product')
const collaboratorAuthentication = require('../middleware/collaboratorAuthentication');
const sequelize = require('sequelize');


router.get('/main', collaboratorAuthentication, (req, res) => {
    res.render('admin/main/main')
})

router.get('/main/production', collaboratorAuthentication, (req, res) => {

    res.render('admin/main/production')
})

router.get('/main/clients/:client?', collaboratorAuthentication, async (req, res) => {

    let client = `%${req.params.client}%`;
    let clts = undefined
    try {

        if (req.params.client != undefined && req.params.client != 'all') {
            clts = await clients.findAll({ where: { nome: { [sequelize.Op.like]: client } } })
        } else {
            clts = await clients.findAll()
        }

        res.render('admin/main/clients', { clients: clts })

    } catch (error) {
        res.json(error)
    }
})

router.get('/main/orders/:client?', collaboratorAuthentication, async (req, res) => {

    let client = `%${req.params.client}%`;
    let clts = undefined;

    try {

        if (req.params.client != undefined && req.params.client != 'all') {
            clts = await clients.findAll({ where: { nome: { [sequelize.Op.like]: client } }, include: orders })
        } else {
            clts = await clients.findAll({ include: orders })
        }

        res.render('admin/main/orders', { clients: clts })

    } catch (error) {
        res.json(error)
    }
})

router.get('/main/order/:clientId?', collaboratorAuthentication, async (req, res) => {

    let clientId = req.params.clientId;

    try {
        let ord = await orders.findOne({
            where: {
                clienteId: clientId,
                status: 'CARRINHO'
            }, include: clients
        })
        if (ord) {

            try {

                let items = await itemsOrders.findAll({ where: { pedidoId: ord.id }, include: products })

                let response = {
                    ord, items
                }

                res.json(response)

            } catch (error) {
                res.send('Não foi possível realizar esta consulta, tente novamente, caso o erro persista entre em contato com o suporte-->' + error)
            }

        } else {
            res.send('Não foi possível realizar esta consulta, tente novamente, caso o erro persista entre em contato com o suporte')
        }
    } catch (error) {
        res.json(error)
    }
})



module.exports = router;