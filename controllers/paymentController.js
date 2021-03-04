const order = require('../models/order')
const payment = require('../models/payment')
const client = require('../models/client')
const router = require('express').Router()
const category = require('../models/category')
const subCategory = require('../models/subCategory')
const itemsOrder = require('../models/itensOrder')
const clientAuthentication = require('../middleware/clientAuthentication')
const collaboratorAuthentication = require('../middleware/collaboratorAuthentication')
const sequelize = require('sequelize')


//CONSTANTES
const CONSTANTE = require('../utils/constants')

//Tratamento dos arquivo (upload gabarito)
const multer = require('multer')
const path = require('path')
const fs = require('fs')

//Configuração do multer, para upload e download dos gabaritos
let enderecoArquivo = null;

//Configuração de salvamento do multer
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/comprovante')
    },
    filename: (req, file, cb) => {
        enderecoArquivo = `${file.originalname.replace(path.extname(file.originalname), '')}-${Date.now() + path.extname(file.originalname)}`
        cb(null, enderecoArquivo)
    }
})

let upload = multer({
    storage: storage,

    fileFilter: (req, file, cb) => {

        if (file.originalname != '' || file.originalname != null || file.originalname != undefined) {
            if (path.extname(file.originalname) != '.pdf') {
                req.flash('error', 'Arquivo deve estar em extensão .pdf')
                cb(null, false)
            } else {
                req.flash('success', `Arquivo enviado com sucesso `)
                cb(null, true)
            }
        } else {
            req.flash('error', 'Arquivo vazio')
            cb(null, false)
        }

    }
})


//Rotas

router.get('/admin/payment/:cliente?/:dateStart?/:dateFinish?/:status?', collaboratorAuthentication, async (req, res) => {

    let response = {}
    let { cliente, dateStart, dateFinish, status } = req.params

    try {

        if (cliente && dateStart && dateFinish && status) {
            response = await order.findAll({
                include: [
                    {
                        model: payment, where: {
                            status: status,
                            createdAt: { [sequelize.Op.between]: [new Date(dateStart), new Date(dateFinish)] }
                        }
                    },
                    {
                        model: client, where: { nome: { [sequelize.Op.like]: [`%${cliente}%`] } }
                    }
                ],
                order: [['createdAt', 'desc']]
            })
        } else {
            response = await order.findAll({ include: [{ model: payment }, { model: client }], order: [['createdAt', 'desc']] })
        }

    } catch (error) {
        console.log('Erro ao tentar carregar pagamentos', error);
    }
    console.log(response);
    res.render('admin/main/payments', { pedidos: response })
})



//receipt=comprovante
router.post('/admin/payment/receipt/:idOrder/', clientAuthentication, upload.single('file'), async (req, res) => {

    //Verificando se o arquivo é uma imagem
    //data.imagem.split('/')[0] == 'data:image' ? flagImage = true : flagImage = false
    const { idOrder } = req.params

    if (enderecoArquivo) {

        //Remove o arquivo da pasta comprovante, caso exista...
        let oldAdress = await payment.findOne({ attributes: ['comprovante'], where: { pedidoId: idOrder } })
        fs.unlink('public/comprovante/' + oldAdress.comprovante, (err) => { })

        try {
            await payment.update(
                { comprovante: enderecoArquivo, status: CONSTANTE.STATUS_PAGAMENTO.ANALISE_COMPROVANTE },
                { where: { pedidoId: idOrder } })

            await order.update({
                status: CONSTANTE.STATUS_PAGAMENTO.ANALISE_COMPROVANTE
            }, { where: { id: idOrder } })


            req.flash('success', 'Comprovante enviado para análise')

        } catch (error) {
            req.flash('error', 'Erro ao tentar salvar o arquivo')
            console.log('Erro ao tentar salvar o arquivo', error);
        }
    } else {
        req.flash('error', 'Erro ao tentar enviar o comprovante, verifique e tente novamente')
    }

    res.redirect('/client/orders')

})


//Aprovação/Recusa da análise do envio do comprovante
router.post('/payment/:id', collaboratorAuthentication, async (req, res) => {

    let { id } = req.params
    let data = req.body
    let isSuccess = false;
    let objErr = {}

    payment.update({
        status: data.status,
        informe: data.informe
    }, { where: { pedidoId: id } }).then(response => {
        isSuccess = true
    }).catch(err => {
        isSuccess = false
        objErr = {
            err
        }
    })

    order.update({
        status: data.status == 'RECEBIDO' ? CONSTANTE.STATUS_PRODUCAO.EM_PRODUCAO : data.status,
        include: [{ model: payment }]
    }, { where: { id: id } }).then(response => {
        isSuccess = true
    }).catch(err => {
        isSuccess = false
        objErr = { err }
    })

    if (data.status == 'RECEBIDO') {
        itemsOrder.update(
            { status: CONSTANTE.STATUS_PRODUCAO.EM_PRODUCAO },
            { where: { pedidoId: id } }
        ).then(response => {
            isSuccess = true
        }).catch(err => {
            isSuccess = false
            objErr = { err }
        })
    }

    isSuccess ? res.json({ response: true }) : res.json(objErr)

})



module.exports = router