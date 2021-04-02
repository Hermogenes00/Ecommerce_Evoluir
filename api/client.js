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

//Email
const nodemailer = require('nodemailer')

//Validação
let validate = require('../validations/clientValidation')

//JWT Client
let jwtClient = require('../jwtValidation/jwtClient')

//API DOS CORREIORS
const Correios = require('node-correios')

//MULTER Necessário para fazer upload
const multer = require('multer')
const path = require('path');

//API Authentication
const apiAuthentication = require('../middleware/apiAuthentication');


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
})

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

//Esta rota servirá para autenticar o client, e gerar o token, para consumir as das demais rotas...
router.post('/client/login', async (req, res) => {

    let data = req.body

    try {
        let client = await clients.findOne({
            where: {
                email: data.email
            }
        })
        if (client) {
            let compare = bcrypt.compareSync(data.password, client.password)
            if (compare) {
                //Retorna o token, para clientes externos poderem consumir a api
                jwtClient.sign({ id: client.id, nome: client.nome, email: client.email }, (err, token) => {
                    if (!err) {
                        res.json({ err, token, id: client.id, nome: client.nome, email: client.email })
                    } else {
                        res.json({ err, token: null })
                    }
                })
            } else {
                res.json({ err: 'Erro ao tentar consultar a api', tokenFalso: null })
            }
        } else {
            res.json({ err: 'Cliente não encontrado', tokenFalso: null })
        }
    } catch (error) {
        console.log(error)
        res.json({ error: '' + error })
    }
})


//Listar todos os clientes
router.get('/clients/:client?', async (req, res) => {

    let client = `%${req.params.client}%`;
    let response = undefined
    try {
        if (req.params.client) {
            response = await clients.findAll({ where: { nome: { [sequelize.Op.like]: client } } })
        } else {
            response = await clients.findAll()
        }
        res.json({ clts: response })

    } catch (error) {
        res.status(400).json({ err: '' + error })
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


//Criação
router.post('/client', async (req, res) => {
    let data = req.body
    let msg = []
    let err = null

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
        err = 'Cnpj/Cpf inválido'
    }
    if (validResult.error) {
        err = validResult.error.details[0].message
    }

    try {

        let findByCnpjCpf = undefined

        if (data.id > 0) {
            findByCnpjCpf = await clients.findOne({ where: { cnpjCpf: data.cnpjCpf, id: { [sequelize.Op.not]: data.id } } })
        } else {
            findByCnpjCpf = await clients.findOne({ where: { cnpjCpf: data.cnpjCpf } })
        }

        if (findByCnpjCpf) {
            err = 'Cnpj/Cpf já cadastrado'
        }
    } catch (error) {
        err = 'Erro ao tentar buscar clientes pelo cpf'
    }

    try {
        let validEmail = undefined

        if (data.id > 0) {
            validEmail = await clients.findOne({ where: { email: data.email, id: { [sequelize.Op.not]: data.id } } })
        } else {
            validEmail = await clients.findOne({ where: { email: data.email } })
        }

        if (validEmail) {
            err = 'Email já cadastrado no sistema'
        }

    } catch (error) {
        err = 'Erro ao tentar buscar colaboradores pelo email'
    }
    //#endregion

    try {
        if (data.id <= 0 || typeof data.id == 'undefined') {

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
        } else {
            err = 'Id já vinculado a um cliente'
        }
    } catch (error) {
        err = error
    }

    console.log('' + err)
    let statusCode = err ? 400 : 200
    res.statusCode = 200
    res.json({ err: '' + err })
})

//Update Client
router.put('/client', async (req, res) => {

    let data = req.body
    let err = null
    let returnObj = null
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
        err = 'Cnpj/Cpf inválido'
    }
    if (validResult.error) {
        err = validResult.error.details[0].message
    }

    try {

        let findByCnpjCpf = undefined
        //Search client by cnpj or cpdf
        if (data.id > 0) {
            findByCnpjCpf = await clients.findOne({ where: { cnpjCpf: data.cnpjCpf, id: { [sequelize.Op.not]: data.id } } })
        } else {
            findByCnpjCpf = await clients.findOne({ where: { cnpjCpf: data.cnpjCpf } })
        }

        if (findByCnpjCpf) {
            err = 'Cnpj/Cpf já cadastrado'
        }
    } catch (error) {
        err = 'Erro ao tentar buscar clientes pelo cpf'
    }

    try {
        let validEmail = undefined

        //Search client by email for validation
        if (data.id > 0) {
            validEmail = await clients.findOne({ where: { email: data.email, id: { [sequelize.Op.not]: data.id } } })
        } else {
            validEmail = await clients.findOne({ where: { email: data.email } })
        }

        if (validEmail) {
            err = 'Email já cadastrado no sistema'
        }

    } catch (error) {
        err = 'Erro ao tentar buscar colaboradores pelo email'
    }

    try {
        console.log('CHEGOU NA API')
        returnObj = await clients.update({
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
        }, { where: { id: data.id } })
    } catch (error) {
        err = error
    }

    let codStatus = err ? 400 : 200
    res.statusCode = codStatus

    res.json({ err, returnObj })

})

/**
 * Busca todos os itens que estejam vinculados ao cliente
 * bem como todos os endereços do cliente, somente status de CARRINHO
 * Retorna também a listagem de endereços do cliente
 */
router.get('/client/cart/:idClient', async (req, res) => {

    let { idClient } = req.params

    try {
        let objOrders = await orders.findOne({
            where: { clienteId: idClient, status: CONSTANTES.STATUS_PEDIDO.CARRINHO },
            include: [{ model: clients }, { model: itensOrder }, { model: address }]
        });

        res.statusCode = 200
        res.json({ objOrders })

    } catch (error) {
        res.statusCode = 400
        res.json({ error })
    }

})

//Localiza todos os pedidos de um cliente, que não esteja com o status de 'carrinho'
router.get('/client/orders/:idClient', async (req, res) => {

    let idClient = req.params.idClient

    try {
        let result = await orders.findAll({
            where: {
                clienteId: idClient,
                status: { [sequelize.Op.ne]: CONSTANTES.STATUS_PEDIDO.CARRINHO }
            }
        });

        res.statusCode = 200
        res.json(result)

    } catch (error) {
        res.statusCode = 400
        res.send('Erro ao tentar buscar pedidos')
    }
})



//Delete
router.delete('/order/:idOrder', async (req, res) => {

    let { idOrder } = req.params
    let ord = {}
    try {

        //Removendo os arquivos da pasta upload do servidor
        itensOrder.findAll({ where: { pedidoId: idOrder } }).then(itens => {
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
            where: { id: idOrder }
        })

        //Removendo o pedido da tabela de pagamentos
        payment.destroy({ where: { pedidoId: idOrder } }).then(() => {
            console.log('Pagamento excluído');
        }).catch(err => {
            res.status(400).send('Erro ao tentar excluir o pagamento, pedido ' + idOrder)
        })

        res.status(200).json(ord)

    } catch (error) {
        res.status(400).send('Erro ao tentar cancelar o pedido ' + idOrder)
    }

})

//Envia email para o cliente, seta também um código de segurança para a redefinição de senha
router.post('/client/sendEmailByPassword', async (req, res) => {
    let err = null
    let infoEmail = null
    let { sender, recipient } = req.body
        
    try {

        let objClient = await clients.findOne({ where: { email: email } })

        if (objClient.email) {

            //Generate hash by cnpjCpf
            let hash = bcrypt.hashSync(objClient.cnpjCpf, salt)

            //Update codigoSegurança through cnpjCpf
            await clients.update({ codigoSeguranca: hash.slice(7, 12) }, { where: { id: objClient.id } })

            //Send email
            let transporter = nodemailer.createTransport({
                host: sender.host,
                port: sender.port,
                secure: false,
                auth: {
                    user: sender.email,
                    pass: sender.password
                }
            })

            transporter.sendMail({
                from: sender.email,
                to: recipient.email,
                subject: 'Redefinição de Senha',
                html:
                    `<h5">Este é o seu codigo de segurança para recuperação de sua conta. Não forneça esta informação a terceiros.</h5>
                 <h1>${hash.slice(7, 12)}</h1>
                <p><a href="http://localhost:${process.env.PORT}/client/recoverAccount/">Clique aqui para prosseguir com a recuperação da sua conta.</a></p>
                 `

            }, (error, info) => {
                err = error
                infoEmail = info
            })
        }

    } catch (error) {
        err = error        
    }

    res.json({ err, infoEmail })

})

module.exports = router