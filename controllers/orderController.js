
const express = require('express')
const router = express.Router();

const orders = require('../models/order')
const itensOrder = require('../models/itensOrder')
const product = require('../models/product')
const client = require('../models/client')
const category = require('../models/category')
const subCategory = require('../models/subCategory')
const address = require('../models/address')
const payment = require('../models/payment')
const deliveryRegion = require('../models/deliveryRegion')

const clientAuthentication = require('../middleware/clientAuthentication')
const collaboratorAuthentication = require('../middleware/collaboratorAuthentication')


//Mercado pago
const mercadoPago = require('../mercadoPago/mercadoPago')


const CONSTANTE = require('../utils/constants')

//Criação do middleware para menu
router.use(async (req, res, next) => {
    try {
        res.locals.menu = await category.findAll({ include: subCategory })
    } catch (error) {
        console.log('Erro ao tentar consultar as categorias->' + error);
    }
    next()
})

router.post('/order/pay/', clientAuthentication, async (req, res) => {

    let idOrder = req.body.idOrder;
    try {
       
        let ord = await orders.findOne({
            where: { id: idOrder },
            include: [{ model: client }, { model: address }, { model: deliveryRegion }]
        })

        if (ord) {
            let itens = await itensOrder.findAll({ where: { pedidoId: ord.id }, include: product })
            let adrss = await address.findAll({ where: { clienteId: ord.cliente.id } })

            let idPagamento = '' + Date.now()
            let emailPagador = ord.cliente.email
            let description = ''
            itens.forEach(item => {
                description += ` ${item.produto.nome}(qtd: ${item.qtd})(valor: ${item.valor}) ->Frete: ${ord.valorFrete} `
            })

            let dados = {
                items: [
                    item = {
                        id: idPagamento,
                        title: description,
                        quantity: 1,
                        currency_id: 'BRL',
                        unit_price: parseFloat(ord.valorFinal)
                    }
                ],
                payer: {
                    email: emailPagador,
                    name: ord.cliente.nome
                },
                external_reference: idPagamento
            }

            var pagamento = await mercadoPago.preferences.create(dados)
            global.id = pagamento.body.id

            let pay = await payment.findOne({ where: { pedidoId: ord.id } })

            if (pay) {
                await payment.update({
                    total: parseFloat(ord.total),
                    referencia: pagamento.body.external_reference,
                    pedidoId: ord.id
                }, { where: { id: pay.id } })
            } else {
                await payment.create({
                    total: parseFloat(ord.total),
                    referencia: pagamento.body.external_reference,
                    pedidoId: ord.id
                })
            }

            res.render('admin/order/pay', { ord: ord, itens: itens, address: adrss })
        }
    } catch (error) {
        console.log('Erro ao tentar carregar tabelas na rota /order/pay/:idOrder ->' + error);
    }
})

router.get('/admin/orders', clientAuthentication, async (req, res) => {

    try {

        let objOrders = await orders.findAll({ where: { clienteId: req.session.client.id } });
        res.render('admin/order/orders', { orders: objOrders })

    } catch (error) {
        console.log('Erro ao buscar pedidos: ' + error);
        res.send('Erro ' + error)
    }
})



router.post('/order/resume', collaboratorAuthentication, async (req, res) => {
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