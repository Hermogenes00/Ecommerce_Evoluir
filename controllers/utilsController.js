const express = require('express')
const router = express.Router();

//FileSyste
const fs = require('fs')

//Models
const category = require('../models/category')
const subCategory = require('../models/subCategory')
const orders = require('../models/order')
const client = require('../models/client')

//Middleware Authentication
const clientAuthentication = require('../middleware/clientAuthentication');

//Api Correios
const Correios = require('node-correios');
let correio = new Correios();

//Constante
const CONSTANTE = require('../utils/constants');
const { stringify } = require('querystring');


//Criação do middleware para menu
router.use(async (req, res, next) => {
    try {
        res.locals.menu = await category.findAll({ include: subCategory })
    } catch (error) {
        console.log('Erro ao tentar consultar as categorias->' + error);
    }
    next()
})

router.get('/buscarCep/:cep', async (req, res) => {

    let cep = req.params.cep;
    args = {
        cep: cep
    }
    try {
        let result = await correio.consultaCEP(args);
        res.json(result)
    } catch (error) {
        console.log('Erro ao tentar buscar o cep----------- ' + error);
        res.json({})
    }

})


router.get('/aquivocsv', (req, res) => {
    fs.readFile('./BAHIA-.csv','utf8', (err, data) => {
        if (!err) {
            let values = data.split('\r\n')
            res.json(values)
        } else {
            res.send(err)
        }
    })
})

router.get('/consultar/CalcPrecoPrazo/:idPedido/:metodoEntrega/:idLocalidadeEntrega?', clientAuthentication, async (req, res) => {

    let idOrder = req.params.idPedido
    let metodoEntrega = req.params.metodoEntrega
    let idLocalidadeEntrega = req.params.idLocalidadeEntrega;
    let codigoServico = undefined
    let ord = undefined
    let result = undefined
    let valor = 0.00

    let objUpdate = {
        valorFrete: 0.00,
        valorFinal: 0.00,
        metodoEnvio: metodoEntrega,
        localidadeEntregaId: null
    }


    ord = await orders.findByPk(idOrder, { include: client })

    if (ord) {

        try {

            if (metodoEntrega != 'BALCAO' && metodoEntrega != CONSTANTE.RETIRA_BASE) {
                console.log('Chegou no 1')
                for (codigo in CONSTANTE.CODIGO_SERVICO_CORREIOS) {
                    if (codigo == metodoEntrega) {
                        codigoServico = CONSTANTE.CODIGO_SERVICO_CORREIOS[codigo]
                    }
                }

                result = await correio.calcPrecoPrazo({
                    nCdEmpresa: null,
                    sDsSenha: null,
                    nCdServico: '' + codigoServico,
                    sCepOrigem: '48030000',
                    sCepDestino: ord.cliente.cep,
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
                valor = parseFloat(result[0].Valor.replace('.', '').replace(',', '.'))

                let valorFinal = parseFloat(valor) + parseFloat(ord.total)

                objUpdate.valorFrete = valor
                objUpdate.valorFinal = valorFinal
                objUpdate.metodoEnvio = metodoEntrega
                objUpdate.localidadeEntregaId = null

                try {
                    await orders.update(objUpdate,
                        { where: { id: idOrder, clienteId: req.session.client.id } })

                } catch (error) {
                    console.log('Erro ao tentar alterar o pedido', error);
                }

            } else if (metodoEntrega == CONSTANTE.RETIRA_BASE) { //MÉTODO DE ENTREGRA RETIRA BASE

                result = [
                    {
                        Valor: '30.00',
                        PrazoEntrega: '15',
                    }
                ]

                //Alterando o valor de frete no pedido
                valor = parseFloat(result[0].Valor)

                let valorFinal = parseFloat(valor) + parseFloat(ord.total)

                objUpdate.valorFrete = valor
                objUpdate.valorFinal = valorFinal
                objUpdate.metodoEnvio = metodoEntrega
                objUpdate.localidadeEntregaId = idLocalidadeEntrega

                await orders.update(objUpdate,
                    { where: { id: idOrder, clienteId: req.session.client.id } })

            } else {

                result = [
                    {
                        Valor: '30.00',
                        PrazoEntrega: '3'
                    }
                ]
                //Alterando o valor de frete no pedido
                valor = parseFloat(result[0].Valor.replace('.', '').replace(',', '.'))

                let valorFinal = parseFloat(valor) + parseFloat(ord.total)

                objUpdate.valorFrete = valor
                objUpdate.valorFinal = valorFinal
                objUpdate.metodoEnvio = metodoEntrega
                objUpdate.localidadeEntregaId = null

                await orders.update(objUpdate,
                    { where: { id: idOrder, clienteId: req.session.client.id } })

            }

        } catch (error) {
            console.log('Erro ao tentar calcularPreço e Prazo--->' + error);
            res.json({
                error: error
            })
        }
    }
    res.json(result[0])
})

module.exports = router