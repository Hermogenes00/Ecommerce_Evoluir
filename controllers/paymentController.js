const sequelize = require('sequelize')
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
router.post('/admin/payment/receipt', clientAuthentication, (req, res) => {

    let data = req.body
    let flagImage = false

    //Verificando se o arquivo é uma imagem
    data.imagem.split('/')[0] == 'data:image' ? flagImage = true : flagImage = false

    if (!flagImage) {
        console.log('Entrou na negação-----------------------');
        req.flash('erro', 'Erro ao tentar enviar o comprovante, verifique e tente novamente')
        return res.redirect('/client/orders')
    } else {
        payment.update({ comprovante: data.imagem, status: CONSTANTE.STATUS_PAGAMENTO.ANALISE_COMPROVANTE },
            { where: { pedidoId: data.idOrderImagem } }).then(() => {

                req.flash('success', 'Comprovante enviado para análise')
                res.redirect('/client/orders')
            }).catch(err => {
                req.flash('erro', 'Erro ao tentar enviar o comprovante, verifique e tente novamente')
                res.redirect('/client/orders')
            })
    }




})




module.exports = router