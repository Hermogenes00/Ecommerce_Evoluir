const express = require('express');
const slide = require('../models/slide')
const sequelize = require('sequelize')
const router = express.Router();
const collaboratorAuthentication = require('../middleware/collaboratorAuthentication');


router.get('/admin/slides/:title?', collaboratorAuthentication, async (req, res) => {
    let ttl = req.params.title
    let slides = undefined
    try {
        if (ttl) {
            slides = await slide.findAll({
                where: {
                    titulo: {
                        [sequelize.Op.like]: `%${ttl}%`
                    }
                }
            })
        } else {
            slides = await slide.findAll();
        }

        res.render('admin/slide/slides', { slides })
    } catch (error) {
        console.log('Erro ao tentar carregar slides->', error);
        res.redirect('/main')
    }
})

router.get('/admin/slide/new', collaboratorAuthentication, (req, res) => {
    res.render('admin/slide/new')
})

router.post('/admin/slide/save', collaboratorAuthentication, (req, res) => {
    let data = req.body;

    slide.create({
        titulo: data.titulo,
        subTitulo: data.subTitulo,
        imagem: data.imagem
    }).then(() => {
        res.redirect('/admin/slides/')
    }).catch(err => {
        console.log('Erro ao tentar salvar o slide->', err);
        res.redirect('/admin/slide/new')
    })
})

router.get('/admin/slide/edit/:id', collaboratorAuthentication, (req, res) => {
    let id = req.params.id
    slide.findByPk(id).then(sld => {
        res.render('admin/slide/edit', { slide: sld })
    }).catch(err => {
        console.log('Erro ao tentar carregar o slide->', err);
        res.redirect('/admin/slides/')
    })

})

router.post('/admin/slide/update', collaboratorAuthentication, (req, res) => {
    let data = req.body;
    
    slide.update({
        titulo: data.titulo,
        subTitulo: data.subTitulo,
        imagem: data.imagem
    }, { where: { id: data.id } }).then(() => {
        res.redirect('/admin/slides/')
    }).catch(err => {
        console.log('Erro ao tentar salvar o slide->', err);
        res.redirect('/admin/slide/edit/' + data.id)
    })
})

router.post('/admin/slide/delete', collaboratorAuthentication, (req, res) => {
    let data = req.body;
    slide.destroy({ where: { id: data.id } }).then(() => {
        res.redirect('/admin/slides/')
    }).catch(err => {
        console.log('Erro ao tentar excluir o slide->', err);
        res.redirect('/admin/slides/')
    })
})



module.exports = router