let inputIdAddress = document.getElementById('idAddress');

function carregarInputs(event) {
    requisicao('/client/address/json/' + event.target.dataset.idaddress, response => {
        let obj = JSON.parse(response)

        inputIdAddress.value = obj.id
        document.getElementById('cep').value = obj.cep
        document.getElementById('rua').value = obj.rua
        document.getElementById('numero').value = obj.numero
        document.getElementById('bairro').value = obj.bairro
        document.getElementById('cidade').value = obj.cidade
        document.getElementById('uf').value = obj.uf
        document.getElementById('complemento').value = obj.complemento
    })
}

function salvar(event, form) {
    event.preventDefault()
    let id = parseFloat(inputIdAddress.value);
    if (id > 0) {
        form.action = '/client/address/update'
    } else {
        form.action = '/client/address/new'
    }

    form.submit()
}
