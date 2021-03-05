const express = require('express')
const router = express.Router()

//Model
const sequelize = require('sequelize')
const printer = require('../models/printer')

//Middleware Authentication
const collaboratorAuthentication = require('../middleware/collaboratorAuthentication')

//Rotas
router.get('/admin/printers/:marca?', collaboratorAuthentication, async (req, res) => {

    let { marca } = req.params
    let printers = undefined
    try {
        if (marca) {
            printers = await printer.findAll({ where: { marca: { [sequelize.Op.like]: [`%${marca}%`] } } })
        } else {
            printers = await printer.findAll()
        }
        res.render('admin/printer/printers', { printers })
    } catch (error) {
        console.log('Erro ao tentar consultar impressoras', error);
        res.redirect('/main')
    }
})

router.get('/admin/printers/printer/:id?', collaboratorAuthentication, async (req, res) => {
    let { id } = req.params
    let objPrinter = undefined

    if (id) {
        try {
            objPrinter = await printer.findByPk(id)
        } catch (error) {
            res.redirect('/admin/printers')
        }
    } else {
        objPrinter = {}
    }

    res.render('admin/printer/printer', { printer: objPrinter })

})


router.post('/admin/printers/save', collaboratorAuthentication, (req, res) => {

    let data = req.body
    let objPrinter = {
        marca: data.marca,
        modelo: data.modelo,
        imagem: data.imagem,
        ativo: data.ativo ? 1 : 0
    }
    console.log(data)
    if (data.id > 0) {
        printer.update(objPrinter, { where: { id: data.id } }).then(() => {
            res.redirect('/admin/printers')
        }).catch(err => {
            res.send('Erro ao tentar realizar esta operação, tente novamente, caso o erro persista, entre em contato com o suporte')
        })
    } else {
        printer.create(objPrinter).then(() => {
            res.redirect('/admin/printers')
        }).catch(err => {
            res.send('Erro ao tentar realizar esta operação, tente novamente, caso o erro persista, entre em contato com o suporte')
        })
    }
})










module.exports = router