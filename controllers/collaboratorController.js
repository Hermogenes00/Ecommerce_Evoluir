const express = require('express')
const router = express.Router()
const sequelize = require('sequelize')

//Middleware Authentication
const collaboratorAuthentication = require('../middleware/collaboratorAuthentication')

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

//Criação do middleware para menu
router.use(async (req, res, next) => {
    try {
        res.locals.menu = await category.findAll({ include: subCategory })
    } catch (error) {
        console.log('Erro ao tentar consultar as categorias->' + error);
    }
    next()
})

router.get('/admin/collaborators/perfil', collaboratorAuthentication, async (req, res) => {

    let collaborator = await collaborators.findByPk(req.session.collaborator.id)
    if (collaborator) {
        res.render('admin/collaborators/perfil', { collaborator: collaborator })
    } else {
        res.redirect('/main')
    }
})

router.get('/collaborator/login', (req, res) => {
    if (req.session.collaborator) {
        res.redirect('/main')
    } else {
        res.render('admin/collaborators/login')
    }

})

router.post('/collaborator/login', async (req, res) => {
    let data = req.body;
    let comparator = false;

    try {
        let clb = await collaborators.findOne({ where: { email: data.email } })

        if (clb) {
            
            comparator = bcrypt.compareSync(data.password, clb.password);
            
            if (comparator) {

                req.session.collaborator = {
                    id: clb.id,
                    nome: clb.nome,
                    email: clb.email
                }

                res.redirect('/main')
            } else {
                res.redirect('/collaborator/login')
            }

        } else {
            res.redirect('/collaborator/login')
        }
    } catch (error) {
        console.log('Erro ao tentar logar colaborador------' + error);
    }

})


router.post('/collaborator/delete', collaboratorAuthentication, async (req, res) => {
    let data = req.body;

    try {
        await collaborators.destroy({
            where: {
                id: data.id
            }
        })

        res.redirect('/collaborator/find/all');
    } catch (error) {
        res.redirect('/collaborator/find/all');
        console.log('Erro ao tentar excluir colaborador->' + error);
    }

})


router.get('/admin/collaborators/collaborator/:id?', collaboratorAuthentication, async (req, res) => {
    let data = req.body;
    let msg = []

    try {
        if (req.params.id) {
            data = await collaborators.findByPk(req.params.id)
            res.render('admin/collaborators/collaborator', { collaborator: data, msg })
        } else {
            res.render('admin/collaborators/collaborator', { collaborator: data, msg })
        }
    } catch (error) {
        console.log('Erro ao tentar consultar colaborador pelo id->', error);
        res.render('admin/collaborators/collaborator', { collaborator: data, msg })
    }

})

router.post('/admin/collaborators/collaborator', async (req, res) => {
    let data = req.body;
    let msg = []

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
        msg.push(validResult.error.details[0].message)
        return res.render('admin/collaborators/collaborator', { collaborator: data, msg })
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
            msg.push('CnpjCpf já cadastrado no sistema')
            return res.render('admin/collaborators/collaborator', { collaborator: data, msg })
        }
    } catch (error) {
        console.log('Erro ao tentar buscar colaboradores pelo cpf->', error);
        return res.render('admin/collaborators/collaborator', { collaborator: data, msg })
    }

    try {
        let validEmail = undefined

        if (data.id > 0) {
            validCnpjCpf = await collaborators.findOne({ where: { email: data.email, id: { [sequelize.Op.not]: data.id } } })
        } else {
            validCnpjCpf = await collaborators.findOne({ where: { email: data.email } })
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
            return res.redirect('/main')
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
            }, { where: { id: data.id } }).then(() => {
                return res.redirect('/collaborator/logout')
            }).catch(error => {
                console.log('Erro ao tentar alterar o colaborador', error);
                return res.render('admin/collaborators/collaborator', { collaborator: data, msg })
            })
        }
    } catch (error) {
        console.log(error);
        return res.redirect('/')
    }
})

router.get('/collaborator/logout', collaboratorAuthentication, (req, res) => {

    req.session.collaborator = undefined;

    res.redirect('/collaborator/login')
})



router.get('/collaborator/find/:name', collaboratorAuthentication, async (req, res) => {
    let name = `%${req.params.name}%`;
    let clts = undefined
    try {

        if (req.params.name != undefined && req.params.name != 'all') {
            clts = await collaborators.findAll({ where: { nome: { [sequelize.Op.like]: name } } })
        } else {
            clts = await collaborators.findAll()
        }

        res.render('admin/main/collaborators', { collaborators: clts })

    } catch (error) {
        console.log('Erro-------------->>>>' + error)
        res.json({ erro: error, title: 'Erro ao realizar consulta' })
    }
})



module.exports = router;