
let btnSalvar = document.getElementById('btnSalvar')
let idOrder = null
let img = document.getElementById('imagem')
let previaImagem = document.getElementById('previaImagem')
let file = null


/*
Estou utilizando esta função, para conseguir para o id, para o input, para posteriormente, salvar o comprovante no banco.
Caso contrário precisaria, criar um modal para cada item, e isso deixaria a página html muito pesada, após a renderização
*/

function setarIdOrder(id) {
    idOrder = id;
    document.getElementById('idOrderImagem').value = id
}


function limparInputs() {

    previaImagem.src = '/images/imagem_default.jpg'
    img.value = null

    if (file) {
        file = null
    }
}


function lerArquivo(event) {

    let reader = new FileReader()
    file = event.target.files[0]

    if (file) {
        reader.readAsDataURL(file)
    } else {
        previaImagem.src = '/images/imagem_default.jpg'
    }

    reader.onloadstart = function () {
        btnSalvar.innerText = "Carregando arquivo...."
        btnSalvar.disabled = true
    }

    reader.onload = function () {
        btnSalvar.innerText = "Carregando arquivo...."
        btnSalvar.disabled = true
    }

    reader.onloadend = function () {

        btnSalvar.disabled = false
        btnSalvar.innerText = "Enviar Comprovante"

        previaImagem.src = reader.result
        img.value = reader.result

    }

}