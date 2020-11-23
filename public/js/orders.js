
function onClick(event) {


    requisicao(`http://localhost:8090/admin/order/itensOrder/` + event.target.dataset.id, (data => {

        let dados = JSON.parse(data)
        let conteudo = document.getElementById('conteudo' + event.target.dataset.id)

        if (conteudo.style.display == 'none' || conteudo.style.display == '') {
            conteudo.style.display = 'block'
            conteudo.innerHTML = '';

            dados.forEach(item => {
                let linkBaixarArquivo = item.arquivo ? `<div class="col">

    
<a class="btn btn-sm btn-outline-primary" href="/uploads/${item.arquivo}"><i class="material-icons">cloud_download</i></a>
</div>`: ''
                conteudo.innerHTML += `<div class="card border-secondary">
                            <div class="card-body">
                                <div class="row">
                            <div class="col">
                                Cod:${item.produto.id}
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
                            <div class="col">
                                <form class="form form-inline" onsubmit="remover(event,this,'Deseja realmente remover o item?')" method="POST" action="/admin/order/itemOrder/delete">
                    <input type="hidden" name="idItem" value="${item.id}">
                    <input type="hidden" name="idPedido" value="${item.pedidoId}">
                    <input type="submit" class="btn btn-sm btn-danger" value="Remover Item">
                    
                </form>                  
                            </div>
                           
                            
                            </div>
                            <div class="row">
                                <div class="col">
                                    <form action="/client/upload/${item.id}" class="form form-inline" method="POST" enctype="multipart/form-data" onsubmit="verificaTamanhoArquivo(event,this)">
<input type="file" accept=".pdf" class="btn btn-outline-success btn-sm form-control mt-2" name="file" id="file">  
<input type="submit" class="btn btn-outline-success btn-sm form-control mt-2" value="Enviar"> 
</form>
                                    
                                    </div>

                                    ${linkBaixarArquivo}
                                
                                </div>
                        </div>  
                        </div>`
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