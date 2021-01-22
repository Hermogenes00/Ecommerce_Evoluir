const express = require('express')
const router = express.Router();
const itensOrder = require('../models/itensOrder')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const CONTANTS = require('../utils/constants')
//Configuração do Multer - Para realização de upload e download
let enderecoPdf = undefined;


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        enderecoPdf = file.originalname + '-' + Date.now() + path.extname(file.originalname)
        cb(null, enderecoPdf)
    }
})


let upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        
        if (path.extname(file.originalname) == '.pdf') {
            
            cb(null, true)
        } else {
            
            cb(null, false)
        }
    }
})

//Rotas
router.post('/itemOrder/file/:item', upload.single('arquivo'), async (req, res) => {
    let idItem = req.params.item;
    
    try {

        let itemOrder = await itensOrder.findOne({ where: { id: idItem } })

        if (itemOrder) {
            if (itemOrder.arquivo) {
                fs.unlink('public/uploads/' + itemOrder.arquivo, (err) => {
                    if (err) {
                        console.log('Erro ao tentar excluir o arquivo->' + err);
                    }
                })
            }

            if (enderecoPdf) {
                console.log('Endereço do pdf----', enderecoPdf);
                await itensOrder.update({ arquivo: enderecoPdf, status:CONTANTS.STATUS_PRODUCAO.AGUARDANDO_PRODUCAO}, { where: { id: idItem } })
                enderecoPdf = null
            }

            res.json({ imagem: enderecoPdf })
        }

    } catch (error) {
        console.log(error);
        res.json(error)
    }

})


module.exports = router