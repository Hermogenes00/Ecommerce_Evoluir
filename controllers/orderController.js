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


const CONSTANTE = require('../utils/constants');


//Criação do middleware para menu
router.use(async (req, res, next) => {
    try {
        res.locals.menu = await category.findAll({ include: subCategory })
    } catch (error) {
        console.log('Erro ao tentar consultar as categorias->' + error);
    }
    next()
})


//Altera o status do item de um pedido
router.patch('/order/item/:idItemOrder', async (req, res) => {

    let { idItemOrder } = req.params

    let data = req.body

    try {
        await itensOrder.update({
            status: data.status,
            posicaoTab: data.posicaoTab
        }, { where: { id: idItemOrder } })
    } catch (error) {
        res.json(error)
    }

    try {
        let item = await itensOrder.findByPk(idItemOrder)
        let idOrder = item.pedidoId

        //Itens que ainda não foram concluídos
        let items = await itensOrder.findAll({ where: { pedidoId: idOrder } });
        let qtdTotal = items.length
        let itemsPending = items.filter(i => i.status != 'CONCLUÍDO').length;
        let itemsConcluded = items.filter(i => i.status == 'CONCLUÍDO').length;


        if (itemsConcluded == qtdTotal) {
            orders.update({ status: 'CONCLUÍDO' }, { where: { id: idOrder } }).then(response => {
            }).catch(err => {
                res.json(err)
            })
        }

        res.json({ items, qtdTotal, itemsPending, itemsConcluded })

    } catch (error) {
        res.json(error)
    }
})

router.post('/order/payment/', clientAuthentication, async (req, res) => {

    let idOrder = req.body.idOrder
    let itens = undefined
    let ord = undefined

    try {

        ord = await orders.findOne({
            where: { id: idOrder },
            include: [{ model: client }, { model: address }, { model: deliveryRegion }]
        })

        itens = await itensOrder.findAll({ where: { pedidoId: ord.id }, include: product })

        //#region Validação

        if (ord.status == CONSTANTE.STATUS_PEDIDO.CARRINHO) {

            let noFiles = itens.filter(item => {
                return item.arquivo == null || item.arquivo == '';
            })

            if (noFiles.length > 0) {
                req.flash('error', 'Verifique se todos os produtos, estão com os seus respectivos arquivos')
                return res.redirect('/client/cart')
            }
            else if (ord.metodoEnvio == CONSTANTE.METODO_ENVIO.RETIRA_BASE || ord.metodoEnvio == null) {

                if (ord.regiaoEntregaId <= 0) {
                    req.flash('error', 'Escolha um método para o envio do produto')
                    return res.redirect('/client/cart')
                }

            }

            try {
                await orders.update(
                    {
                        status: CONSTANTE.STATUS_PEDIDO.AGUARDANDO_PAGAMENTO,
                        createdOrder: Date.now()
                    },
                    { where: { id: ord.id } })
            } catch (error) {
                console.log('Erro ao tentar atualizar o status->' + error);
            }
        }

        //#endregion

        let adrss = await address.findAll({ where: { clienteId: ord.cliente.id } })

        //Config Payment

        let idPagamento = '' + Date.now()
        let emailPagador = ord.cliente.email
       

        let dados = {
            items: [
                item = {
                    id: idPagamento,
                    title: 'Pedido nº' + ord.id + ' Evoluir Gráfica Rápida',
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

        
        mercadoPago.preferences.create(dados).then(async function (response) {
            global.id = response.body.id
            let pay = await payment.findOne({ where: { pedidoId: ord.id } })

            if (pay) {
                await payment.update({
                    total: parseFloat(ord.valorFinal),
                    referencia: response.body.external_reference,
                    pedidoId: ord.id,
                    status: CONSTANTE.STATUS_PEDIDO.AGUARDANDO_PAGAMENTO
                }, { where: { id: pay.id } })
            } else {
                await payment.create({
                    total: parseFloat(ord.valorFinal),
                    referencia: response.body.external_reference,
                    pedidoId: ord.id,
                    status: CONSTANTE.STATUS_PEDIDO.AGUARDANDO_PAGAMENTO
                })
            }

            res.render('admin/order/pay', { ord: ord, itens: itens, address: adrss })

        }).catch(function (error) {
            console.log(error);
        })

        //let preference = await mercadoPago.preferences.create(dados)

    } catch (error) {
        console.log('/order/payment/:idOrder->' + error);
        return res.send('Ops, ocorreu um erro. Tente novamente mais tarde, caso o problema persista, entre em contato com o suporte.', error)
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