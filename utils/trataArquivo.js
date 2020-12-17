const fs = require('fs')


function removerArquivo(arquivo, cb) {

    fs.unlink('public/uploads/' + arquivo, (err) => {
        if (err) {
            cb(false)
        } else {
            cb(true)
        }
    })

}


module.exports = {removerArquivo}