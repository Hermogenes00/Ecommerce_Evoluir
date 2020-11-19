const express = require('express');
const products = require('../models/product')
const router = express.Router();
const sequelize = require('sequelize');
const defaultAuthentication = require('../middleware/defaultAuthentication')

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
        console.log('Erro ao pesquisar o produto-->'+error)
    }
    
})





module.exports = router;