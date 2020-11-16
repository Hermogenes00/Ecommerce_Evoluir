const express = require('express')
const router = express.Router();
const orders = require('../models/order')
const itensOrder = require('../models/itensOrder')
const constants = require('../utils/constants');
const product = require('../models/product')
const client = require('../models/client')
const clientAuthentication = require('../middleware/clientAuthentication')
const defaultAuthentication = require('../middleware/defaultAuthentication')
const collaboratorAuthentication = require('../middleware/collaboratorAuthentication')

router.post('/admin/order/delete', clientAuthentication, async (req, res) => {

    let data = req.body;

    await itensOrder.destroy({ where: { pedidoId: data.idOrder } })

    await orders.destroy({ where: { id: data.idOrder } })

    res.redirect('/client/order')
})


router.post('/admin/order/itemOrder/delete', clientAuthentication, async (req, res) => {
    let data = req.body;

    try {
        await itensOrder.destroy({ where: { id: data.idItem } })
    } catch (error) {
        res.send('Erro ao tentar realizar a exclusão do item' + error)
    }

    try {
        let ords = await orders.findOne({
            where: {
                id: data.idPedido
            }, include: itensOrder
        })

        if (ords) {
            let total = parseFloat(0);

            console.log('ords.ItensPedidos ------------------------------' + ords.itensPedidos);
            if (ords.itensPedidos) {
                console.log('Caiu ---------------------------------------');
                ords.itensPedidos.forEach(item => {
                    total += parseFloat(item.valor)
                })
            }

            try {
                await orders.update({ total: total }, { where: { id: data.idPedido } })
            } catch (error) {
                res.send('Erro ao tentar atualizar valores do pedido' + error)
            }
        }
    } catch (error) {
        res.send('Erro ao tentar atualizar valores do pedido' + error)
    }

    res.redirect('/client/order')
})


router.get('/admin/order/itensOrder/:idOrder', clientAuthentication, async (req, res) => {

    let idOrder = req.params.idOrder;

    try {
        //await orders.findOne({ where: { id: order.id }, include: itensOrder })


        let itensCart = await itensOrder.findAll({ where: { pedidoId: idOrder }, include: product })

        res.json(itensCart)

    } catch (error) {
        console.log('Erro ao buscar itens do pedido: ' + error);
        res.send('Erro ' + error)
    }

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

router.post('/admin/cart/add', clientAuthentication, async (req, res) => {

    let data = req.body;
    let order = undefined;

    let idClient = req.session.client.id;

    try {

        let objClient = await client.findOne({ where: { id: idClient } })

        let prod = await product.findOne({ where: { id: data.productId } })

        let qtdReal = parseFloat(data.qtd) / prod.propriedadeDivisao;

        vlr = parseFloat(qtdReal * prod.vlrProduto);
        console.log("Valor que está sendo salvo no banco: " + vlr);

        order = await orders.findOne({ where: { clienteId: idClient, status: constants.CARRINHO } })

        if (!order) {
            order = await orders.create({
                clienteId: idClient,
                status: constants.CARRINHO,
                cep: objClient.cep,
                rua: objClient.rua,
                bairro: objClient.bairro,
                numero: objClient.numero,
                complemento: objClient.complemento

            })
        }

        itemOrder = await itensOrder.create({
            valor: vlr,
            qtd: data.qtd,
            pedidoId: order.id,
            produtoId: data.productId
        })

        ord = await orders.findOne({ where: { id: order.id }, include: itensOrder })

        let result = parseFloat(0.0);

        ord.itensPedidos.forEach(async item => {
            result += parseFloat(item.valor)
        })

        await orders.update({ total: result }, { where: { id: order.id } })

        res.redirect('/client/order')

    } catch (err) {
        res.json("Ocorreu um erro: " + err)
    }

})


router.get('/admin/products/detail/:id', defaultAuthentication, (req, res) => {
    let id = req.params.id;

    product.findByPk(id).then(prod => {
        res.render('admin/products/detail', { product: prod })
    }).catch(erro => {
        res.json(erro)
    })
})

router.post('/order/resume', collaboratorAuthentication,async (req, res) => {
    let data = req.body;

    try {
        let ord = await orders.findOne({ where: { id: data.idOrder }, include: client })
        let itens = await itensOrder.findAll({
            where: {
                pedidoId: data.idOrder
            }, include: product
        })

        if (ord) {

            if (itens) {

                res.render('admin/order/resume', { ord: ord, itens: itens })
            }

        }

    } catch (error) {
        res.json(error)
    }
})

router.post('/cart/finish/', clientAuthentication, async (req, res) => {

    let data = req.body;
    console.log(data);

    try {
        console.log('CHEGOU NA CONSULTA ------------');

        let ord = await orders.findOne({ where: { id: data.idOrder }, include: client })
        let itens = await itensOrder.findAll({
            where: {
                pedidoId: data.idOrder
            }, include: product
        })

        if (ord) {

            if (itens) {

                res.render('admin/order/finish', { ord: ord, itens: itens })
            }

        }

    } catch (error) {
        res.json(error)
    }
    
})




module.exports = router