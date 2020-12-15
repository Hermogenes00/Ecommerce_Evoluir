
let comprovante = undefined;

function exibirComprovante(event){
    comprovante = event.target.dataset.comprovante
    document.getElementById('previaImagem').src = comprovante
}


