const { default: axios } = require("axios");

function onClick(event) {

    requisicao(`/admin/cart/itensCart/` + event.target.dataset.id, (data => {

        let dados = JSON.parse(data)
        let conteudo = document.getElementById('linha' + event.target.dataset.id)

        if (conteudo.style.display == 'none' || conteudo.style.display == '') {
            conteudo.style.display = 'block'
            conteudo.innerHTML = '';

            dados.forEach(item => {
                let linkBaixarArquivo = item.arquivo ? `    
<a class="btn btn-sm btn-outline-primary" href="/uploads/${item.arquivo}">Baixar Arquivo</a>
`: ''
                conteudo.innerHTML += `
                <td colspan="6">
                            <div class="row">
                                <div class="col">
                                
                                <div class="card border-secondary">
                            <div class="card-body">
                                <div class="row">
                            <div class="col">
                                Cod:${item.produto.id}
                                <button onclick="enviarArquivo(event,${item.id})"
                                class="btn btn-primary btn-sm">Enviar Arquivo</button>
                                
                            </div>
                            <div class="col">
                                Item: ${item.produto.nome}
                            </div>
                            <div class="col">
                                Qtd: ${item.qtd}
                            </div>
                            <div class="col">
                                Valor: ${parseFloat(item.valor).toLocaleString('pt-br')}
                            </div>
                            
                            </div>
                            ${linkBaixarArquivo}
                        </div>  
                        </div>  
                                </div>
                            </div>
                        </td>
                `
            });

        } else {
            conteudo.style.display = 'none'
        }

    }
    )
    )


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