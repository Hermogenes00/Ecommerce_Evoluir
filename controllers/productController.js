const express = require('express');
const products = require('../models/product')
const sequelize = require('sequelize')
const category = require('../models/category')
const subCategory = require('../models/subCategory')
const router = express.Router();
const slug = require('slugify')

//Middleware Authentication
const collaboratorAuthentication = require('../middleware/collaboratorAuthentication')
const defaultAuthentication = require('../middleware/defaultAuthentication')

//Tratamento dos arquivo (upload gabarito)
const multer = require('multer')
const path = require('path')
const fs = require('fs')


//Validation
let validation = require('../validations/productValidation');
const { validate } = require('../validations/productValidation');

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
            res.render('admin/products/products', { products: prods, message })
        } else {
            res.json('Ops. Não foi possível realizar este procedimento, tente novamente, caso o problema persista, entre em contato com o suporte')
        }
    } catch (error) {
        res.json(erro)
    }

})

//Esta página irá carregar um produto ou incluir um produto
router.get('/admin/products/product/:id?', collaboratorAuthentication, async (req, res) => {
    let product = {
        categoria: {},
        subcategoria: {}
    }

    let message = {
        erro: []
    }

    if (req.params.id) {
        try {
            product = await products.findByPk(req.params.id)
        } catch (error) {
            console.log('Erro ao tentar localizar produto->', error);
            return res.redirect('/admin/products/product/')
        }
    }

    res.render('admin/products/product', {
        product,
        message: { erro: [] }
    })
})

router.post('/admin/products/save', collaboratorAuthentication, async (req, res) => {

    let data = req.body
    let flagErro = false
    let message = {
        erro: []
    }

    //#region Validação
    const validResult = validation.validate({
        nome: data.nome,
        descricao: data.descricao,
        tamFinalAltura: data.tamFinalAltura.replace('.', '').replace(',', '.'),
        tamFinalLargura: data.tamFinalLargura.replace('.', '').replace(',', '.'),
        vlrProduto: data.vlrProduto.replace('.', '').replace(',', '.'),
        material: data.material,
        gramatura: data.gramatura.replace('.', '').replace(',', '.'),
        peso: data.peso.replace('.', '').replace(',', '.'),
        tamSangriaAltura: data.tamSangriaAltura.replace('.', '').replace(',', '.'),
        tamSangriaLargura: data.tamSangriaLargura.replace('.', '').replace(',', '.'),
        propriedadeDivisao: parseInt(data.propriedadeDivisao),
        qtd: data.qtd,
        categoriaId: data.categoria,
        subcategoriaId: data.subCategoria,
        previsaoProducao: data.previsaoProducao,
        und: data.und,
        imagem: data.imagem

    })

    if (validResult.error) {
        req.flash('erro', validResult.error.details[0].message)
        message.erro = req.flash('erro')
        return res.render('admin/products/product', { message: message, product: data })
    }


    let slugNome = slug(data.nome)
    let slugs = await products.findAll({ where: { slug: slugNome } })

    try {
        if (data.id != undefined || data.id > 0) {
            slugs = await products.findAll({ where: { slug: slugNome, [sequelize.Op.not]: data.id } })
            if (slugs.length > 0) {
                req.flash('erro', 'Já existe um produto com este nome. Por gentileza, informe um novo nome para o produto')
                flagErro = true
            }
        } else {
            if (slugs.length > 0) {
                req.flash('erro', 'Já existe um produto com este nome. Por gentileza, informe um novo nome para o produto')
                flagErro = true
            }
        }
    } catch (error) {
        console.log('Erro ao tentar comparar produtos com o slug->', error);
    }

    //#endregion

    if (flagErro) {
        message.erro = req.flash('erro')
        res.render('admin/products/product', { message: message, product: data })
    } else {
        if (data != undefined) {
            if (data.id != undefined && data.id <= 0) {
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
                    subcategoriaId: data.subCategoria,
                    previsaoProducao: data.previsaoProducao,
                    und: data.und,
                    imagem: data.imagem
                }).then((product) => {
                    req.flash('success', 'Produto adicionado com sucesso!!!')
                    res.redirect('/admin/products/find/')
                }).catch(erro => {
                    console.log('Erro ao tentar salvar produtos ' + erro);
                    res.render('admin/products/product', { product: data })
                })
            } else {
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
                    subcategoriaId: data.subCategoria,
                    previsaoProducao: data.previsaoProducao,
                    und: data.und,
                    imagem: data.imagem
                }, { where: { id: data.id } }).then(() => {
                    req.flash('success', 'Alterações realizadas com sucesso!!!')
                    res.redirect('/admin/products/find/')
                }).catch(erro => {
                    res.json(erro)
                })
            }

        }
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

module.exports = router