const order = require('../models/order')
const payment = require('../models/payment')
const client = require('../models/client')
const router = require('express').Router()
const category = require('../models/category')
const subCategory = require('../models/subCategory')
const clientAuthentication = require('../middleware/clientAuthentication')
const collaboratorAuthentication = require('../middleware/collaboratorAuthentication')



//CONSTANTES
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

//Rotas

router.get('/payment', collaboratorAuthentication, async (req, res) => {
    let response = {}

    try {
        response = await order.findAll({ include: [{ model: payment }, { model: client }] })
    } catch (error) {
        console.log('Erro ao tentar carregar pagamentos', error);
    }
    console.log(response);
    res.render('admin/main/payments', { pedidos: response })
})








//receipt=comprovante
router.post('/admin/payment/receipt', clientAuthentication, async (req, res) => {

    let data = req.body
    let flagImage = false

    //Verificando se o arquivo é uma imagem
    data.imagem.split('/')[0] == 'data:image' ? flagImage = true : flagImage = false

    if (flagImage) {
        try {
            await payment.update(
                { comprovante: data.imagem, status: CONSTANTE.STATUS_PAGAMENTO.ANALISE_COMPROVANTE },
                { where: { pedidoId: data.idOrderImagem } })

            await order.update({
                status: CONSTANTE.STATUS_PAGAMENTO.ANALISE_COMPROVANTE
            }, { where: { id: data.idOrderImagem } })

            req.flash('success', 'Comprovante enviado para análise')

        } catch (error) {
            req.flash('error', 'Erro ao tentar salvar o arquivo')
            console.log('Erro ao tentar salvar o arquivo', error);
        }
    } else {
        req.flash('error', 'Erro ao tentar enviar o comprovante, verifique e tente novamente')
    }

    res.redirect('/client/orders')
})


//Aprovação/Recusa da análise do envio do comprovante
router.post('/payment/:id', collaboratorAuthentication, (req, res) => {

    let { id } = req.params
    let data = req.body

    payment.update({
        status: data.status,
        informe: data.informe
    }, { where: { pedidoId: id } }).then(response => { }).catch(err => {
        res.status(400).json({ err: 'Erro ao tentar alterar o pagamento' })
    })

    order.update({
        status: data.status,
        include: [{ model: payment }]
    }, { where: { id: id } }).then(response => {
        res.status(200).json(response)
    }).catch(err => {
        res.status(400).json(err)
    })


})



module.exports = router