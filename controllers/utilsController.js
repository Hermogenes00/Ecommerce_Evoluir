const express = require('express')
const router = express.Router();

//Models
const category = require('../models/category')
const subCategory = require('../models/subCategory')
const orders = require('../models/order')

//Middleware Authentication
const clientAuthentication = require('../middleware/clientAuthentication');
const defaultAuthentication = require('../middleware/defaultAuthentication');

//Api Correios
const Correios = require('node-correios');
let correio = new Correios();

//Constante
const CONSTANTE = require('../utils/constants')


//Criação do middleware para menu
router.use(async (req, res, next) => {
    try {
        res.locals.menu = await category.findAll({ include: subCategory })
    } catch (error) {
        console.log('Erro ao tentar consultar as categorias->' + error);
    }
    next()
})

router.get('/buscarCep/:cep', defaultAuthentication, async (req, res) => {

    let cep = req.params.cep;
    args = {
        cep: cep
    }

    try {
        let result = await correio.consultaCEP(args);
        console.log('Encontrou----------- ' + result);
        res.json(result)
    } catch (error) {
        console.log('Erro ao tentar buscar o cep----------- ' + error);
        res.json({})
    }

})

router.get('/consultar/CalcPrecoPrazo/:idPedido/:metodoEntrega', clientAuthentication, async (req, res) => {
    let idOrder = req.params.idPedido
    let metodoEntrega = req.params.metodoEntrega
    let codigoServico = undefined;
    let ord = undefined;

    for (codigo in CONSTANTE.CODIGO_SERVICO_CORREIOS) {
        if (codigo == metodoEntrega) {
            codigoServico = CONSTANTE.CODIGO_SERVICO_CORREIOS[codigo]
        }
    }

    try {
        let result = await correio.calcPrecoPrazo({
            nCdEmpresa: null,
            sDsSenha: null,
            nCdServico: '' + codigoServico,
            sCepOrigem: '48030000',
            sCepDestino: '13408136',
            nVlPeso: '1',
            nCdFormato: 1,
            nVlComprimento: 15,
            nVlAltura: 1,
            nVlLargura: 10,
            nVlDiametro: 5,
            sCdMaoPropria: 'N',
            nVlValorDeclarado: 0,
            sCdAvisoRecebimento: 'N'

        })


        //Alterando o valor de frete no pedido
        let valor = parseFloat(result[0].Valor.replace('.', '').replace(',', '.'))


        try {
            ord = await orders.findByPk(idOrder)
            if (ord) {
                
                let valorFinal = parseFloat(valor) + parseFloat(ord.total)
                await orders.update({
                    valorFrete: valor,
                    valorFinal: valorFinal,
                    metodoEnvio:metodoEntrega
                }, { where: { id: idOrder, clienteId: req.session.client.id } })
            }


        } catch (error) {
            console.log('Erro ao tentar alterar o valor de frete no pedido-->' + error);
        }

        res.json(result[0])


    } catch (error) {
        console.log('Erro ao tentar calcularPreço e Prazo--->' + error);
        res.json({
            error: error
        })
    }
})

module.exports = router