const express = require('express')
const router = express.Router();

//CONSTANTES
const CONSTANTES = require('../utils/constants')

//Models
const orders = require('../models/order')
const itensOrder = require('../models/itensOrder')
const product = require('../models/product')
const client = require('../models/client')
const category = require('../models/category')
const subCategory = require('../models/subCategory')
const address = require('../models/address')
const payment = require('../models/payment');
const deliveryRegion = require('../models/deliveryRegion');

const tratarArquivo = require('../utils/trataArquivo')

//Middleware Authentication
const clientAuthentication = require('../middleware/clientAuthentication');



router.post('/admin/cart/delete', clientAuthentication, async (req, res) => {

    let data = req.body;

    await itensOrder.destroy({ where: { pedidoId: data.idOrder } })

    await orders.destroy({ where: { id: data.idOrder } })

    res.redirect('/client/cart')
})


router.post('/admin/cart/itemCart/delete', clientAuthentication, async (req, res) => {
    let data = req.body;

    try {
        /**Pegando informações do item na base de dados
         * Para Posteriormente exluir o item upado
         */
        let item = await itensOrder.findOne({ where: { id: data.idItem } })

        //Excluir o arquivo aqui.
        tratarArquivo.removerArquivo(item.arquivo, flag => {
            if (flag) {
                console.log('Arquivo removido com sucesso');
            }
        })

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

            if (ords.itensPedidos.length > 0) {
                ords.itensPedidos.forEach(item => {
                    total += parseFloat(item.valor)
                })
            }

            let valorFinal = total + parseFloat(ords.valorFrete)

            try {
                await orders.update({ total: total, valorFinal: valorFinal }, { where: { id: data.idPedido } })

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

    res.redirect('/client/cart')
})


router.get('/admin/cart/itensCart/:idOrder', clientAuthentication, async (req, res) => {

    let idOrder = req.params.idOrder;

    try {
        //await orders.findOne({ where: { id: order.id }, include: itensOrder })


        let itensCart = await itensOrder.findAll({ where: { pedidoId: idOrder }, include: [{ model: product }, { model: orders, include: [{ model: payment }, { model: address }, { model: deliveryRegion }] }] })

        res.json(itensCart)

    } catch (error) {
        console.log('Erro ao buscar itens do pedido: ' + error);
        res.send('Erro ' + error)
    }

})

router.get('/admin/cart', clientAuthentication, async (req, res) => {

    try {
        let objOrders = await orders.findAll({
            include: [
                { model: client },
                { model: itensOrder },
                { model: address }]
        });
        res.render('admin/cart/cart', { orders: objOrders })

    } catch (error) {
        console.log('Erro ao buscar pedidos: ' + error);
        res.send('Erro ' + error)
    }
})

router.post('/admin/cart/add', clientAuthentication, async (req, res) => {



    let data = req.body;

    let order = undefined;
    let qtdReal = undefined;
    let objItem = {}

    let idClient = req.session.client.id;

    try {

        let objClient = await client.findOne({ where: { id: idClient }, include: address })

        let prod = await product.findOne({ where: { id: data.productId } })


        order = await orders.findOne({ where: { clienteId: idClient, status: CONSTANTES.STATUS_PEDIDO.CARRINHO } })

        if (!order) {
            order = await orders.create({
                clienteId: idClient,
                status: CONSTANTES.STATUS_PEDIDO.CARRINHO,
                cep: objClient.cep,
                rua: objClient.rua,
                bairro: objClient.bairro,
                numero: objClient.numero,
                complemento: objClient.complemento,
                enderecoId: objClient.enderecos[0].id
            })
        }

        if (prod.und == 'und') {

            vlr = parseFloat(data.qtd * prod.vlrProduto);
            let desconto = parseFloat(data.descUnit)

            if (parseInt(data.contadorAuxiliar) > 0)
                vlr = vlr - (vlr * (desconto / 100))

            objItem = {
                valor: vlr,
                qtd: data.qtd,
                pedidoId: order.id,
                produtoId: data.productId
            }

        } else {
            if (data.altura < 1 || data.largura < 1)
                return res.redirect('/admin/products/detail/' + prod.slug)
            let metroTotal = parseFloat(data.altura.replace('.', '').replace(',', '.')) * parseFloat(data.largura.replace('.', '').replace(',', '.'))
            let vlrFinal = metroTotal * prod.vlrProduto
            qtdReal = 1;
            objItem = {
                valor: vlrFinal,
                qtd: qtdReal,
                pedidoId: order.id,
                produtoId: data.productId,
                altura: parseFloat(data.altura.replace('.', '').replace(',', '.')),
                largura: parseFloat(data.largura.replace('.', '').replace(',', '.'))
            }

        }

        if (objItem) {

            itemOrder = await itensOrder.create(objItem)

            ord = await orders.findOne({ where: { id: order.id }, include: itensOrder })

            let result = parseFloat(0.0);


            ord.itensPedidos.forEach(async item => {
                result += parseFloat(item.valor)
            })

            let valorFinal = result + parseFloat(ord.valorFrete)
            await orders.update({ total: result, valorFinal: valorFinal }, { where: { id: order.id } })

            res.redirect('/client/cart')
        }


    } catch (err) {
        res.json("Ocorreu um erro: " + err)
    }

})


router.get('/cart/address/update/:idOrder/:idAddress', clientAuthentication, async (req, res) => {
    let data = req.params
    let idClient = req.session.client.id

    try {

        await orders.update({
            enderecoId: data.idAddress
        }, { where: { id: data.idOrder } })

        let ord = await orders.findOne({
            where: { id: data.idOrder },
            include: [{ model: client }, { model: address }]
        })

        let itens = await itensOrder.findAll({ where: { pedidoId: ord.id }, include: product })

        let adr = await address.findAll({ where: { clienteId: idClient } })

        res.json({ ord: ord, itens: itens, address: adr })

    } catch (error) {
        console.log('Erro ao tentar atualizar o endereço do carrinho-->' + error);
    }
})

module.exports = router