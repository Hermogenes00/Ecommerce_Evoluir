const express = require('express')
const router = express.Router();
const defaultAuthentication = require('../middleware/defaultAuthentication');

router.get('/buscarCep/:cep', defaultAuthentication, async (req, res) => {
    let cep = req.params.cep;
    args = {
        cep: cep
    }

    let correio = new Correios();

    try {
        let result = await correio.consultaCEP(args);
        console.log('Encontrou----------- '+result);
        res.json(result)
    } catch (error) {
        console.log('Erro ao tentar buscar o cep----------- '+error);
        res.json({})
    }

})

module.exports = router