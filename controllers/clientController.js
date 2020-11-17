const express = require('express')
const router = express.Router();
const clients = require('../models/client')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)
const orders = require('../models/order');
const itensOrder = require('../models/itensOrder')
const fs = require('fs')

//Autenticação
const clientAuthentication = require('../middleware/clientAuthentication');
const defaultAuthentication = require('../middleware/defaultAuthentication');

//API DOS CORREIORS
const Correios = require('node-correios')

//MULTER Necessário para fazer upload
const multer = require('multer')
const path = require('path')


//Configuração do Multer - Para realização de upload e download
let enderecoImagem = undefined;


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        
        if (path.extname(file.originalname) == '.pdf') {
            enderecoImagem = file.originalname + '-' + Date.now() + path.extname(file.originalname)
        } else {
            enderecoImagem = null
        }

        cb(null, enderecoImagem)
    }
})

let upload = multer({ storage: storage })


//Rotas

router.get('/buscarCep/:cep', async (req, res) => {
    let cep = req.params.cep;
    args = {
        cep: cep
    }

    let correio = new Correios();

    try {
        let result = await correio.consultaCEP(args);
        console.log('Encontrou----------- ' + result);
        res.json(result)
    } catch (error) {
        console.log('Erro ao tentar buscar o cep----------- ' + error);
        res.json({})
    }

})

router.post('/client/upload/:item', upload.single('file'), async (req, res) => {
    let idItem = req.params.item;

    try {

        let itemOrder = await itensOrder.findOne({ where: { id: idItem } })
        if (itemOrder) {
            if (itemOrder.arquivo) {
                fs.unlink('public/uploads/' + itemOrder.arquivo, (err) => {
                    if (err) {
                        console.log('Erro ao tentar excluir o arquivo->' + err);
                    }
                })
            }

            await itensOrder.update({ arquivo: enderecoImagem }, { where: { id: idItem } })

            res.redirect('/client/order')
        }

    } catch (error) {
        res.json(error)
    }

})

router.get('/client/register', defaultAuthentication, (req, res) => {
    res.render('admin/client/new')
})

router.post('/client/save', defaultAuthentication, async (req, res) => {

    let data = req.body;
    let validation = false;

    for (client in data) {
        if (data[client] != null) {
            validation = true;
        }
    }

    if (validation) {
        try {
            let client = await clients.create({
                email: data.email,
                nome: data.nome,
                password: bcrypt.hashSync(data.password, salt),
                cnpjCpf: data.cnpjCpf,
                tel: data.tel,
                cel1: data.cel1,
                cel2: data.cel2,
                cep: data.cep,
                rua: data.rua,
                bairro: data.bairro,
                numero: data.numero,
                complemento: data.complemento
            })

            if (client) {
                req.session.client = undefined;
                //Cria uma sessão                
                req.session.client = {
                    id: client.id,
                    nome: client.nome,
                    email: client.email
                }
                res.redirect('/')
            } else {
                console.log('Erro ao tentar registrar o cliente');
                res.redirect('/client/register')
            }
        } catch (error) {
            console.log('Erro ao tentar registrar o cliente: ' + error);
            res.redirect('/client/register')
        }
    }

})

router.get('/client/login', defaultAuthentication, (req, res) => {
    res.render('admin/client/login')
})

router.get('/client/logout', defaultAuthentication, (req, res) => {
    req.session.client = undefined;
    res.redirect('/')
})

router.post('/client/acesso', defaultAuthentication, (req, res) => {
    req.session.client = undefined;
    let data = req.body;

    clients.findOne({
        where: {
            email: data.email
        }

    }).then(client => {
        let compare = bcrypt.compareSync(data.password, client.password)
        console.log('Resultado da comparação----' + compare);
        if (compare) {
            req.session.client = {
                id: client.id,
                nome: client.nome,
                email: client.email
            }
            res.redirect('/')
        } else {
            res.redirect('/client/login')
        }
    }).catch(erro => {
        console.log('Erro ao tentar logar ' + erro);
        res.redirect('/client/login')
    })
})

router.post('/client/update', clientAuthentication, (req, res) => {
    let id = req.session.client.id;
    let data = req.body
    clients.update({
        email: data.email,
        nome: data.nome,
        cnpjCpf: data.cnpjCpf,
        tel: data.tel,
        cel1: data.cel1,
        cel2: data.cel2,
        cep: data.cep,
        rua: data.rua,
        bairro: data.bairro,
        numero: data.numero,
        complemento: data.complemento
    }, { where: { id: id } }).then(client => {
        req.session.client = {
            id: id,
            nome: data.nome,
            email: data.email
        }
        res.redirect('/client/order')
    }).catch(error => {
        console.log(error);
        res.send(`Ops, ocorreu um erro ao tentar realizar esta operação, tente novamente,
        caso o problema persista entre em contato com o suporte`)
    })
})

router.get('/client/edit', clientAuthentication, (req, res) => {
    let id = req.session.client.id;

    clients.findByPk(id).then(client => {
        res.render('admin/client/edit', { user: client })
    }).catch(error => {
        console.log(error);
        res.send(`Ops, ocorreu um erro ao tentar realizar esta operação, tente novamente,
         caso o problema persista entre em contato com o suporte`)
    })

})
router.get('/client/order', clientAuthentication, async (req, res) => {

    let idClient = req.session.client.id;

    try {
        let objOrders = await orders.findAll({ where: { clienteId: idClient } });
        res.render('admin/order/orders', { orders: objOrders })
    } catch (error) {
        console.log('Erro ao buscar pedidos: ' + error);
        res.send('Erro ' + error)
    }
})

module.exports = router