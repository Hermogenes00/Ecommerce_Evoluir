
//Imports
const payment = require('../models/payment')
const router = require('express').Router()


//CONSTANTES
const CONSTANTE = require('../utils/constants')

//Listagem
router.get('/payment', (req, res) => {
    payment.findAll().then(pay => {
        res.status(200).json(pay)
    }
    ).catch(err => {
        res.status(400).json(err)
    })
})

//Aceite ou recusa do comprovante
router.patch('/payment',  (req, res) => {

})


module.exports = router