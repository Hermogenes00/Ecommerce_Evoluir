const express = require('express')
const router = express.Router();
const clients = require('../models/client')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)
const orders = require('../models/order');
const collaboratorAuthentication = require('../middleware/collaboratorAuthentication');
const sequelize = require('sequelize');


router.get('/main', collaboratorAuthentication, (req, res) => {
    res.render('admin/main/main')
})


router.get('/main/production', collaboratorAuthentication, (req, res) => {
    res.render('admin/main/production')
})

router.get('/main/orders/:client?', collaboratorAuthentication, async (req, res) => {

    let client = `%${req.params.client}%`;
    let clts = undefined;

    try {

        if (req.params.client != undefined && req.params.client != 'all') {
            clts = await clients.findAll({ where: { nome: { [sequelize.Op.like]: client } }, include: orders })
        } else {
            clts = await clients.findAll({ include: orders })
        }

        res.render('admin/main/orders', { clients: clts })

    } catch (error) {
        res.json(error)
    }
})












module.exports = router;