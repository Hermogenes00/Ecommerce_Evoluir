
function requisicao(endereco, callback) {

    let xhr = new XMLHttpRequest()

    xhr.open('GET', endereco, true);

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                callback(xhr.responseText)
            }
        }
    }

    xhr.send()
}

async function enviarArquivo(event,action) {

    event.preventDefault()

    const { value: file } = await Swal.fire({
        title: 'Selecione o seu arquivo (.rar)',
        html: `<form id="formGabarito" class="form form-inline" action="${action}"
                            method="POST" enctype="multipart/form-data">
                            <input type="file" name="file" accept=".rar" id="file">
                            <input type="submit" class="btn btn-primary btn-sm" value="Enviar Gabarito">
                        </form>`,
        inputAttributes: {
            'accept': '.pdf',
            'aria-label': 'Selecione o seu arquivo pdf'
        }
    })
}


function requisicaoPost(endereco, callback) {

    let xhr = new XMLHttpRequest()
    xhr.open('POST', endereco, true);
    //xhr.setRequestHeader('Content-type','application/json')
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                callback(xhr.responseText)
            }
        }
    }
    xhr.send()
}


function buscarCep(cep, callback) {

    requisicao('/buscarCep/' + cep, (response) => {
        callback(response)

    })
}