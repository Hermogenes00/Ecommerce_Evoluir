const express = require('express')
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
            estabelecimento:data.estabelecimento
        })       

        res.redirect('/main/deliveryRegion')

    } catch (error) {
        console.log('Erro ao tentar localizar regiões de entregas -->' + error);
    }

})






module.exports = router