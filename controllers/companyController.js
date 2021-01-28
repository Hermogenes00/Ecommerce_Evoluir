const express = require('express')
const router = express.Router()
const collaboratorAuthentication = require('../middleware/collaboratorAuthentication')
const company = require('../models/company')

router.get('/admin/company', collaboratorAuthentication, async (req, res) => {

    try {
        let objCompany = await company.findAll();
        res.render('admin/main/empresa/empresa', { empresa: objCompany[0] })
    } catch (error) {
        res.json(error)
    }
})

router.post('/admin/company', collaboratorAuthentication, (req, res) => {
    let data = req.body
    let objCompany = {
        rsocial: data.rsocial,
        fantasia: data.fantasia,
        cnpj: data.cnpj,
        inscricaoEstadual: data.ie,
        cep: data.cep,
        endereco: data.endereco,
        numero: data.numero,
        bairro: data.bairro,
        cidade: data.cidade,
        uf: data.uf,
        telefone:data.telefone,
        celular1:data.celular1,
        celular2:data.celular2,
        regimeEspecialTributacao: data.regimeEspecialTributacao,
        optanteSimplesNacional: data.optanteSimplesNacional?true:false,
        incentivadorCultural: data.incentivadorCultural?true:false
    }
    console.log(objCompany);
    if (data.id > 0) {
        company.update(objCompany, { where: { id: data.id } }).then(response => {
            res.render('admin/main/empresa/empresa', { empresa: objCompany })
        }).catch(err => {
            console.log(err);
            res.send('Ops, não foi possível realizar essa operação. Tente novamente, casso o erro persista, entre em contato com o suporte')
        })
    } else {
        company.create(objCompany).then(response => {
            res.render('admin/main/empresa/empresa', { empresa: response })
        }).catch(err => {
            console.log(err);
            res.send('Ops, não foi possível realizar essa operação. Tente novamente, casso o erro persista, entre em contato com o suporte')
        })
    }



})



module.exports = router