const express = require('express')
const sequelize = require('sequelize')
const collaboratoAuthentication = require('../middleware/collaboratorAuthentication')
const router = express.Router()
const deliveryRegion = require('../models/deliveryRegion')

router.get('/main/deliveryRegion', collaboratoAuthentication, async (req, res) => {
    let dlvReg = []
    try {
        dlvReg = await deliveryRegion.findAll()


    } catch (error) {
        console.log('Erro ao tentar carregar região de entrega-->' + error)
    }
    res.render('admin/deliveryRegion/deliveryRegion', { dlvReg: dlvReg })
})

router.get('/main/deliveryRegion/create', collaboratoAuthentication, (req, res) => {
    res.render('admin/deliveryRegion/create')
})

router.post('/main/deliveryRegion/delete', collaboratoAuthentication, async (req, res) => {

    let data = req.body

    try {
        await deliveryRegion.destroy({ where: { id: data.id } })
        res.redirect('/main/deliveryRegion')

    } catch (error) {
        console.log('Erro ao tentar deletar região de entrega-->' + error)
        res.redirect('/main/deliveryRegion')
    }
})


router.post('/main/deliveryRegion/save', collaboratoAuthentication, async (req, res) => {
    let data = req.body
    try {
        await deliveryRegion.create({
            cep: data.cep,
            cidade: data.cidade,
            uf: data.uf,
            rua: data.rua,
            bairro: data.bairro,
            numero: data.numero,
            complemento: data.complemento,
            ibge: data.ibge,
            estabelecimento: data.estabelecimento
        })

        res.redirect('/main/deliveryRegion')

    } catch (error) {
        console.log('Erro ao tentar localizar regiões de entregas -->' + error);
    }

})

router.get('/main/deliveryRegion/uf', async (req, res) => {

    let estados = []
    try {
        estados = await deliveryRegion.findAll({
            attributes: ['uf', 'id'],
            group: ['uf']
        })

        res.json(estados)


    } catch (error) {
        console.log('Erro ao tentar buscar estados->' + error);
        res.json([])
    }

})

router.get('/main/deliveryRegion/cidadeByUf/:uf', async (req, res) => {
    try {
        let cidades = await deliveryRegion.findAll({ where: { uf: req.params.uf }, group: ['ibge'] })
        res.json(cidades)
    } catch (error) {
        console.log('Erro ao buscar cidades->' + error);
        res.json([])
    }
})






module.exports = router