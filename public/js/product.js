window.onload = event => {

    let qtdEl = document.getElementsByName('qtd')
    let desconto = document.getElementById('descUnit')

    if (qtdEl.length > 0) {

        qtdEl[0].addEventListener('change', (event) => {

            let propriedadeDivisao = parseFloat(qtdEl[0].dataset.propriedadedivisao);

            let vlrTotalel = document.getElementById('vlrTotal');
            let vlrRel = document.getElementById('vlrel')

            let descUnitario = vlrRel.dataset.valortotal * (desconto.value / 100)

            let qtd = parseInt(event.target.value) / propriedadeDivisao;

            let contadorAuxiliar = event.target.selectedOptions[0].dataset.contadorauxiliar
            let total = 0;
            
            total = (qtd * vlrel.dataset.valortotal) - (qtd * (descUnitario * contadorAuxiliar))

            console.log(contadorAuxiliar)
            vlrTotalel.innerText = total.toLocaleString('pt-br', { style: 'currency', currency: 'brl' })
            vlrel.toLocaleString('pt-br')
        })
    }

}

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









