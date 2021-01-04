
function showItems(event) {

    //Id's sendo puxados do modal (modalShowOrder)
    let prodDescricao = document.getElementById('prodDescricao')
    let valor = document.getElementById('valor')
    let quantidade = document.getElementById('quantidade')
    let altura = document.getElementById('altura')
    let largura = document.getElementById('largura')
    let ref = document.getElementById('ref')
    let link = document.getElementById('link')



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
                prodDescricao.value = item.produto.nome
                quantidade.value = item.qtd
                valor = parseFloat(item.valor).toLocaleString('pt-br',{style:'currency', currency:'brl'})
                altura = item.altura
                largura = item.largura
                ref = item.produto.ref
                //link = linkBaixarArquivo

                console.log(item);
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