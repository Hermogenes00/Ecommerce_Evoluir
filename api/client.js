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


const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)


const fs = require('fs')

const cnpjCpfValidation = require('../validations/cnpjCpfValidation')

//Sequelize
const sequelize = require('sequelize')

//Módulo para gerenciar arquivos
const tratarArquivo = require('../utils/trataArquivo')

const CONSTANTES = require('../utils/constants')

//Validação
let validate = require('../validations/clientValidation')


//API DOS CORREIORS
const Correios = require('node-correios')

//MULTER Necessário para fazer upload
const multer = require('multer')
const path = require('path');
const client = require('../models/client');



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

//Pegar cliente pelo id
router.get('/client/:id', (req, res) => {

    let id = req.params.id

    clients.findByPk(id).then(cl => {
        res.statusCode = 200
        res.json(cl)
    }).catch(err => {
        res.statusCode = 400
    })
})

//Listar todos os clientes
router.get('/client', (req, res) => {
    clients.findAll().then(clts => {
        res.statusCode = 200
        res.json(clts)
    }).catch(err => {
        res.statusCode = 400
    })
})

//Criação
router.post('/client', async (req, res) => {
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
        res.statusCode = 400
        res.send('Cnpj/Cpf inválido')
    }

    if (validResult.error) {
        res.statusCode = 400
        res.send(validResult.error.details[0].message)
    }

    try {
        let validCnpjCpf = undefined

        if (data.id > 0) {
            validCnpjCpf = await clients.findOne({ where: { cnpjCpf: data.cnpjCpf, id: { [sequelize.Op.not]: data.id } } })
        } else {
            validCnpjCpf = await clients.findOne({ where: { cnpjCpf: data.cnpjCpf } })
        }

        if (validCnpjCpf) {
            res.statusCode = 400
            res.send('CnpjCpf já cadastrado no sistema')
        }
    } catch (error) {
        res.statusCode = 400
        res.send('Erro ao tentar buscar clientes pelo cpf')
    }


    try {
        let validEmail = undefined

        if (data.id > 0) {
            validCnpjCpf = await clients.findOne({ where: { email: data.email, id: { [sequelize.Op.not]: data.id } } })
        } else {
            validCnpjCpf = await clients.findOne({ where: { email: data.email } })
        }

        if (validEmail) {
            res.statusCode = 400
            res.send('Email já cadastrado no sistema')
        }

    } catch (error) {
        res.statusCode = 400
        res.send('Erro ao tentar buscar colaboradores pelo email')
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

            res.statusCode = 200
            res.json(client)

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
            }, { where: { id: data.id } }).then((response) => {

                res.statusCode = 200
                res.json(response)

            }).catch(error => {
                res.statusCode = 400
                res.send('Erro ao tentar alterar o cliente')
            })
        }
    } catch (error) {
        res.statusCode = 400
    }

})

//Busca todos os itens que estejam vinculados ao cliente, bem como todos os endereços do cliente
router.get('/client/cart/:idClient', clientAuthentication, async (req, res) => {

    let idClient = req.params.idClient

    try {
        let objOrders = await orders.findOne({
            where: { clienteId: idClient, status: CONSTANTES.STATUS_PEDIDO.CARRINHO },
            include: [{ model: clients }, { model: itensOrder }, { model: address }]
        });

        let adr = await address.findAll({ where: { clienteId: idClient } })

        res.statusCode = 200
        res.json({ objOrders, adr })

    } catch (error) {
        res.statusCode = 400
        res.send('Erro ao tentar buscar pedidos')
    }

})

//Localiza todos os pedidos de um cliente, que não esteja com o status de 'carrinho'
router.get('/client/orders/:idClient', clientAuthentication, async (req, res) => {

    let idClient = req.params.idClient

    try {
        let objOrders = await orders.findAll({
            where: {
                clienteId: idClient,
                status: { [sequelize.Op.ne]: CONSTANTES.STATUS_PEDIDO.CARRINHO }
            }
        });

        res.statusCode = 200
        res.json({ objOrders, adr })

    } catch (error) {
        res.statusCode = 400
        res.send('Erro ao tentar buscar pedidos')
    }
})



//Delete
router.delete('/order/cancel', clientAuthentication, async (req, res) => {

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