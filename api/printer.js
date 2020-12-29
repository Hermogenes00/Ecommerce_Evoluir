const express = require('express')
const router = express.Router()

//Model
const printer = require('../models/printer')

//Listagem
router.get('/printers', (req, res) => {

    printer.findAll().then(printers => {
        res.status(200).json(printers)
    }).catch(err => {
        res.status(400).send('Erro ao tentar listar as impressoras')
    })
})

//Retorna impressora pelo id
router.get('/printers//:id', (req, res) => {

    let printerId = req.params.id
    let objPrinter = undefined

    if (!NaN(id)) {

        printer.findByPk(printerId).then(printer => {
            res.status(200).json(printer)
        }).catch(err => {
            res.status(400).send('Erro ao tentar consultar a impressora')
        })

    } else {
        res.status(400).send('Informe um id válido')
    }

})

//Persistência da impressora, new
router.post('/printers', (req, res) => {

    let data = req.body

    printer.create(data).then((response) => {
        res.status(200).json(response)
    }).catch(err => {
        res.status(400).send('Erro ao tentar criar a impressora')
    })

})

//Persistência da impressora, update
router.put('/printers/:id', (req, res) => {
    let data = req.body

    if (data.id > 0) {

        printer.update(data, { where: { id: data.id } }).then((response) => {
            res.status(200).json(response)
        }).catch(err => {
            res.status(400).send('Erro ao tentar atualizar a impressora')
        })
    } else {
        res.status(400).send('Informe um id válido')
    }
}
)

//Deleção
router.delete('/printers/:id', (req, res) => {
    let id = req.params.id

    if (id > 0) {
        printer.destroy({ where: { id: id } }).then(response => {
            res.status(200).json(response)
        }).catch(err => {
            res.status(400).send('Erro ao tentar excluir a impressora')
        })
    }
})










module.exports = router