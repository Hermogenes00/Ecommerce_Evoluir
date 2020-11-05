const express = require('express')
const router = express.Router();
const clients = require('../models/client')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)
const orders = require('../models/order');
const clientAuthentication = require('../middleware/clientAuthentication');
const defaultAuthentication = require('../middleware/defaultAuthentication');

router.get('/client/register', (req, res) => {
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
        if (bcrypt.compare(data.password, client.password)) {
            req.session.client = {
                id: client.id,
                nome: client.nome,
                email: client.email
            }
            res.redirect('/')
        }
    }).catch(erro => {
        console.log('Erro ao tentar logar ' + erro);
        res.redirect('/client/register')
    })
})

router.post('/client/update', clientAuthentication, (req, res) => {
    res.send('Rota para salvar as edições')
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