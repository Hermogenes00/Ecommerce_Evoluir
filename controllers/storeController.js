const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');

//Middlewares Authentication
const defaultAuthentication = require('../middleware/defaultAuthentication')
const clientAuthentication = require('../middleware/clientAuthentication')

//Models
const category = require('../models/category')
const subCategory = require('../models/subCategory');
const address = require('../models/address')
const itensOrder = require('../models/itensOrder')
const products = require('../models/product')
const orders = require('../models/order')
const client = require('../models/client')

//MercadoPago
const mercadoPago = require('../mercadoPago/mercadoPago')


//Criação do middleware para menu
router.use(async (req, res, next) => {
    try {
        res.locals.menu = await category.findAll({ include: subCategory })
    } catch (error) {
        console.log('Erro ao tentar consultar as categorias->' + error);
    }
    next()
})


router.post('/products/find/', defaultAuthentication, async (req, res) => {
    let data = req.body
    let name = `%${data.name}%`
    let prod = []
    try {
        if (data.name) {
            prod = await products.findAll({
                where: {
                    nome: { [sequelize.Op.like]: name }
                }
            })
            res.render('index', { products: prod })
        } else {
            prod = await products.findAll()
            res.render('index', { products: prod })
        }
    } catch (error) {
        console.log('Erro ao pesquisar o produto-->' + error)
    }

})


router.get('/products/findBySubCategory/:slug', defaultAuthentication, async (req, res) => {
    let slug = req.params.slug
    let prod = []
    try {

        prod = await subCategory.findAll({
            where: { slug: slug },
            include: products
        })
        res.render('index', { products: prod[0].produtos })

    } catch (error) {
        console.log('Erro ao pesquisar o produto-->' + error)
    }
})



router.get('/pagar', async (req, res) => {

    //Dados que devem conter na tabela: id,valor, id_pedido,status,chave_pagamento,forma_pagamento
    let idPagamento = '' + Date.now()
    let emailPagador = 'pagador@email.com'

    let dados = {
        items: [
            item = {
                id: idPagamento,
                title: '2x video games; 3x camisas',
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(150)
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
        console.log('DADOS DO PAGAMENTO-->'+pagamento);
        //console.log(pagamento);   

        //Seria neste momento que deveríamos salvar o id e email do pagamento no banco
        //banco.salvarPagamento({id:idPagamento,email:emailPagador})

        //Redirecionando para a url de checkout

        res.render('admin/order/teste', { dados })

    } catch (error) {
        console.log(error);
        res.json(error)
    }


})





module.exports = router;