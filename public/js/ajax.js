
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

async function enviarArquivo(event, action, ext) {

    event.preventDefault()

    await Swal.fire({
        title: `Selecione o seu arquivo (${ext})`,
        html: `<form id="formGabarito" class="form form-inline" action="${action}"
                            method="POST" enctype="multipart/form-data">
                            <input type="file" name="file" accept="${ext}" id="file">
                            <input type="submit" class="btn btn-primary btn-sm" value="Enviar Arquivo">
                        </form>`,
        inputAttributes: {
            'accept': ext,
            'aria-label': `Selecione o seu arquivo ${ext}`
        }
    })
}




function requisicaoPost(endereco, callback, data) {

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
    if (data) {
        xhr.send(data)
    } else {
        xhr.send()
    }
}


function buscarCep(cep, callback) {

    requisicao('/buscarCep/' + cep, (response) => {
        callback(response)

    })
}