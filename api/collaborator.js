const express = require('express')
const router = express.Router()
const sequelize = require('sequelize')

//Hash
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

//Models
const category = require('../models/category')
const subCategory = require('../models/subCategory')
const collaborators = require('../models/collaborator')

//Validation
let validate = require('../validations/collaboratorValidation')
const cnpjCpfValidation = require('../validations/cnpjCpfValidation')

//JWT
const jwt = require('jsonwebtoken')
const SECRET = '506982d8e910609e3bb8f54e3cff6f61'

//Middleware
const authCollaborator = (req, res, next) => {

    if (res.locals.collaborator) {
        next()
    } else {
        console.log(req.headers)
        const token = req.headers['authorization'].split(' ')[1]
        if (token) {
            jwt.verify(token, SECRET, (err, decoded) => {
                if (!err) {
                    console.log(decoded)
                    res.locals.collaborator = decoded
                    next()
                } else {
                    res.json(err)
                    console.log(err)                    
                }
            })
        }
    }
}

//Consulta clientes
router.get('/api/collaborator/:name?', authCollaborator, async (req, res) => {
    let name = `%${req.params.name}%`;
    console.log('Rota /api/collaborator/:name?', res.locals.collaborator)
    let clts = undefined
    try {

        if (req.params.name != undefined && req.params.name != 'all') {
            clts = await collaborators.findAll({ where: { nome: { [sequelize.Op.like]: name } } })
        } else {
            clts = await collaborators.findAll()
        }
        res.statusCode = 200
        res.json({clts,collaborator:res.locals.collaborator})

    } catch (error) {
        res.statusCode = 400
        res.send('Erro ao tentar localizar os clientes')
    }
})


//Retorna um determinado cliente através do id
router.get('/collaborators/collaborator/:id?',authCollaborator, async (req, res) => {
    let data = req.body;

    try {
        if (req.params.id) {

            data = await collaborators.findByPk(req.params.id)

            res.statusCode = 200
            res.json(data)
        }
    } catch (error) {
        res.statusCode = 400
        res.send('Erro ao tentar localizar o colaborador pelo id')
    }

})

//Localiza cliente pelo email e realiza a comparação de senha
router.post('/api/collaborator/login', async (req, res) => {

    let data = req.body;
    let comparator = false;

    try {

        let clb = await collaborators.findOne({ where: { email: data.email } })

        if (clb) {

            comparator = bcrypt.compareSync(data.password, clb.password);

            if (comparator) {

                jwt.sign({
                    id: clb.id,
                    email: clb.email,
                    nome: clb.nome
                }, SECRET, { expiresIn: '1h' }, (err, token) => {
                    if (!err) {
                        res.statusCode = 200
                        res.json({ token })
                    } else {
                        res.statusCode = 400
                        res.json({ err })
                    }
                })


            } else {
                res.statusCode = 400
                res.json({ err: 'Senha Incorreta' })
            }

        } else {
            res.statusCode = 400
            res.json({ err: 'Email não encontrado' })
        }
    } catch (error) {
        res.statusCode = 400
        res.json({ err: 'Erro ao tentar realizar consulta do colaborador.' })
    }

})

//Criação
router.post('/collaborators', async (req, res) => {
    let data = req.body;

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

    if (validResult.error) {
        res.statusCode = 400
        res.send(validResult.error)
    }

    if (cnpjCpfValidation.cpfValidation(data.cnpjCpf)) validCnpjCpf = true
    if (cnpjCpfValidation.cnpjValidation(data.cnpjCpf)) validCnpjCpf = true

    try {
        let validCnpjCpf = undefined

        if (data.id > 0) {
            validCnpjCpf = await collaborators.findOne({ where: { cnpjCpf: data.cnpjCpf, id: { [sequelize.Op.not]: data.id } } })
        } else {
            validCnpjCpf = await collaborators.findOne({ where: { cnpjCpf: data.cnpjCpf } })
        }

        if (validCnpjCpf) {
            res.statusCode = 400
            res.send('CnpjCpf já cadastrado no sistema')
        }
    } catch (error) {
        res.statusCode = 400
        res.send('Erro ao tentar buscar colaboradores pelo cpf')
    }

    try {
        let validEmail = undefined

        if (data.id > 0) {
            validCnpjCpf = await collaborators.findOne({ where: { email: data.email, id: { [sequelize.Op.not]: data.id } } })
        } else {
            validCnpjCpf = await collaborators.findOne({ where: { email: data.email } })
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

            let clb = await collaborators.create({
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

            res.statusCode = 200
            res.json(clb)

        } else {

            collaborators.update({
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
                res.send('Erro ao tentar alterar o colaborador')
            })
        }
    } catch (error) {
        res.statusCode = 400
        res.send('Erro')
    }
})


//Deleção 
router.delete('/collaborator/:id', async (req, res) => {
    let id = req.params.id

    try {
        let response = await collaborators.destroy({
            where: {
                id: id
            }
        })

        res.statusCode = 200
        res.json(response)

    } catch (error) {

        res.statusCode = 400
        res.send('Erro ao tentar excluir colaborador')

    }

})

module.exports = router;