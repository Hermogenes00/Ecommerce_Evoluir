
function exibirComprovante(event) {

    let formAnaliseComprovante = document.getElementById('formAnaliseComprovante')

    let comprovante = event.target.dataset.comprovante
    let idorder = event.target.dataset.idorder


    document.getElementById('previaImagem').src = comprovante
    
    formAnaliseComprovante.action = '/payment/' + idorder   
    

}


