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

router.get('/admin/printers/printer/:id?', collaboratorAuthentication, (req, res) => {
    let printerId = req.params.id
    let objPrinter = undefined

    if (!NaN(id)) {

        printer.findByPk(printerId).then(result => {
            objPrinter = result
        }).catch(err => {
            console.log('Erro ao tentar consultar a impressora->' + err);
        })

    } else {
        objPrinter = {}
    }

    res.render('admin/printer/printer', {objPrinter })

})

router.post('/admin/printers/save', collaboratorAuthentication, (req, res) => {

    let data = req.body

    if (data.id > 0) {

        printer.update(data, { where: { id: data.id } }).then(() => {
            console.log('Impressora Atualizada com sucesso!!!');
        }).catch(err => {
            console.log('Erro ao tentar atualizar impressora ->' + err);
        })
    } else {

        printer.create(data).then(() => {
            console.log('Impressora Criada com sucesso!!!');
        }).catch(err => {
            console.log('Erro ao tentar criar impressora!!!');
        })
    }

    res.redirect('/admin/printer/printers')
})










module.exports = router