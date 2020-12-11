const sequelize = require('sequelize')
const payment = require('../models/payment')
const router = require('express').Router()
const clientAuthentication = require('../middleware/clientAuthentication')


//Criação do middleware para menu
router.use(async (req, res, next) => {
    try {
        res.locals.menu = await category.findAll({ include: subCategory })
    } catch (error) {
        console.log('Erro ao tentar consultar as categorias->' + error);
    }
    next()
})

//Rotas
router.post('/admin/payment/comprovante', clientAuthentication, (req, res) => {
    let data = req.body

})




module.exports = router