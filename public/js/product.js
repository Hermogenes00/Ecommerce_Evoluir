
console.log((30.8112).toLocaleString('pt-BR'));

let vlrel = document.getElementById('vlrel');
let idProduto = document.getElementById('idProduto')
let vlrTotalel = document.getElementById('vlrTotal');

let formaMedicao = document.getElementById('formaMedicao')


function lerArquivo(files) {
    if (files) {
        let imgLocal = document.getElementById('imgLocal')
        let reader = new FileReader()
        let file = files[0]        

        if(file){
            reader.readAsDataURL(file)
        }else{
            imgLocal.src=''
        }

        reader.onloadend = function(){
            imgLocal.src = reader.result 
            console.log(reader.result);
        }
    }
}


function vlrTotalMetroQuadrado(largura, altura, callback) {
    let floatLargura, floatAltura;
    floatLargura = largura.replace('.', '').replace(',', '.')
    floatAltura = altura.replace('.', '').replace(',', '.')

    if (floatLargura != undefined && !isNaN(floatLargura)) {
        if (floatAltura != undefined && !isNaN(floatAltura)) {
            result = (floatLargura * floatAltura) * parseFloat(vlrel.innerHTML)
            callback(result)
        }
    }


}
if (formaMedicao.dataset.und == 'und') {

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
        vlrTotalMetroQuadrado(largura.value, altura.value, (result => {

            vlrTotalel.innerHTML = isNaN(result) ? '0,00' : parseFloat(result).toLocaleString('pt-BR')
        }))
    })

    altura.addEventListener('keyup', (event) => {
        let result = formatReal(event.target.value)
        event.target.value = result;
        vlrTotalMetroQuadrado(largura.value, altura.value, (result => {

            vlrTotalel.innerHTML = isNaN(result) ? '0,00' : parseFloat(result).toLocaleString('pt-BR')
        }))
    })
}




let divDescricao = document.getElementById('descricao');
let texto = divDescricao.dataset.descricao
let conteudoHtml = new DOMParser().parseFromString(texto, 'text/html')
divDescricao.innerHTML = conteudoHtml.body.innerHTML


