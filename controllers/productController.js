const express = require('express');
const products = require('../models/product')
const sequelize = require('sequelize')
const category = require('../models/category')
const subCategory = require('../models/subCategory')
const router = express.Router();
const slug = require('slugify')
const collaboratorAuthentication = require('../middleware/collaboratorAuthentication')
const defaultAuthentication = require('../middleware/defaultAuthentication')
const multer = require('multer')
const path = require('path')
const fs = require('fs')


//Criação do middleware para menu
router.use(async (req, res, next) => {
    try {
        res.locals.menu = await category.findAll({ include: subCategory })
    } catch (error) {
        console.log('Erro ao tentar consultar as categorias->' + error);
    }
    next()
})


//Configuração do multer, para upload e download dos gabaritos
let enderecoImagem = null;

//Criação do middleware para menu
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/gabarito')
    },
    filename: (req, file, cb) => {
        enderecoImagem = `${file.originalname}-${Date.now() + path.extname(file.originalname)}`
        cb(null, enderecoImagem)
    }
})

let upload = multer({
    storage: storage,

    fileFilter: (req, file, cb) => {

        if (file.originalname != '' || file.originalname != null || file.originalname != undefined) {
            if (path.extname(file.originalname) != '.rar') {
                req.flash('error', 'Arquivo deve estar em extensão .rar')
                cb(null, false)
            } else {
                req.flash('success', `Arquivo enviado com sucesso ` + file.originalname)
                cb(null, true)
            }
        } else {
            req.flash('error', 'Arquivo vazio')
            cb(null, false)
        }

    }
})

//Rotas------------------------
router.post('/admin/product/upload/:productId', upload.single('file'), async (req, res) => {

    let productId = req.params.productId

    if (enderecoImagem) {
        try {
            let prod = await products.findByPk(productId);
            if (prod.gabarito) {
                fs.unlink('public/gabarito/' + prod.gabarito, (err) => {
                    if (err) {
                        console.log('Erro ao tentar excluir o arquivo');
                    }
                })
            }
        } catch (error) {
            console.log('Erro ao tentar localizar o produto ' + error);
        }

        products.update({
            gabarito: enderecoImagem
        }, { where: { id: productId } }).then(() => {
            enderecoImagem = null
        }).catch(error => {
            res.send('Ops, houve um erro ao tentar realizar esta operação, tente novamente, caso o erro persista entre em contato com o suporte')
        })
    }

    res.redirect('/admin/products/find/')


})

router.get('/admin/products/find/:product?', collaboratorAuthentication, async (req, res) => {

    let prod = `%${req.params.product}%`;
    let prods = [{}]

    let message = {
        error: req.flash('error'),
        success: req.flash('success')
    }

    try {
        if (req.params.product && req.params.product != 'all') {
            prods = await products.findAll({ where: { nome: { [sequelize.Op.like]: prod } } });
        } else {
            if (req.params.product == null || req.params.product == 'all')
                prods = await products.findAll();
        }
        if (prods != undefined) {
            res.render('admin/products/products', { products: prods, message: message })
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

    products.findOne({ where: { id: id }, include: [{ model: category }, { model: subCategory }] }).then(product => {
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
            tamFinalAltura: data.tamFinalAltura.replace('.', '').replace(',', '.'),
            tamFinalLargura: data.tamFinalLargura.replace('.', '').replace(',', '.'),
            vlrProduto: data.vlrProduto.replace('.', '').replace(',', '.'),
            material: data.material,
            gramatura: data.gramatura.replace('.', '').replace(',', '.'),
            peso: data.peso.replace('.', '').replace(',', '.'),
            tamSangriaAltura: data.tamSangriaAltura.replace('.', '').replace(',', '.'),
            tamSangriaLargura: data.tamSangriaLargura.replace('.', '').replace(',', '.'),
            slug: slug(data.nome),
            propriedadeDivisao: parseInt(data.propriedadeDivisao),
            qtd: data.qtd,
            categoriaId: data.categoria,
            subcategoriaId: data.subCategoria
        }).then((product) => {
            res.redirect('/admin/products/find/')
        }).catch(erro => {
            console.log('Erro ao tentar salvar produtos ' + erro);
            console.log(data);
            res.redirect('/admin/products/find/')
        })
    }
})

router.get('/admin/products/detail/:id', defaultAuthentication, (req, res) => {
    let id = req.params.id;

    products.findByPk(id).then(prod => {
        res.render('admin/products/detail', { product: prod })
    }).catch(erro => {
        res.json(erro)
    })
})

router.post('/admin/products/update', collaboratorAuthentication, (req, res) => {

    let data = req.body;
    console.log('DADOS DA SUBCATEGORIA');
    if (data != undefined) {

        products.update({
            nome: data.nome,
            descricao: data.descricao,
            codRef: data.codRef,
            tamFinalAltura: data.tamFinalAltura.replace('.', '').replace(',', '.'),
            tamFinalLargura: data.tamFinalLargura.replace('.', '').replace(',', '.'),
            vlrProduto: data.vlrProduto.replace('.', '').replace(',', '.'),
            material: data.material,
            gramatura: data.gramatura.replace('.', '').replace(',', '.'),
            peso: data.peso.replace('.', '').replace(',', '.'),
            tamSangriaAltura: data.tamSangriaAltura.replace('.', '').replace(',', '.'),
            tamSangriaLargura: data.tamSangriaLargura.replace('.', '').replace(',', '.'),
            slug: slug(data.nome),
            propriedadeDivisao: parseInt(data.propriedadeDivisao),
            qtd: data.qtd,
            categoriaId: data.categoria,
            subcategoriaId: data.subCategoria
        }, { where: { id: data.id } }).then(() => {
            res.redirect('/admin/products/find/')
        }).catch(erro => {
            res.json(erro)
        })

    }

})


module.exports = router