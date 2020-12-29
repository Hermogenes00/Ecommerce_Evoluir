const express = require('express')
const router = express.Router();

//CONSTANTES
const CONSTANTES = require('../utils/constants')

//Models
const orders = require('../models/order')
const itensOrder = require('../models/itensOrder')
const product = require('../models/product')
const client = require('../models/client')
const address = require('../models/address')

const tratarArquivo = require('../utils/trataArquivo')


//Retorna todos os pedidos com seus itens e endereços
router.get('/carts', async (req, res) => {

    try {
        let objOrders = await orders.findAll({
            include: [
                { model: client },
                { model: itensOrder },
                { model: address }]
        });

        res.status(200).json(objOrders)

    } catch (error) {
        res.status(400).send('Erro ao buscar pedidos')
    }
})

//Retorna o carrinho pelo id
router.get('/carts/:id', async (req, res) => {
    let { id } = req.params

    try {
        let ord = await orders.findOne({
            where: { id: id },
            include: [{ model: client }, { model: address }, { model: itensOrder }]
        })
        res.status(200).json(ord)
    } catch (error) {
        res.status(400).send('Erro ao tentar consultar o carrinho')
    }
})


//Retorna itens de um carrinho pelo id de um pedido
router.get('/cart/itensCart/:idOrder', async (req, res) => {

    let idOrder = req.params.idOrder;

    try {
        //await orders.findOne({ where: { id: order.id }, include: itensOrder })


        let itensCart = await itensOrder.findAll({ where: { pedidoId: idOrder }, include: product })

        res.status(200).json(itensCart)

    } catch (error) {
        res.status(400).send('Erro ao buscar itens do pedido')
    }

})

//Criação de um carrinho
router.post('/cart', async (req, res) => {

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
            qtdReal = parseFloat(data.qtd) / prod.propriedadeDivisao;

            vlr = parseFloat(qtdReal * prod.vlrProduto);

            objItem = {
                valor: vlr,
                qtd: data.qtd,
                pedidoId: order.id,
                produtoId: data.productId
            }

        } else {
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

            res.status(200).json(order)
        }


    } catch (err) {
        res.status(400).send('Erro ao tentar criar um carrinho')
        res.json("Ocorreu um erro: " + err)
    }

})


//Atualização do endereço de um pedido
router.patch('/cart/address/:idAddress', async (req, res) => {

    let { idAddress } = req.params

    try {

        let response = await orders.update({
            enderecoId: idAddress
        }, { where: { id: data.idOrder } })

        res.status(200).json(response)
    }
    catch (error) {
        res.status(400).send('Erro ao tentar atualizar o endereço do carrinho')
        console.log('-->' + error);
    }
}
)


//Excluir um carrinho
router.delete('/cart/:id', async (req, res) => {
    let id = req.params.id

    try {
        let responseItens = await itensOrder.destroy({ where: { pedidoId: id } })
        let responseOrders = await orders.destroy({ where: { id: id } })
        res.status(200).json({ responseItens, responseOrders })
    } catch (error) {
        res.status(400).send('Erro ao tentar excluir o carrinho')
    }
})

//Excluir o item de um carrinho
router.delete('/cart/itemCart/:id', async (req, res) => {
    let id = req.params.id

    try {

        /**Pegando informações do item na base de dados
         * Para Posteriormente exluir o item upado
         */
        let item = await itensOrder.findOne({ where: { id: id } })

        //Exclusão do arquivo
        tratarArquivo.removerArquivo(item.arquivo, flag => {
            if (flag) {
                console.log('Arquivo removido com sucesso');
            }
        })

        await itensOrder.destroy({ where: { id: id } })

    } catch (error) {
        res.status(400).send('Erro ao tentar realizar a exclusão do item')
    }

    //Atualização dos valores
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
                res.status(400).send('Erro ao tentar atualizar valores do pedido')
            }
        }

        res.status(200)


    } catch (error) {
        res.status(400).send('Erro ao tentar atualizar valores do pedido')
    }
})


module.exports = router