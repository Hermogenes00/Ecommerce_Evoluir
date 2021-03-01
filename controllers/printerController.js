const express = require('express')
const router = express.Router()

//Model
const printer = require('../models/printer')

//Middleware Authentication
const collaboratorAuthentication = require('../middleware/collaboratorAuthentication')



//Rotas
router.get('/admin/printers', collaboratorAuthentication, (req, res) => {

    printer.findAll().then(printers => {
        res.render('admin/printer/printers', { printers })
    }).catch(err => {
        res.redirect('/main')
    })
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

    res.render('admin/printer/printer', {printer:objPrinter})

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