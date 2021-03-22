const express = require('express')
const router = express.Router()
const collaboratorAuthentication = require('../../middleware/collaboratorAuthentication')

router.get('/admin/fiscal',collaboratorAuthentication,(req,res)=>{
    res.render('admin/main/fiscal/nfses')
})

router.get('/admin/certified', collaboratorAuthentication, (req, res) => {
    res.render('admin/main/fiscal/certified')
})

//Update certified
router.post('/admin/certified', collaboratorAuthentication, (req, res) => {

    res.render('admin/main/fiscal/certified')
})



module.exports = router