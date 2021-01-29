const express = require('express')
const router = express.Router()
const collaboratorAuthentication = require('../middleware/collaboratorAuthentication')

router.get('/admin/fiscal',collaboratorAuthentication,(req,res)=>{
    res.render('admin/main/fiscal/nfses')
})





module.exports = router