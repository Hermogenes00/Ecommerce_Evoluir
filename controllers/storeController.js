const express = require('express');
const products = require('../models/product')
const router = express.Router();
const sequelize = require('sequelize');
const defaultAuthentication = require('../middleware/defaultAuthentication')
const category = require('../models/category')
const subCategory = require('../models/subCategory')

//Criação do middleware para menu
router.use(async (req, res, next) => {
    try {
        res.locals.menu = await category.findAll({ include: subCategory })
    } catch (error) {
        console.log('Erro ao tentar consultar as categorias->' + error);
    }
    next()
})


router.post('/products/find', defaultAuthentication, async (req, res) => {
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
        res.render('index', { products: prod[0].produtos})

    } catch (error) {
        console.log('Erro ao pesquisar o produto-->' + error)
    }
})




module.exports = router;