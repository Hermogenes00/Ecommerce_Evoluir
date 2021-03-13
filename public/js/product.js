window.onload = event => {

    let qtdEl = document.getElementsByName('qtd')
    let vlrTotalel = document.getElementById('vlrTotal');
    let selectQtd = document.querySelector('.selectQtd')
    let vlrRel = document.getElementById('vlrel')
    vlrTotalel.innerText = (selectQtd.value * vlrel.dataset.valortotal).toLocaleString('pt-br', { currency: 'brl', style: 'currency' })


    if (qtdEl.length > 0) {

        qtdEl[0].addEventListener('change', (event) => {

            let descontoPorcentagem = document.getElementById('descUnit')
            let propriedadeDivisao = parseFloat(qtdEl[0].dataset.propriedadedivisao);

            let qtd = parseInt(event.target.value);

            let valorSemDesconto = qtd * vlrel.dataset.valortotal
            let descontoReal = 0
            
            let contadorAuxiliar = event.target.selectedOptions[0].dataset.contadorauxiliar

            descontoReal = valorSemDesconto * (descontoPorcentagem.value / 100)
            let total = 0;

            total = valorSemDesconto
            console.log(contadorAuxiliar)
            if (contadorAuxiliar > 0)
                total = valorSemDesconto - descontoReal

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









