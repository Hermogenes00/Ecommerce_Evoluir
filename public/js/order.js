
function showItems(event) {

   
    document.getElementById('numPedido').innerHTML = event.target.dataset.id
    let status = document.getElementById('status')
    let informe = document.getElementById('informe')

    //Tabela do modal
    let tbItensOrder = document.getElementById('tbItensOrder')

    requisicao(`/admin/cart/itensCart/` + event.target.dataset.id, (data => {

        let dados = JSON.parse(data)
     
        tbItensOrder.innerHTML=''
        dados.forEach(item => {
            let linkBaixarArquivo = item.arquivo ? `    
            <a href="/uploads/${item.arquivo}">Baixar Arquivo</a>
            `: ''
            
            tbItensOrder.innerHTML += `
                                <tr>
                                    <td>${item.produto.nome}</td>
                                    <td>${item.status?item.status:'---'}</td>
                                    <td>${parseFloat(item.valor).toLocaleString('pt-br', { style: 'currency', currency: 'brl' })}</td>
                               
                               
                                    <td>${item.qtd}</td>
                                                                   
                                    <td>${item.altura?item.altura:'---'}</td>
                                    <td>${item.largura?item.largura:'---'}</td>
                               
                                    <td>${item.produto.codRef}</td>
                               
                                    <td>${linkBaixarArquivo}</td>
                                </tr>
            `
            
        });



    }
    )
    )

    requisicao('/payment/byOrder/' + event.target.dataset.id, (response => {
        let dados = JSON.parse(response)

        status.value = dados.status
        informe.value = dados.informe
    }))

}

function remover(event, form, msg) {
    event.preventDefault();
    Swal.fire({
        title: 'Confirmação',
        text: msg,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
    }).then((result) => {
        if (result.isConfirmed) {
            form.submit()
        }
    })
}

function verificaTamanhoArquivo(event, form) {
    event.preventDefault()
    file = form.children[0]

    let byteToMb = parseFloat(file.files[0].size) * 0.000001;
    if (byteToMb > 100) {
        Swal.fire('Arquivo não pode ser maior que 100MB')
    } else {
        form.submit()
    }
}

function cancelarPedido(event, msg, form) {
    event.preventDefault()
    Swal.fire({
        title: 'Confirmação',
        text: msg,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
    }).then((result) => {
        if (result.isConfirmed) {
            form.submit()
        }
    })
}

function buscarCep() {

    let cep = document.getElementById('cep');

    document.getElementById('btnCep').addEventListener('click', (event) => {
        buscarCep(cep.value, response => {
            objResponse = JSON.parse(response)
            document.getElementById('rua').value = objResponse.logradouro
            document.getElementById('bairro').value = objResponse.bairro
            document.getElementById('complemento').value = objResponse.complemento
        });
    })
}