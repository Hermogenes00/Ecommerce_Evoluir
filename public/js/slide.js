function previaImagem(event) {

    let inputImagem = document.getElementById('imagem')
    let previaImagem = document.getElementById('previaImagem')
    let inputFile = event.target;
    let reader = new FileReader();

    if (inputFile.files.length > 0) {
        let file = inputFile.files[0]

        reader.readAsDataURL(file)

        reader.onloadend = () => {
            inputImagem.value = reader.result
            previaImagem.src = reader.result
        }
    }
}

function confirmacao(event, form, msg) {
    event.preventDefault()
    Swal.fire({
        title: 'Confirmação',
        text: msg,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim'
    }).then((result) => {
        if (result.isConfirmed) {
            form.submit()
        }
    })
}


function buscarSlide(event) {
    let inputBuscar = document.getElementById('buscar')
    document.location.href = inputBuscar.value;
}