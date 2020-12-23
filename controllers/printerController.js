const express = require('express')
const router = express.Router()

//Model
const printer = require('../models/printer')

//Middleware Authentication
const collaboratorAuthentication = require('../middleware/collaboratorAuthentication')



//Rotas
router.get('/printers', collaboratorAuthentication, (req, res) => {
    res.send('Bem vindo a página de gerenciamento de impressoras....')
})

router.get('/printers/printer/:id?', collaboratorAuthentication, (req, res) => {
    res.send('Bem vindo a página de gerenciamento de impressoras....')
})

router.post('/printers/save', collaboratorAuthentication, (req, res) => {
    res.send('Bem vindo a página de gerenciamento de impressoras....')
})










module.exports = router