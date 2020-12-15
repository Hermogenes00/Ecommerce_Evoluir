const sequelize = require('sequelize')
const order = require('../models/order')
const payment = require('../models/payment')
const router = require('express').Router()
const category = require('../models/category')
const subCategory = require('../models/subCategory')
const clientAuthentication = require('../middleware/clientAuthentication')

//Tratamento dos arquivo (upload gabarito)
const multer = require('multer')
const path = require('path')
const fs = require('fs')

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




module.exports = router