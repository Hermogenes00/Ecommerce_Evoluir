

let vlrel = document.getElementById('vlrel');
let idProduto = document.getElementById('idProduto')
let vlrTotalel = document.getElementById('vlrTotal');

let formaMedicao = document.getElementById('formaMedicao')

function vlrTotalMetroQuadrado(largura, altura) {
    let result = 0
    if (largura != undefined && !isNaN(largura)) {
        if (altura != undefined && !isNaN(altura)) {
            result = largura * altura
            vlrTotalel.innerHTML = parseFloat(result).toLocaleString('pt-br')
            return result

        } else {
            vlrTotalel.innerHTML = parseFloat('0').toLocaleString('pt-br')
            return 0;
        }
    } else {
        vlrTotalel.innerHTML = parseFloat('0').toLocaleString('pt-br')
        return 0;
    }
}

if (formaMedicao.und == 'und') {

    let qtd = document.getElementsByName('qtd')

    let propriedadeDivisao = parseFloat(qtd[0].dataset.propriedadedivisao);
    //console.log(qtd[0].dataset.propriedadedivisao);
    //Formatando valor do item

    qtd[0].addEventListener('change', (event) => {

        let qtd = parseInt(event.target.value) / propriedadeDivisao;

        vlrTotalel.innerText = (qtd * parseFloat(vlrel.innerText)).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        vlrel.toLocaleString('pt-br')


    })
} else {

    let altura = document.getElementById('altura')
    let largura = document.getElementById('largura')

    largura.addEventListener('keyup', (event) => {
        let result = formatReal(event.target.value)
        event.target.value = result;
        vlrTotalMetroQuadrado(largura.value, altura.value)
    })

    altura.addEventListener('keyup', (event) => {
        let result = formatReal(event.target.value)
        event.target.value = result;
        vlrTotalMetroQuadrado(largura.value, altura.value)
    })
}




let divDescricao = document.getElementById('descricao');
let texto = divDescricao.dataset.descricao
let conteudoHtml = new DOMParser().parseFromString(texto, 'text/html')
divDescricao.innerHTML = conteudoHtml.body.innerHTML


