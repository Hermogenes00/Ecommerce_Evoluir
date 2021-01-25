
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

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {

            },
            didClose: () => {
                //Refresh the page
                document.location.reload()
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Status do aceite atualizado com sucesso!!!'
        })


    }).catch(err => {
        console.log(err);
    })

}


