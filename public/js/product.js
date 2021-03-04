
document.getElementById('qtd').addEventListener('keyup', event => {
    let result = formatReal(event.target.value)
    event.target.value = result;
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
    let vlrel = document.getElementById('vlrel');
    let vlrTotalel = document.getElementById('vlrTotal');
    let formaMedicao = document.getElementById('formaMedicao')

    if (formaMedicao != null && formaMedicao.dataset.und == 'und') {

        let qtd = document.getElementsByName('qtd')

        let propriedadeDivisao = parseFloat(qtd[0].dataset.propriedadedivisao);
        //console.log(qtd[0].dataset.propriedadedivisao);
        //Formatando valor do item

        qtd[0].addEventListener('change', (event) => {

            let qtd = parseInt(event.target.value) / propriedadeDivisao;
            let total = (qtd * vlrel.dataset.valortotal)
            vlrTotalel.innerText = total.toLocaleString('pt-br', { style: 'currency', currency: 'brl' })
            vlrel.toLocaleString('pt-br')


        })
    } else {

        let altura = document.getElementById('altura')
        let largura = document.getElementById('largura')


        largura.addEventListener('keyup', (event) => {
            let result = formatReal(event.target.value)
            event.target.value = result;
            vlrTotalMetroQuadrado(largura.value, altura.value, (result => {

                vlrTotalel.innerHTML = isNaN(result) ? '0,00' : parseFloat(result).toLocaleString('pt-br', { style: 'currency', currency: 'brl' })
            }))
        })


        altura.addEventListener('keyup', (event) => {
            let result = formatReal(event.target.value)
            event.target.value = result;
            vlrTotalMetroQuadrado(largura.value, altura.value, (result => {

                vlrTotalel.innerHTML = isNaN(result) ? '0,00' : parseFloat(result).toLocaleString('pt-BR').toLocaleString('pt-br', { style: 'currency', currency: 'brl' })
            }))
        })
    }

    let divDescricao = document.getElementById('descricao');
    let texto = divDescricao.dataset.descricao
    let conteudoHtml = new DOMParser().parseFromString(texto, 'text/html')
    divDescricao.innerHTML = conteudoHtml.body.innerHTML
}









