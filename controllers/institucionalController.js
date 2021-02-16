const express = require('express')
const sequelize = require('sequelize')
const router = express.Router()
const slug = require('slugify')
const institucional = require('../models/institucional')
const collaboratorAuthentication = require('../middleware/collaboratorAuthentication')


//Find all posts
router.get('/admin/institucionals/:titulo?', collaboratorAuthentication, async (req, res) => {

    let insts = undefined
    let { titulo } = req.params

    if (titulo) {
        try {
            insts = await institucional.findAll({ where: { titulo: { [sequelize.Op.like]: `%${titulo}%` } } })
        } catch (error) {
            res.send('Ops, não foi possível realizar esta consulta, tente novamente...')
        }
    } else {
        try {
            insts = await institucional.findAll()
        } catch (error) {
            res.send('Ops, não foi possível realizar esta consulta, tente novamente...')
        }
    }

    res.render('admin/main/institucional/institucionals', { institucionals: insts })
})

//Find post by slug
router.get('/admin/institucional/find/:slug', collaboratorAuthentication, (req, res) => {

    institucional.findOne({ where: { slug: req.params.slug } }).then(response => {
        res.render('admin/main/institucional/post', { institucional: response })
    }).catch(err => {
        console.log(err)
        res.send('Ops, não foi possível realizar esta consulta, tente novamente...')
    });
})

//Form for Create or update post
router.get('/admin/institucional/:id?', collaboratorAuthentication, async (req, res) => {
    let { id } = req.params

    let objPost = {
        id: undefined,
        titulo: undefined,
        conteudo: undefined
    }

    if (id) {
        try {
            objPost = await institucional.findOne({ where: { id: id } })
        } catch (error) {
            res.send('Ops, não foi possível realizar esta consulta, tente novamente...')
        }
    }

    res.render('admin/main/institucional/institucional', { institucional: objPost })

})

//Save the post
router.post('/admin/institucional/', collaboratorAuthentication, (req, res) => {

    let data = req.body

    if (data.id) {
        institucional.update({
            titulo: data.titulo, conteudo: data.conteudo, slug: slug(data.titulo)
        }, { where: { id: data.id } }).then(response => {
            res.redirect('/admin/institucional/find/' + slug(data.titulo))
        }).catch(err => {
            console.log(err)
            res.send('Ops, não foi possível realizar esta consulta, tente novamente...')
        })

    } else {
        institucional.create({
            titulo: data.titulo,
            conteudo: data.conteudo,
            slug: slug(data.titulo)
        }).then(response => {
            res.redirect('/admin/institucional/find/' + slug(data.titulo))
        }).catch(err => {
            console.log(err)
            res.send('Ops, não foi possível realizar esta consulta, tente novamente...')
        })
    }
})

//Delete the post
router.delete('/admin/institucional/:id', collaboratorAuthentication, (req, res) => {
    
    institucional.destroy({ where: { id: req.params.id } }).then(res=>{
        res.redirect('/admin/institucionals/')
    }).catch(err=>{
        res.send('Ops, não foi possível realizar esta consulta, tente novamente...')
    })
})














module.exports = router
