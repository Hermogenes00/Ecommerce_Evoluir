const express = require('express')
const router = express.Router();

//Models
const clients = require('../../models/client')
const orders = require('../../models/order');
const itensOrder = require('../../models/itensOrder')
const category = require('../../models/category')
const subCategory = require('../../models/subCategory')
const address = require('../../models/address')
const payment = require('../../models/payment')
const products = require('../../models/product')



//constantes
const constant = require('../../utils/constants')

//Axios
const axios = require('axios')
const axiosConfig = {
    proxy: {
        port: constant.PORTA
    }
}


//Email
const nodemailer = require('nodemailer')

const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

const fs = require('fs')

const cnpjCpfValidation = require('../../validations/cnpjCpfValidation')

//Sequelize
const sequelize = require('sequelize')

//Módulo para gerenciar arquivos
const tratarArquivo = require('../../utils/trataArquivo')

//Autenticação
const collaboratorAuthentication = require('../../middleware/collaboratorAuthentication')

//Validação
let validate = require('../../validations/clientValidation')
let recoverAccount = require('../../validations/recoverAccountValidate')

//API DOS CORREIORS
const Correios = require('node-correios')

//MULTER Necessário para fazer upload
const multer = require('multer')
const path = require('path');

//Configuração do Multer - Para realização de upload e download
let enderecoImagem = undefined;


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        enderecoImagem = file.originalname.replace(path.extname(file.originalname), '') + '-' + Date.now() + path.extname(file.originalname)
        cb(null, enderecoImagem)
    }
}
)


let upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log('Nome do arquivo---------' + file.originalname);
        if (path.extname(file.originalname) == '.pdf') {
            req.flash('success', `Arquivo enviado com sucesso`)
            cb(null, true)
        } else {
            req.flash('error', 'Arquivo deve estar em extensão .pdf')
            cb(null, false)
        }
    }
})


//Routes
router.get('/main/clients/:client?', collaboratorAuthentication, async (req, res) => {

    let client = `%${req.params.client}%`;

    let clts = undefined
    try {

        if (req.params.client != undefined && req.params.client != 'all') {
            clts = await clients.findAll({ where: { nome: { [sequelize.Op.like]: client } } })
        } else {
            clts = await clients.findAll()
        }

        res.render('admin/main/clients/clients', { clients: clts })

    } catch (error) {
        res.json(error)
    }
})

router.get('/main/client', collaboratorAuthentication, (req, res) => {

    let client = {}
    res.render('admin/main/clients/client', client)

})



module.exports = router