const express = require('express');
const products = require('../models/product')
const router = express.Router();
const slug = require('slugify')
const defaultAuthentication = require('../middleware/defaultAuthentication')

router.get('/admin/products/',defaultAuthentication ,(req, res) => {
    products.findAll().then(products => {

        if (products != undefined) {
            res.render('admin/products/products', { products: products })
        } else {
            res.json(erro)
        }

    }).catch(erro => {
        res.json(erro)
    })

})

router.get('/admin/products/new',defaultAuthentication ,(req, res) => {
    res.render('admin/products/new')
})

router.get('/admin/products/edit/:id',defaultAuthentication ,(req, res) => {
    let id = req.params.id;

    products.findByPk(id).then(product => {
        res.render('admin/products/edit', { product: product })
    }).catch(erro => {
        res.json(erro)
    })
})


router.get('/admin/products/detail/:id',defaultAuthentication ,(req, res) => {
    let id = req.params.id;
    let logado = false
    if(req.session.client != undefined){
        logado = true;
    }
    
    products.findByPk(id).then(product => {
        res.render('admin/products/detail', { product: product, logado: logado })
    }).catch(erro => {
        res.json(erro)
    })


})

router.post('/admin/products/save',defaultAuthentication, (req, res) => {

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
            res.redirect('/admin/products')
        }).catch(erro => {
            console.log('Erro ao tentar salvar produtos ' + erro);
            console.log(data);
            res.redirect('/admin/products')
        })
    }
})

router.post('/admin/products/update',defaultAuthentication ,(req, res) => {

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
            res.redirect('/')
        }).catch(erro => {
            res.json(erro)
        })

    }

})


module.exports = router