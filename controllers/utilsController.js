const express = require('express')
const router = express.Router();
const defaultAuthentication = require('../middleware/defaultAuthentication');
const category = require('../models/category')
const subCategory = require('../models/subCategory')
const Correios = require('node-correios')


//Criação do middleware para menu
router.use(async (req, res, next) => {
    try {
        res.locals.menu = await category.findAll({ include: subCategory })
    } catch (error) {
        console.log('Erro ao tentar consultar as categorias->' + error);
    }
    next()
})

router.get('/buscarCep/:cep',defaultAuthentication, async (req, res) => {
    
    let cep = req.params.cep;
    args = {
        cep: cep
    }

    let correio = new Correios();

    try {
        let result = await correio.consultaCEP(args);
        console.log('Encontrou----------- '+result);
        res.json(result)
    } catch (error) {
        console.log('Erro ao tentar buscar o cep----------- '+error);
        res.json({})
    }

})

module.exports = router