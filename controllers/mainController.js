const express = require('express')
const router = express.Router();
const clients = require('../models/client')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)
const orders = require('../models/order');
const collaboratorAuthentication = require('../middleware/collaboratorAuthentication');


router.get('/main',collaboratorAuthentication,(req,res)=>{
    res.render('admin/main/main')
})














module.exports = router;