const express = require('express');
const products = require('../models/product')
const sequelize = require('sequelize')
const router = express.Router();
const slug = require('slugify')
const collaboratorAuthentication = require('../middleware/collaboratorAuthentication')
const multer = require('multer')


router.get('/admin/products/find/:product?', collaboratorAuthentication, async (req, res) => {

    let prod = `%${req.params.product}%`;
    let prods = [{}]
    try {
        if (req.params.product && req.params.product != 'all') {
            prods = await products.findAll({ where: { nome: { [sequelize.Op.like]: prod } } });
        } else {
            if (req.params.product == null || req.params.product == 'all')
                prods = await products.findAll();
        }
        if (prods != undefined) {
            res.render('admin/products/products', { products: prods })
        } else {
            res.json('Ops. Não foi possível realizar este procedimento, tente novamente, caso o problema persista, entre em contato com o suporte')
        }
    } catch (error) {
        res.json(erro)
    }

})

router.get('/admin/products/register', collaboratorAuthentication, (req, res) => {
    res.render('admin/products/new')
})

router.get('/admin/products/edit/:id', collaboratorAuthentication, (req, res) => {
    let id = req.params.id;

    products.findByPk(id).then(product => {
        res.render('admin/products/edit', { product: product })
    }).catch(erro => {
        res.json(erro)
    })
})


router.post('/admin/products/save', collaboratorAuthentication, (req, res) => {

    let data = req.body;

    if (data != undefined) {

        products.create({
            nome: data.nome,
            descricao: data.descricao,
            codRef: data.codRef,
            tamFinal: data.tamFinal,
            vlrProduto: parseFloat(data.vlrProduto),
            material: data.material,
            gramatura: parseFloat(data.gramatura),
            peso: parseFloat(data.peso),
            tamSangria: data.tamSangria,
            slug: slug(data.nome),
            propriedadeDivisao: data.propriedadeDivisao,
            qtd: data.qtd
        }).then((product) => {
            res.redirect('/admin/products/find/')
        }).catch(erro => {
            console.log('Erro ao tentar salvar produtos ' + erro);
            console.log(data);
            res.redirect('/admin/products/find/')
        })
    }
})

router.post('/admin/products/update', collaboratorAuthentication, (req, res) => {

    let data = req.body;

    if (data != undefined) {

        products.update({
            nome: data.nome,
            descricao: data.descricao,
            codRef: data.codRef,
            tamFinal: data.tamFinal,
            vlrProduto: parseFloat(data.vlrProduto),
            material: data.material,
            gramatura: parseFloat(data.gramatura),
            peso: parseFloat(data.peso),
            tamSangria: data.tamSangria,
            slug: slug(data.nome),
            propriedadeDivisao: data.propriedadeDivisao,

        }, { where: { id: data.id } }).then(() => {
            res.redirect('/admin/products/find/')
        }).catch(erro => {
            res.json(erro)
        })

    }

})


module.exports = router