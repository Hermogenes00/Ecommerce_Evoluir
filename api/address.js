const express = require('express');
const address = require('../models/address')
const router = express.Router();
const client = require('../models/client')

//Lista todos os endereços
router.get('/address', async (req, res) => {
    try {

        adr = await address.findAll({ include: [{ model: client }] })
        res.statusCode = 200
        res.json(adr)

    } catch (error) {
        res.statusCode = 400
    }
})

//Pegar um único endereço pelo id
router.get('/address/:id', async (req, res) => {

    let id = req.params.id
    let adr = []
    try {

        adr = await address.findAll({ where: { id: id }, include: [{ model: client }] })

        res.statusCode = 200
        res.json(adr)
    } catch (error) {
        res.statusCode = 400
    }

})

//Listagem dos endereços de um cliente
router.get('/address/client/:idClient', async (req, res) => {

    let idClient = req.params.idClient
    let adr = []
    try {
        adr = await address.findAll({ where: { clienteId: idClient } })

        res.statusCode = 200
        res.json(adr)
    } catch (error) {
        res.statusCode = 400
    }

})


//Criação
router.post('/address', async (req, res) => {

    let data = req.body;

    try {

        const response = await address.create({
            cep: data.cep,
            cidade: data.cidade,
            uf: data.uf,
            rua: data.rua,
            bairro: data.bairro,
            numero: data.numero,
            complemento: data.complemento,
            clienteId: data.idClient
        })

        res.statusCode = 200
        res.json(response)

    } catch (error) {

        res.statusCode = 400

    }

})

//Atualização
router.put('/address/:id', async (req, res) => {

    let data = req.body;

    try {
        let response = await address.update({

            cep: data.cep,
            cidade: data.cidade,
            uf: data.uf,
            rua: data.rua,
            bairro: data.bairro,
            numero: data.numero,
            complemento: data.complemento

        }, { where: { id: data.id } })

        res.statusCode = 200
        res.json(response)

    } catch (error) {
        console.log('Erro ao tentar localizar endereços -->' + error);
    }

})

//Deleção
router.delete('/address/:id', (req, res) => {
    
    let id = req.params.id

    address.destroy({ where: { id: id } }).then(response => {
        res.statusCode = 200
        res.json(response)
    }).catch(err=>{
        res.statusCode = 400
    })

})




module.exports = router;
