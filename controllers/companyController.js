const express = require('express')
const router = express.Router()
const collaboratorAuthentication = require('../middleware/collaboratorAuthentication')
const company = require('../models/company')

//Api Correios
const Correios = require('node-correios');
let correio = new Correios();

router.get('/admin/company', collaboratorAuthentication, async (req, res) => {

    try {
        let objCompany = await company.findAll();
        res.render('admin/main/empresa/empresa', { empresa: objCompany[0] })
    } catch (error) {
        res.json(error)
    }
})

router.post('/admin/company', collaboratorAuthentication, async (req, res) => {
    let data = req.body
    let objCompany = {
        rsocial: data.rsocial,
        fantasia: data.fantasia,
        cnpj: data.cnpj,
        inscricaoEstadual: data.ie,
        cep: data.cep,
        codigo_municipio:'',
        endereco: data.endereco,
        numero: data.numero,
        bairro: data.bairro,
        cidade: data.cidade,
        uf: data.uf,
        telefone: data.telefone,
        celular1: data.celular1,
        celular2: data.celular2,
        regimeEspecialTributacao: data.regimeEspecialTributacao,
        naturezaOperacao:data.naturezaOperacao,
        optanteSimplesNacional: data.optanteSimplesNacional ? true : false,
        incentivadorCultural: data.incentivadorCultural ? true : false,
    }

    //Take the ibge code and update in the objCompany
    try {        
        let result = await correio.consultaCEP({ cep: data.cep })
        objCompany.codigo_municipio = result.ibge        
    } catch (error) {
        console.log(error)
    }



    if (data.id > 0) {
        objCompany.id = data.id
        company.update(objCompany, { where: { id: data.id } }).then(response => {
            return res.render('admin/main/empresa/empresa', { empresa: objCompany })
        }).catch(err => {
            console.log(err);
            return res.send('Ops, não foi possível realizar essa operação. Tente novamente, casso o erro persista, entre em contato com o suporte')
        })
    } else {
        company.create(objCompany).then(response => {
            return res.render('admin/main/empresa/empresa', { empresa: response })
        }).catch(err => {
            console.log(err);
            return res.send('Ops, não foi possível realizar essa operação. Tente novamente, casso o erro persista, entre em contato com o suporte')
        })
    }

})



module.exports = router