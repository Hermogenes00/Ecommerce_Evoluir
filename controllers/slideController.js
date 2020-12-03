const express = require('express');
const slide = require('../models/slide')
const router = express.Router();
const collaboratorAuthentication = require('../middleware/collaboratorAuthentication');



router.get('/slides', collaboratorAuthentication, async (req, res) => {
    try {
        let slides = await slide.findAll();
        res.render('admin/slide/slides', { slides })
    } catch (error) {
        console.log('Erro ao tentar carregar slides->', error);
        res.redirect('/main')
    }

})

router.get('/admin/slide/new', collaboratorAuthentication, (req, res) => {
    res.render('admin/slide/new')
})




module.exports = router