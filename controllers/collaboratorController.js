const express = require('express')
const router = express.Router()
const sequelize = require('sequelize')
const collaboratorAuthentication = require('../middleware/collaboratorAuthentication')
const bcrypt = require('bcrypt')
const collaborators = require('../models/collaborator')
const salt = bcrypt.genSaltSync(10)
const category = require('../models/category')
const subCategory = require('../models/subCategory')


//Criação do middleware para menu
router.use(async (req, res, next) => {
    try {
        res.locals.menu = await category.findAll({ include: subCategory })
    } catch (error) {
        console.log('Erro ao tentar consultar as categorias->' + error);
    }
    next()
})

router.get('/collaborator/perfil', collaboratorAuthentication, async (req, res) => {

    let collaborator = await collaborators.findByPk(req.session.collaborator.id)
    if (collaborator) {
        res.render('admin/collaborator/perfil', { collaborator: collaborator })
    } else {
        res.redirect('/main')
    }
})

router.get('/collaborator/edit/:id', collaboratorAuthentication, async (req, res) => {
    let id = req.params.id;
    try {

        let clb = await collaborators.findByPk(id)
        if (clb) {
            res.render('admin/collaborator/edit', { collaborator: clb })
        } else {
            res.redirect('/collaborator/find/all')
        }

    } catch (error) {
        res.redirect('/collaborator/find/all')
    }
})

router.post('/collaborator/update', collaboratorAuthentication, async (req, res) => {

    let data = req.body
    try {
        await collaborators.update({
            nome: data.nome,
            email: data.email,
            tel: data.tel,
            cnpjCpf: data.cnpjCpf,
            cel1: data.cel1,
            cel2: data.cel2,
            cep: data.cep,
            rua: data.rua,
            bairro: data.bairro,
            numero: data.numero,
            complemento: data.complemento
        }, { where: { id: data.id } })
        res.redirect('/collaborator/find/all')
    } catch (error) {
        console.log('Erro ao tentar salvar colaborador--->' + error);
        res.redirect('/collaborator/edit/' + data.id)
    }
})

router.get('/collaborator/login', (req, res) => {
    if (req.session.collaborator) {
        res.redirect('/main')
    } else {
        res.render('admin/collaborator/login')
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

router.post('/collaborator/acesso', async (req, res) => {
    let data = req.body;
    let comparator = false;

    try {
        let clb = await collaborators.findOne({ where: { email: data.email } })

        if (clb) {
            console.log('Achou' + comparator);
            comparator = bcrypt.compareSync(data.password, clb.password);
            console.log('Resultado do comparator----' + comparator);
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

router.get('/collaborator/new', collaboratorAuthentication,(req, res) => {
    res.render('admin/collaborator/new')
})

router.post('/collaborator/save', collaboratorAuthentication, async (req, res) => {
    let data = req.body;

    try {
        const clb = await collaborators.create({
            nome: data.nome,
            email: data.email,
            password: bcrypt.hashSync(data.password, salt),
            tel: data.tel,
            cnpjCpf: data.cnpjCpf,
            cel1: data.cel1,
            cel2: data.cel2,
            cep: data.cep,
            rua: data.rua,
            bairro: data.bairro,
            numero: data.numero,
            complemento: data.complemento
        })
        if (clb) {
            res.redirect('/collaborator/find/all');
        } else {
            res.redirect('/collaborator/new')
        }
    } catch (error) {
        res.redirect('/collaborator/new')
        console.log('Erro ao tentar criar colaborador--->' + error);
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