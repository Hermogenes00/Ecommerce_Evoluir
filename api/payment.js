
//Imports
const payment = require('../models/payment')
const router = require('express').Router()


//CONSTANTES
const CONSTANTE = require('../utils/constants')

//Listagem
router.get('/payment/payments', (req, res) => {
    payment.findAll().then(pay => {
        res.status(200).json(pay)
    }
    ).catch(err => {
        res.status(400).json(err)
    })
})

router.get('/payment/:idPayment', (req, res) => {
    let idPayment = req.params.idPayment
    payment.findOne({ where: { id: idPayment } }).then(pay => {
        res.status(200).json(pay)
    }
    ).catch(err => {
        res.status(400).json(err)
    })
})

router.get('/payment/byOrder/:idOrder', (req, res) => {

    let idOrder = req.params.idOrder
    payment.findOne({ where: { pedidoId: idOrder } }).then(pay => {
        res.status(200).json(pay)
    }
    ).catch(err => {
        res.status(400).json(err)
    })
})


//Aceite ou recusa do comprovante
router.patch('/payment', (req, res) => {

})


module.exports = router