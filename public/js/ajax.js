
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

function requisicaoPost(endereco, data, callback) {

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

    xhr.send(data)
}


function buscarCep(cep, callback) {

    requisicao('/buscarCep/' + cep, (response) => {
        callback(response)

    })
}