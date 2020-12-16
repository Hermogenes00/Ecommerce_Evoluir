const express = require('express');
const router = express.Router();

//Models
const category = require('../models/category')
const subCategory = require('../models/subCategory');



//Criação do middleware para menu
router.use(async (req, res, next) => {
    try {
        res.locals.menu = await category.findAll({ include: subCategory })
    } catch (error) {
        console.log('Erro ao tentar consultar as categorias->' + error);
    }
    next()
})


module.exports = router;