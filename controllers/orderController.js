
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

//Rota para testar utilização do xhttpr no arquivo pay.js
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

            orders.update({ status: CONSTANTE.STATUS_PEDIDO.AGUARDANDO_PAGAMENTO }, { where: { id: ord.id } }).then().catch(err => {
                console.log('Erro ao tentar atualizaro status->' + err);
                return res.redirect('/client/cart')
            })
        }

        //#endregion
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
                total: parseFloat(ord.valorFinal),
                referencia: pagamento.body.external_reference,
                pedidoId: ord.id
            }, { where: { id: pay.id } })
        } else {
            await payment.create({
                total: parseFloat(ord.valorFinal),
                referencia: pagamento.body.external_reference,
                pedidoId: ord.id
            })
        }

        return res.render('admin/order/pay', { ord: ord, itens: itens, address: adrss })

    } catch (error) {
        console.log('/order/payment/:idOrder->' + error);
        return res.send('Ops, ocorreu um erro. Tente novamente mais tarde, caso o problema persista, entre em contato com o suporte.', error)
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