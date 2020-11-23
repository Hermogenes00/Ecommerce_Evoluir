const express = require('express')
const router = express.Router();
const orders = require('../models/order')
const itensOrder = require('../models/itensOrder')
const constants = require('../utils/constants');
const product = require('../models/product')
const client = require('../models/client')
const category = require('../models/category')
const subCategory = require('../models/subCategory')
const address = require('../models/address')

const clientAuthentication = require('../middleware/clientAuthentication')
const defaultAuthentication = require('../middleware/defaultAuthentication')
const collaboratorAuthentication = require('../middleware/collaboratorAuthentication')

const mercadoPago = require('mercadopago')

//Chaves para acesso
const PUBLIC_KEY = 'TEST-37ef8765-47e0-43fe-869d-e80a24018acb'
const ACCESS_TOKEN = 'TEST-377894632490329-110614-f40817ed0257d721b3238430c7bea7f1-668493060'

//Configuração do mercadopago
mercadoPago.configure({
    sandbox: true,
    access_token: ACCESS_TOKEN
})

//Criação do middleware para menu
router.use(async (req, res, next) => {
    try {
        res.locals.menu = await category.findAll({ include: subCategory })
    } catch (error) {
        console.log('Erro ao tentar consultar as categorias->' + error);
    }
    next()
})




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

            if (ords.itensPedidos) {
                ords.itensPedidos.forEach(item => {
                    total += parseFloat(item.valor)
                })
            }

            try {
                await orders.update({ total: total }, { where: { id: data.idPedido } })

                //Verifica se tem algo no carrinho, caso não, irá excluir o carrinho
                if (!ords.itensPedidos.length > 0) {
                    await orders.destroy({ where: { id: ords.id } })
                }

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

router.post('/cart/finish/', clientAuthentication, async (req, res) => {

    let data = req.body;
    let idClient = req.session.client.id
    let description = '';
    try {

        let ord = await orders.findOne({
            where: { clienteId: idClient, status: 'CARRINHO' },
            include: [{ model: client }, { model: address }]
        })

        let itens = await itensOrder.findAll({ where: { pedidoId: ord.id }, include: product })

        let noFiles = itens.filter(item => {
            return item.arquivo == null || item.arquivo == '';
        })

        if (noFiles.length > 0) {
            req.flash('error', 'Verifique se todos os produtos, estão com os seus respectivos arquivos')
            res.redirect('/client/order')
        } else {
            let adr = await address.findAll({ where: { clienteId: ord.cliente.id } })

            let idPagamento = '' + Date.now()
            let emailPagador = ord.cliente.email

            //#region Teste para implementação do mercado pago         
            itens.forEach(item => {
                description += ` ${item.produto.nome}(qtd: ${item.qtd})(valor: ${item.valor}) `
            })

            let dados = {
                items: [
                    item = {
                        id: idPagamento,
                        title: description,
                        quantity: 1,
                        currency_id: 'BRL',
                        unit_price: parseFloat(ord.total)
                    }
                ],
                payer: {
                    email: emailPagador
                },
                external_reference: idPagamento
            }

            try {

                var pagamento = await mercadoPago.preferences.create(dados)
                global.id = pagamento.body.id
                
                //console.log(pagamento);

                //Seria neste momento que deveríamos salvar o id e email do pagamento no banco
                //banco.salvarPagamento({id:idPagamento,email:emailPagador})

                //Redirecionando para a url de checkout

                res.render('admin/order/finish', { ord: ord, itens: itens, address: adr, dados: dados })

            } catch (error) {
                console.log(error);
                res.json(error)
            }

            //#endregion
        }

    } catch (error) {
        res.send('Erro---------' + error)
    }

})

router.post('/cart/address/update', clientAuthentication, async (req, res) => {
    let data = req.body
    let idClient = req.session.client.id

    try {

        await orders.update({
            enderecoId: data.idAddress
        }, { where: { clienteId: idClient, status: 'CARRINHO' } })

        let ord = await orders.findOne({
            where: { clienteId: idClient, status: 'CARRINHO' },
            include: [{ model: client }, { model: address }]
        })

        let itens = await itensOrder.findAll({ where: { pedidoId: ord.id }, include: product })

        let adr = await address.findAll({ where: { clienteId: idClient } })

        res.render('admin/order/finish', { ord: ord, itens: itens, address: adr })

    } catch (error) {
        console.log('Erro ao tentar atualizar o endereço do carrinho-->' + error);
    }
})




module.exports = router