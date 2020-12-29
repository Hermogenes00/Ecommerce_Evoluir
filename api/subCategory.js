const express = require('express')
const subCategory = require('../models/subCategory')
const slug = require('slugify')
const router = express.Router()


//Listagem de todas as subCategorias
router.get('/subCategory/subCategories', async (req, body) => {

    try {

        scat = await subCategory.findAll({
            where: {
                categoriaId: idCategory
            }
        })

        res.statusCode = 200
        res.json(scat)

    } catch (error) {
        res.statusCode = 400
    }

})

//Pegar subcategoria pelo id
router.get('/subCategory/:id', async (req, body) => {

    let subCat = {}
    let id = req.params.id
    try {
        subCat = await subCategory.findByPk(id)

        res.statusCode = 400
        res.json(subCat)

    } catch (error) {

        res.statusCode = 400

    }

})

//Listagem da subcategoria pela categoria
router.get('/subCategory/subCategoryByCategory/:idCategory?', async (req, res) => {

    let idCategory = req.params.idCategory;
    let scat = []

    if (idCategory) {
        try {
            scat = await subCategory.findAll({
                where: {
                    categoriaId: idCategory
                }
            })
            res.statusCode = 200
            res.json(scat)
        } catch (error) {
            res.statusCode = 400
        }
    }
})



//Criação
router.post('subCategory', async (req, res) => {
    let data = req.body;

    try {
        let response = await subCategory.create({
            nome: data.subCategoria,
            categoriaId: data.idCategoria,
            slug: slug(data.subCategoria)
        })
        res.statusCode = 200
        res.json(response)

    } catch (error) {
        res.statusCode = 400
    }
})

//Edição
router.put('/subCategory/:id', async (req, res) => {

    let id = req.params.id

    try {
        await subCategory.update({
            nome: data.inputName,
            slug: slug(data.inputName)
        }, {
            where: {
                id: id
            }
        })

        res.statusCode = 200

    } catch (error) {

        res.statusCode = 400
    }
})

//Vínculo de uma subcategoria há uma categoria
router.patch('/subCategory', async (req, res) => {
    let data = req.body;

    try {

        let response = await subCategory.update({
            categoriaId: data.idCategoria
        }, { where: { id: data.idSubCategoria } })

        res.statusCode = 200
        res.json(response)
    } catch (error) {

        res.statusCode = 400
    }
})
