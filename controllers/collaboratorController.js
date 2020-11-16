const express = require('express')
const router = express.Router()
const collaboratorAuthentication = require('../middleware/collaboratorAuthentication')
const bcrypt = require('bcrypt')
const collaborators = require('../models/collaborator')
const salt = bcrypt.genSaltSync(10)

router.get('/collaborator/perfil', collaboratorAuthentication, async (req, res) => {

    let collaborator = await collaborators.findByPk(req.session.collaborator.id)
    if (collaborator) {
        res.render('admin/collaborator/perfil', { collaborator: collaborator })
    } else {
        res.redirect('/main')
    }
})

router.post('/collaborator/update', collaboratorAuthentication, (req, res) => {

})

router.get('/collaborator/login', (req, res) => {
    if (req.session.collaborator) {
        res.redirect('/main')
    }else{
        res.render('admin/collaborator/login')
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
        console.log('Erro ao tentar logar usuário------' + error);
    }

})

router.get('/collaborator/new', (req, res) => {
    res.render('admin/collaborator/new')
})

router.post('/collaborator/save', async (req, res) => {
    let data = req.body;

    try {
        const clb = await collaborators.create({
            nome: data.nome,
            email: data.email,
            password: bcrypt.hashSync(data.password, salt)
        })
        if (clb) {
            req.session.collaborator = {
                id: clb.id,
                nome: clb.nome,
                email: clb.email
            }

            res.redirect('/main')
        }
    } catch (error) {
        res.redirect('/collaborator/new')
        console.log(error);
    }
})

router.get('/collaborator/logout', (req, res) => {

    req.session.collaborator = undefined;

    res.redirect('/collaborator/login')
})



module.exports = router;