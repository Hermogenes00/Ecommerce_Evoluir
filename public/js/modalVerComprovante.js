
let idorder = undefined

function exibirComprovante(event) {

    let formAnaliseComprovante = document.getElementById('formAnaliseComprovante')

    let comprovante = event.target.dataset.comprovante
    idorder = event.target.dataset.idorder


    document.getElementById('previaImagem').src = comprovante

    formAnaliseComprovante.action = '/payment/' + idorder


}

function analiseComprovante(event) {

    let status = document.getElementById('status')
    let informe = document.getElementById('informe')

    axios.post('/payment/' + idorder,
        { status: status.value, informe: informe.value }
    ).then((response) => {
        console.log('Chegou no response');
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {

            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Status do aceite atualizados com sucesso!!!'
        })

    }).catch(err => {
        console.log(err);
    })

}


