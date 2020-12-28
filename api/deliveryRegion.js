const express = require('express')
const sequelize = require('sequelize')
const router = express.Router()
const deliveryRegion = require('../models/deliveryRegion')


//Retorna todas as regiões de entregas cadastradas
router.get('/deliveryRegion', (req, res) => {

    deliveryRegion.findAll().then(response => {
        res.statusCode = 200
        res.json(response)
    }).catch(err => {
        res.statusCode = 400
        res.send('Erro ao tentar carregar região de entrega')
    })

})

//Retorna regiões de entrega pelo estado (uf)
router.get('/deliveryRegion/cidadeByUf/:uf', async (req, res) => {
    try {
        let cidades = await deliveryRegion.findAll({ where: { uf: req.params.uf }, group: ['ibge'] })
        res.statusCode = 200
        res.json(cidades)
    } catch (error) {
        res.statusCode = 400
        res.send('Erro ao buscar cidades')
    }
})

//Retorna todos os estados das regiões cadastradas
router.get('/main/deliveryRegion/uf', async (req, res) => {

    let estados = []
    try {
        estados = await deliveryRegion.findAll({
            attributes: ['uf', 'id'],
            group: ['uf']
        })

        res.statusCode = 200
        res.json(estados)

    } catch (error) {
        res.statusCode = 400
        res.send('Erro ao tentar buscar estados')
    }

})

//Criação
router.post('/deliveryRegion', async (req, res) => {
    let data = req.body
    try {
        let response = await deliveryRegion.create({
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

        res.statusCode = 200
        res.json(response)

    } catch (error) {
        res.statusCode = 400
        res.send('Erro ao tentar criar a região de entrega')
    }

})


//Exclusão
router.delete('/deliveryRegion', async (req, res) => {

    let data = req.body

    try {
        let response = await deliveryRegion.destroy({ where: { id: data.id } })
        res.statusCode = 200
        res.json(response)
    } catch (error) {
        res.statusCode = 400
        res.send('Erro ao tentar excluir a região de entrega')
    }
})










module.exports = router