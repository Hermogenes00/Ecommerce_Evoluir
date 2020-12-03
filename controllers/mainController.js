const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

const sequelize = require('sequelize');

//Middleware authentication
const collaboratorAuthentication = require('../middleware/collaboratorAuthentication');

//Constantes
const CONSTANTES = require('../utils/constants')

//Models
const category = require('../models/category')
const subCategory = require('../models/subCategory')
const orders = require('../models/order');
const products = require('../models/product')
const clients = require('../models/client')
const itemsOrders = require('../models/itensOrder');
const product = require('../models/product');
const address = require('../models/address');


//Criação do middleware para menu
router.use(async (req, res, next) => {
    try {
        res.locals.menu = await category.findAll({ include: subCategory })
    } catch (error) {
        console.log('Erro ao tentar consultar as categorias->' + error);
    }
    next()
})

router.get('/main', collaboratorAuthentication, async (req, res) => {
    let statusCarrinho = CONSTANTES.STATUS_PEDIDO.CARRINHO
    try {

        let ords = await orders.findAll({ where: { status: statusCarrinho } })
        
        let totalCarrinho = ords.reduce((prevVal, obj) => {
            let valorFinal = parseFloat(obj.valorFinal)
            return prevVal += valorFinal
        }, 0)

        res.render('admin/main/main', { totalCarrinho })

    } catch (error) {
        res.send(error)
    }


})

router.get('/main/production/status/update/:id/:status', collaboratorAuthentication, async (req, res) => {
    let itemId = req.params.id
    let status = req.params.status
    let result = {}
    try {
        result = await itemsOrders.update({
            status: status
        }, { where: { id: itemId } })
        res.json(result)
    } catch (error) {
        res.json(result)
        console.log('Erro ao tentar alterar o status de um item do carrinho');
    }

})

router.get('/main/production', collaboratorAuthentication, async (req, res) => {

    try {
        let itens = await itemsOrders.findAll({ include: [{ model: product }, { model: orders }] })
        res.render('admin/main/production', { itens: itens })
    } catch (error) {
        console.log('Erro ao tentar carregas itens dos pedidos-->' + error);
    }
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
                status: require('../utils/constants').STATUS_PEDIDO.CARRINHO
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