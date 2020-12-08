const express = require('express');
const address = require('../models/address')
const router = express.Router();
const clientAuthentication = require('../middleware/clientAuthentication')

router.get('/client/address', clientAuthentication, async (req, res) => {

    let idClient = req.session.client.id;
    let adr = []
    try {
        adr = await address.findAll({ where: { clienteId: idClient } })
        res.render('admin/clients/address', { adr: adr })
    } catch (error) {
        console.log('Erro ao tentar localizar endereços -->' + error);
    }

})

router.get('/client/address/json/:idAddress', clientAuthentication, async (req, res) => {

    let idAddress = req.params.idAddress
    let adr = {}
    try {
        adr = await address.findByPk(idAddress)
        res.json(adr)
    } catch (error) {
        console.log('Erro ao tentar localizar endereço -->' + error);
    }

})

router.post('/client/address/new', clientAuthentication, async (req, res) => {

    let data = req.body;
    let idClient = req.session.client.id;
    
    let adr = []
    try {
        await address.create({
            cep: data.cep,
            cidade: data.cidade,
            uf: data.uf,
            rua: data.rua,
            bairro: data.bairro,
            numero: data.numero,
            complemento: data.complemento,
            clienteId: idClient
        })
        adr = await address.findAll({ where: { clienteId: idClient } })
        res.render('admin/clients/address', { adr: adr })
    } catch (error) {
        console.log('Erro ao tentar localizar endereços -->' + error);
    }

})

router.post('/client/address/update', clientAuthentication, async (req, res) => {

    let data = req.body;
    let idClient = req.session.client.id;
    let adr = []
    
    try {
        await address.update({
            cep: data.cep,
            cidade: data.cidade,
            uf: data.uf,
            rua: data.rua,
            bairro: data.bairro,
            numero: data.numero,
            complemento: data.complemento,
            clienteId: idClient
        }, { where: { clienteId: idClient, id: data.idAddress } })

        adr = await address.findAll({ where: { clienteId: idClient } })

        res.render('admin/clients/address', { adr: adr })
    } catch (error) {
        console.log('Erro ao tentar localizar endereços -->' + error);
    }


})






module.exports = router;
