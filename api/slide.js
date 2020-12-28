const express = require('express');
const slide = require('../models/slide')
const sequelize = require('sequelize')
const router = express.Router();



//Listagem
router.get('/slide/:title?', async (req, res) => {
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
        res.statusCode = 200
        res.json(slides)
    } catch (error) {
        res.statusCode = 404
    }

})

//Criação
router.post('/slide', (req, res) => {

    let data = req.body;

    slide.create({
        titulo: data.titulo,
        subTitulo: data.subTitulo,
        imagem: data.imagem
    }).then((sl) => {
        res.statusCode = 200
        res.json(sl)
    }).catch(err => {
        res.statusCode = 400
    })

})

//Edição
router.put('/slide/:id', (req, res) => {
    let id = req.params.id

    let data = req.body;

    slide.update({
        titulo: data.titulo,
        subTitulo: data.subTitulo,
        imagem: data.imagem
    }, { where: { id: id } }).then(() => {
        res.statusCode = 200
    }).catch(err => {
        res.statusCode = 400
    })

})

//Deleção
router.delete('/slide/:id', (req, res) => {
    let id = req.params.id

    slide.destroy({ where: { id: id } }).then(() => {
        res.statusCode = 200
    }).catch(err => {
        res.statusCode = 400
    })
})


module.exports = router