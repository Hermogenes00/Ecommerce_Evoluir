const express = require('express')
const router = express.Router();

//Models
const clients = require('../models/client')
const orders = require('../models/order');
const itensOrder = require('../models/itensOrder')
const category = require('../models/category')
const subCategory = require('../models/subCategory')
const address = require('../models/address')
const payment = require('../models/payment')
const products = require('../models/product')


const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)


const fs = require('fs')

const cnpjCpfValidation = require('../validations/cnpjCpfValidation')

//Sequelize
const sequelize = require('sequelize')

//Módulo para gerenciar arquivos
const tratarArquivo = require('../utils/trataArquivo')

const CONSTANTES = require('../utils/constants')

//Autenticação
const clientAuthentication = require('../middleware/clientAuthentication');
const defaultAuthentication = require('../middleware/defaultAuthentication');

//Validação
let validate = require('../validations/clientValidation')


//API DOS CORREIORS
const Correios = require('node-correios')

//MULTER Necessário para fazer upload
const multer = require('multer')
const path = require('path');
const { date } = require('joi');



//Configuração do Multer - Para realização de upload e download
let enderecoImagem = undefined;


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        enderecoImagem = file.originalname + '-' + Date.now() + path.extname(file.originalname)
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
router.post('/client/upload/:item', upload.single('file'), clientAuthentication, async (req, res) => {
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

            if (enderecoImagem) {
                await itensOrder.update({ arquivo: enderecoImagem }, { where: { id: idItem } })
                enderecoImagem = null
            }

            res.redirect('/client/cart')
        }

    } catch (error) {
        console.log(error);
        res.json(error)
    }

})

router.get('/clients/client/:id?', defaultAuthentication, async (req, res) => {

    let clt = req.body;
    let msg = req.flash('error')

    try {
        if (req.session.client) {
            clt = await clients.findByPk(req.session.client.id)
        }
    } catch (error) {
        console.log('Erro ao tentar carregar o client->', error);
    }

    res.render('admin/clients/client', { clt, msg })
})


router.post('/client/save', defaultAuthentication, async (req, res) => {
    let data = req.body
    let msg = []
    let validCnpjCpf = false;

    //#region Validação
    let validResult = validate.validate({
        nome: data.nome,
        cnpjCpf: data.cnpjCpf,
        email: data.email,
        password: data.password,
        tel: data.tel,
        cel1: data.cel1,
        cel2: data.cel2,
        cep: data.cep,
        numero: data.numero
    })

    if (cnpjCpfValidation.cpfValidation(data.cnpjCpf)) validCnpjCpf = true
    if (cnpjCpfValidation.cnpjValidation(data.cnpjCpf)) validCnpjCpf = true

    if (!validCnpjCpf) {
        msg.push('Cnpj/Cpf inválido')
        return res.render('admin/clients/client', { clt: data, msg })
    }

    if (validResult.error) {
        msg.push(validResult.error.details[0].message)
        return res.render('admin/clients/client', { clt: data, msg })
    }

    try {
        let validCnpjCpf = undefined

        if (data.id > 0) {
            validCnpjCpf = await clients.findOne({ where: { cnpjCpf: data.cnpjCpf, id: { [sequelize.Op.not]: data.id } } })
        } else {
            validCnpjCpf = await clients.findOne({ where: { cnpjCpf: data.cnpjCpf } })
        }

        if (validCnpjCpf) {
            msg.push('CnpjCpf já cadastrado no sistema')
            return res.render('admin/clients/client', { clt: data, msg })
        }
    } catch (error) {
        console.log('Erro ao tentar buscar clientes pelo cpf->', error);
        return res.render('admin/clients/client', { clt: data, msg })
    }


    try {
        let validEmail = undefined

        if (data.id > 0) {
            validCnpjCpf = await clients.findOne({ where: { email: data.email, id: { [sequelize.Op.not]: data.id } } })
        } else {
            validCnpjCpf = await clients.findOne({ where: { email: data.email } })
        }

        if (validEmail) {
            msg.push('Email já cadastrado no sistema')
            return res.render('admin/collaborators/collaborator', { collaborator: data, msg })
        }

    } catch (error) {
        console.log('Erro ao tentar buscar colaboradores pelo email->', error);
        return res.render('admin/collaborators/collaborator', { collaborator: data, msg })
    }
    //#endregion

    try {
        if (data.id <= 0) {

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
                complemento: data.complemento,
                cidade: data.cidade,
                uf: data.uf
            })

            await address.create({
                cep: data.cep,
                cidade: data.cidade,
                uf: data.uf,
                rua: data.rua,
                bairro: data.bairro,
                numero: data.numero,
                complemento: data.complemento,
                clienteId: client.id
            })

            req.session.client = undefined;
            //Cria uma sessão                
            req.session.client = {
                id: client.id,
                nome: client.nome,
                email: client.email
            }
            return res.redirect('/')
        } else {

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
                complemento: data.complemento,
                uf: data.uf,
                cidade: data.cidade
            }, { where: { id: data.id } }).then(() => {
                return res.redirect('/client/logout')
            }).catch(error => {
                console.log('Erro ao tentar alterar cliente', error);
                return res.render('admin/clients/client', { clt: data, msg })
            })
        }
    } catch (error) {
        return res.redirect('/')
    }

})

router.get('/client/login', defaultAuthentication, (req, res) => {

    let msg = req.flash('erro')
    res.render('admin/clients/login', { msg: msg })
})


router.post('/client/login', defaultAuthentication, (req, res) => {
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
            req.flash('erro', 'Erro ao realizar o login, verifique seu usuário e senha')
            res.redirect('/client/login')
        }
    }).catch(erro => {
        req.flash('erro', 'Erro ao realizar o login, verifique seu usuário e senha')
        console.log('Erro ao tentar logar ' + erro);
        res.redirect('/client/login')
    })
})



router.get('/client/logout', defaultAuthentication, (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

router.get('/client/cart', clientAuthentication, async (req, res) => {

    let idClient = req.session.client.id;

    let message = {
        error: req.flash('error'),
        success: req.flash('success'),
        metodoEnvio: req.flash('metodoEnvio')
    }

    try {
        let objOrders = await orders.findOne({
            where: { clienteId: idClient, status: CONSTANTES.STATUS_PEDIDO.CARRINHO },
            include: [{ model: clients }, { model: itensOrder }, { model: address }]
        });

        let adr = await address.findAll({ where: { clienteId: req.session.client.id } })

        res.render('admin/cart/cart', { ord: objOrders, message: message, address: adr })
    } catch (error) {
        console.log('Erro ao buscar pedidos: ' + error)
        res.send('Erro ' + error)
    }

})

router.get('/client/orders/:dateStart?/:dateFinish?/:status?', clientAuthentication, async (req, res) => {

    let idClient = req.session.client.id;
    let { dateStart, dateFinish, status } = req.params
    let objOrders = undefined

    let message = {
        error: req.flash('error'),
        success: req.flash('success')
    }

    try {
        if (dateStart && dateFinish && status) {
            console.log('=======CHEGOU NA FILTRAGEM===========')
            objOrders = await orders.findAll({
                where: {
                    createdAt: {
                        [sequelize.Op.between]: [new Date(dateStart), new Date(dateFinish)]
                    },
                    status: { [sequelize.Op.like]: [`%${status}%`] }
                }
            })

            console.log(objOrders)
        } else {
            console.log('=======CHEGOU NO SEM FILTRAGEM===========')
            
            objOrders = await orders.findAll({
                where: {
                    clienteId: idClient,
                    status: { [sequelize.Op.ne]: CONSTANTES.STATUS_PEDIDO.CARRINHO },
                }, include: [{ model: payment }, { model: itensOrder }], order: [['createdAt', 'desc']]
            });
        }
        res.render('admin/order/orders', { orders: objOrders, message: message })
    } catch (error) {
        console.log('Erro ao buscar pedidos: ' + error)
        res.send('Erro ' + error)
    }
})

router.post('/order/cancel', clientAuthentication, async (req, res) => {

    let data = req.body
    let ord = {}
    try {

        //Removendo os arquivos da pasta upload do servidor
        itensOrder.findAll({ where: { pedidoId: data.idOrder } }).then(itens => {
            itens.forEach(item => {
                tratarArquivo.removerArquivo(item.arquivo, flag => {
                    if (flag) {
                        console.log('Arquivo removido com sucesso');
                    }
                })
            })
        })

        //Atualizando o status do pedido
        ord = await orders.update({
            status: CONSTANTES.STATUS_PEDIDO.CANCELADO
        }, {
            where: { id: data.idOrder }
        })

        //Removendo o pedido da tabela de pagamentos
        payment.destroy({ where: { pedidoId: data.idOrder } }).then(() => {
            console.log('Pagamento excluído');
        }).catch(err => {
            console.log('Erro ao tentar excluir o pagamento---' + err)
        })

        res.redirect('/client/orders')
    } catch (error) {
        console.log('Erro ao tentar cancelar o pedido: ' + error);
        res.json(ord)
    }

})


module.exports = router