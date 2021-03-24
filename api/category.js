const express = require('express')
const category = require('../models/category')
const subCategory = require('../models/subCategory')
const slug = require('slugify')
const router = express.Router()
const apiAuthentication = require('../middleware/apiAuthentication')

//Listagem
router.get('/category',apiAuthentication.apiCollaboratorAuthentication, async (req, res) => {

    let cat = []
    try {
        
        cat = await category.findAll({ include: subCategory });        
        res.statusCode = 200
        res.json(cat)

    } catch (error) {
        res.statusCode = 400
    }

})

//Pegar categoria pelo id
router.get('/category/:id', async (req, res) => {
    let cat = {}
    let id = req.params.id
    try {
        cat = await category.findByPk(id);
        res.json(cat)
    } catch (error) {
        res.statusCode = 400
    }
})


//Criação
router.post('/category', async (req, res) => {

    let data = req.body;

    try {
        let cat = await category.create({
            nome: data.nome,
            slug: slug(data.nome)
        })

        res.statusCode = 200
        res.json(cat)

    } catch (error) {
        res.statusCode = 400
    }

})

//Edição
router.put('/category/:id', async (req, res) => {

    let data = req.body
    let id = req.params.id

    try {
        let up = await category.update({
            nome: data.nome,
            slug: slug(data.nome)
        }, {
            where: {
                id: id
            }
        })

        res.statusCode = 200
        res.json(up)

    } catch (error) {
        res.statusCode = 400
    }
})

module.exports = router
