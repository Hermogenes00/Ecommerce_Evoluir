
let qtd = document.getElementsByName('qtd')
let vlrel = document.getElementById('vlrel');
let idProduto = document.getElementById('idProduto')
let vlrTotalel = document.getElementById('vlrTotal');

let propriedadeDivisao = parseFloat(qtd[0].dataset.propriedadedivisao);

//console.log(qtd[0].dataset.propriedadedivisao);
//Formatando valor do item

qtd[0].addEventListener('change', (event) => {

    let qtd = parseInt(event.target.value) / propriedadeDivisao;

    vlrTotalel.innerText = (qtd * parseFloat(vlrel.innerText)).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    vlrel.toLocaleString('pt-br')


})


let divDescricao = document.getElementById('descricao');
let texto = divDescricao.dataset.descricao
let conteudoHtml = new DOMParser().parseFromString(texto, 'text/html')
divDescricao.innerHTML = conteudoHtml.body.innerHTML


