const express = require('express');
const products = require('../models/product')
const sequelize = require('sequelize')
const category = require('../models/category')
const subCategory = require('../models/subCategory')
const router = express.Router();
const slug = require('slugify')


//Tratamento dos arquivo (upload gabarito)
const multer = require('multer')
const path = require('path')
const fs = require('fs')


//Validation
let validation = require('../validations/productValidation');


//Configuração do multer, para upload e download dos gabaritos
let enderecoImagem = null;

//Configuração de salvamento do multer
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


//Listagem dos produtos
router.get('/api/products/products/:name?', async (req, res) => {

    let prod = `%${req.params.name}%`;
    let prods = [{}]

    try {
        if (prod != '' && prod != 'all') {
           prods = await products.findAll({ where: { nome: { [sequelize.Op.like]: prod } }, include: [{ model: category }, { model: subCategory }] });
        } else {
            if (req.params.product == null || req.params.product == 'all')
                prods = await products.findAndCountAll({
                    offset: 0,
                    limit: 2
                });
        }
        if (prods != undefined) {
            res.statusCode = 200
            res.json(prods)
        } else {

            res.statusCode = 400

        }
    } catch (error) {
        res.statusCode = 400
        res.send('Erro ao tentar consultar o produto')
    }

})

//Esta página irá carregar um produto
router.get('/products/:id?', async (req, res) => {

    if (req.params.id) {
        try {
            product = await products.findOne(
                {
                    where: { id: req.params.id },
                    include: [{ model: category }, { model: subCategory }]
                })

            res.statusCode = 200
            res.json(product)

        } catch (error) {
            res.statusCode = 400
            res.send('Erro ao tentar consultar o produto')
        }
    }
})


router.get('/products/slug/:slug', (req, res) => {
    let slugProd = req.params.slug;

    products.findOne({ where: { slug: slugProd } }).then(prod => {
        res.statusCode = 200
        res.json(prod)
    }).catch(erro => {
        res.statusCode = 400
        res.send('Erro ao tentar localizar o produto')
    })
})



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


router.post('/admin/products/save', async (req, res) => {

    let data = req.body

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
        res.statusCode = 400
        res.send(validResult.error.details[0].message)
    }


    let slugNome = slug(data.nome)
    let slugs = await products.findAll({ where: { slug: slugNome } })

    try {
        if (data.id != undefined || data.id > 0) {
            slugs = await products.findAll({ where: { slug: slugNome, [sequelize.Op.not]: data.id } })
            if (slugs.length > 0) {
                res.statusCode = 400
                res.send('Já existe um produto com este nome. Por gentileza, informe um novo nome para o produto')
            }
        } else {
            res.statusCode = 400
            res.send('Id do produto não informado')
        }
    } catch (error) {
        res.statusCode = 400
        res.send('Erro ao tentar comparar produtos com o slug-')
    }

    //#endregion
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
                res.statusCode = 200
                res.json(product)
            }).catch(erro => {
                res.statusCode = 400
                res.send('Erro ao tentar criar um novo produto')
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
            }, { where: { id: data.id } }).then((response) => {
                res.statusCode = 200
                res.json(response)
            }).catch(erro => {
                res.statusCode = 400
                res.send('Erro ao tentar alterar o produto')
            })
        }
    }

})

module.exports = router