const express = require('express')
const category = require('../models/category')
const subCategory = require('../models/subCategory')
const router = express.Router()
const collaboratorAuthentication = require('../middleware/collaboratorAuthentication')

router.get('/category/new',collaboratorAuthentication,(req,res)=>{
    res.render('admin/category/new')
})










module.exports = router;