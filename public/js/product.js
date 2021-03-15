

//take function from js/printers
let selectImpressoras = document.querySelector('#impressoras')

//Function from /js/printers.js
getPrinters(printers => {
    //Show printers wicth status active
    let activePrinters = printers.filter(prt => prt.ativo == 1)
    activePrinters.forEach(prt => {
        selectImpressoras.innerHTML += `<option ${prt.id == selectImpressoras.dataset.idimpressora ? 'selected' : ''} value="${prt.id}">
                                            ${prt.marca + '-' + prt.modelo}
                                        </option>`
    })
})


function lerArquivo(event) {
    let inputFile = event.target
    let inputImagem = document.querySelector('#imagem')

    if (inputFile.files) {

        let imgLocal = document.getElementById('imgLocal')

        let reader = new FileReader()
        let file = inputFile.files[0]

        if (file) {
            reader.readAsDataURL(file)
        } else {
            imgLocal.src = '/images/imagem_default.jpg'
        }

        reader.onloadend = function () {
            inputImagem.value = reader.result
            imgLocal.src = reader.result
        }
    }
}


function vlrTotalMetroQuadrado(largura, altura, callback) {
    let floatLargura, floatAltura;
    floatLargura = largura.replace('.', '').replace(',', '.')
    floatAltura = altura.replace('.', '').replace(',', '.')

    if (floatLargura != undefined && !isNaN(floatLargura)) {
        if (floatAltura != undefined && !isNaN(floatAltura)) {
            result = (floatLargura * floatAltura) * parseFloat(vlrel.dataset.valortotal)
            callback(result)
        }
    }

}

function calculoValores() {

    let vlrTotalel = document.getElementById('vlrTotal');

    let altura = document.getElementById('altura')
    let largura = document.getElementById('largura')

    vlrTotalMetroQuadrado(largura.value, altura.value, result => {
        vlrTotalel.innerHTML = isNaN(result) ? '0,00' : parseFloat(result).toLocaleString('pt-br', { style: 'currency', currency: 'brl' })
    })

    let divDescricao = document.getElementById('descricao');
    let texto = divDescricao.dataset.descricao
    let conteudoHtml = new DOMParser().parseFromString(texto, 'text/html')
    divDescricao.innerHTML = conteudoHtml.body.innerHTML
}









