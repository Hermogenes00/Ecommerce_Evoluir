const express = require('express')
const category = require('../models/category')
const subCategory = require('../models/subCategory')
const slug = require('slugify')
const router = express.Router()
const collaboratorAuthentication = require('../middleware/collaboratorAuthentication')



router.get('/category/categories/:json?', async (req, res) => {

    let cat = []
    let subCats = []
    try {
        cat = await category.findAll({ include: subCategory });
        subCats = await subCategory.findAll({ include: category });
    } catch (error) {
        console.log('Ops, não foi possível realizar esta operação, tente novamente, caso o problema persista, entre em contato com o suporte->' + error);
        res.send('Ops, não foi possível realizar esta operação, tente novamente, caso o problema persista, entre em contato com o suporte')
    }
    if (!req.params.json) {
        res.render('admin/category/categories', { categories: cat, subCategories: subCats })
    } else {
        res.json({
            categories: cat,
            subCategories: subCats
        })
    }

})

router.post('/category/save', collaboratorAuthentication, async (req, res) => {

    let data = req.body;

    try {
        let cat = await category.create({
            nome: data.nome,
            slug: slug(data.nome)
        })

        if (cat) {
            res.redirect('/category/categories')
        }
    } catch (error) {
        console.log('Ops, não foi possível realizar esta operação, tente novamente, caso o problema persista, entre em contato com o suporte->' + error);
        res.send('Ops, não foi possível realizar esta operação, tente novamente, caso o problema persista, entre em contato com o suporte')
    }
})

router.post('/category/update', collaboratorAuthentication, async (req, res) => {

    let data = req.body

    try {
        await category.update({
            nome: data.nome,
            slug: slug(data.nome)
        }, {
            where: {
                id: data.id
            }
        })

        res.redirect('/category/categories')

    } catch (error) {
        console.log('Ops, não foi possível realizar esta operação, tente novamente, caso o problema persista, entre em contato com o suporte->' + error);
        res.send('Ops, não foi possível realizar esta operação, tente novamente, caso o problema persista, entre em contato com o suporte')
    }
})


router.post('/subCategory/save', collaboratorAuthentication, async (req, res) => {
    let data = req.body;

    try {
        await subCategory.create({
            nome: data.subCategoria,
            categoriaId: data.idCategoria,
            slug: slug(data.subCategoria)
        })

        res.redirect('/category/categories')


    } catch (error) {
        console.log('Ops, não foi possível realizar esta operação, tente novamente, caso o problema persista, entre em contato com o suporte->' + error);
        res.send('Ops, não foi possível realizar esta operação, tente novamente, caso o problema persista, entre em contato com o suporte')
    }
})

//bond = Vínculo
router.post('/category/bond', collaboratorAuthentication, async (req, res) => {
    let data = req.body;

    try {

        await subCategory.update({
            categoriaId: data.idCategoria
        }, { where: { id: data.idSubCategoria } })

        res.redirect('/category/categories')
    } catch (error) {
        console.log('Ops, não foi possível realizar esta operação, tente novamente, caso o problema persista, entre em contato com o suporte->' + error);
        res.send('Ops, não foi possível realizar esta operação, tente novamente, caso o problema persista, entre em contato com o suporte')
    }
})

router.get('/category/find/:id', collaboratorAuthentication, async (req, res) => {
    let cat = {}
    let id = req.params.id
    try {
        cat = await category.findByPk(id);
        res.json(cat)
    } catch (error) {
        console.log('Ops, não foi possível realizar esta operação, tente novamente, caso o problema persista, entre em contato com o suporte->' + error);
        res.send('Ops, não foi possível realizar esta operação, tente novamente, caso o problema persista, entre em contato com o suporte')
    }
})

router.get('/category/subcategory/find/:id', collaboratorAuthentication, async (req, res) => {
    let subCat = {}
    let id = req.params.id
    try {
        subCat = await subCategory.findByPk(id)
        res.json(subCat)
    } catch (error) {
        console.log('Ops, não foi possível realizar esta operação, tente novamente, caso o problema persista, entre em contato com o suporte->' + error);
        res.send('Ops, não foi possível realizar esta operação, tente novamente, caso o problema persista, entre em contato com o suporte')
    }
})


router.get('/category/subCategoryByCategory/:mode?/:idCategory?', collaboratorAuthentication, async (req, res) => {
    let idCategory = req.params.idCategory;
    let mode = req.params.mode
    let scat = []
    if (idCategory) {
        try {
            scat = await subCategory.findAll({
                where: {
                    categoriaId: idCategory
                }
            })
        } catch (error) {
            console.log('Ops, não foi possível realizar esta operação, tente novamente, caso o problema persista, entre em contato com o suporte->' + error);
            res.send('Ops, não foi possível realizar esta operação, tente novamente, caso o problema persista, entre em contato com o suporte')
        }
        if (mode == 'json') {
            res.json({ subCategories: scat })
        }
    }
})

router.post('/category/updateName/:table', collaboratorAuthentication, async (req, res) => {

    let updateTable = req.params.table
    let data = req.body;

    if (updateTable == 'cat') {
        try {
            await category.update({
                nome: data.inputName
            }, {
                where: {
                    id: data.idAlterarNome
                }
            })
            res.redirect('/category/categories')
        } catch (error) {
            console.log('Ops, não foi possível realizar esta operação, tente novamente, caso o problema persista, entre em contato com o suporte->' + error);
            res.send('Ops, não foi possível realizar esta operação, tente novamente, caso o problema persista, entre em contato com o suporte')
        }

    } else {
        try {
            await subCategory.update({
                nome: data.inputName
            }, {
                where: {
                    id: data.idAlterarNome
                }
            })
            res.redirect('/category/categories')
        } catch (error) {
            console.log('Ops, não foi possível realizar esta operação, tente novamente, caso o problema persista, entre em contato com o suporte->' + error);
            res.send('Ops, não foi possível realizar esta operação, tente novamente, caso o problema persista, entre em contato com o suporte')
        }
    }
})


module.exports = router;