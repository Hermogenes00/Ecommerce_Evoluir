
function onClick(event) {


    requisicao(`/admin/cart/itensCart/` + event.target.dataset.id, (data => {

        let dados = JSON.parse(data)
        let conteudo = document.getElementById('conteudo' + event.target.dataset.id)

        if (conteudo.style.display == 'none' || conteudo.style.display == '') {
            conteudo.style.display = 'block'
            conteudo.innerHTML = '';

            dados.forEach(item => {
                let linkBaixarArquivo = item.arquivo ? `    
<a class="btn btn-sm btn-outline-primary" href="/uploads/${item.arquivo}">Baixar Arquivo<i class="material-icons">cloud_download</i></a>
`: ''
                conteudo.innerHTML += `
                
                
                <div class="card bg-light mb-3">
                <div class="card-body">
        
                    <div class="row">
                        <div class="col">
                            <button onclick="enviarArquivo(event,${item.id})" class="btn btn-primary btn-sm">Enviar
                                Arquivo</button>
                        </div>
        
                        <div class="col">                    
                            <form class="form form-inline" onsubmit="remover(event,this,'Deseja realmente remover o item?')"
                                method="POST" action="/admin/cart/itemCart/delete">
                                <input type="hidden" name="idItem" value="${item.id}">
                                <input type="hidden" name="idPedido" value="${item.pedidoId}">
                                <button data-toggle="tooltip" title="Remover Item" type="submit"
                                    class=" btn btn-danger btn-sm">Remover Item</button>
                            </form>
        
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col">
                            <small>Cod: ${item.produto.id} </small>
                        </div>                       
                        <div class="col">
                            <small>Item: ${item.produto.nome}</small>
                        </div>
                        <div class="col">
                        <small>Valor:R$ ${parseFloat(item.valor).toLocaleString('pt-br')}</small>
                    </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <small>Qtd: ${item.qtd}</small>
                        </div>                      
                        <div class="col">
                            <small>Und: ${item.produto.und == 'metroQuadrado' ? 'Metro Quadrado' : 'Und'}</small>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <small>Altura: ${item.altura}</small>
                        </div>
        
                        <div class="col">
                            <small>Largura: ${item.largura}</small>
                        </div>
                    </div>
        
                    <div class="row">
                    <div class="col">
                    <small>${linkBaixarArquivo} </small>
                </div>
        
                    </div>
        
                </div>
            </div>
                `
            });

        } else {
            conteudo.style.display = 'none'
        }

    }
    )
    )


}

async function enviarArquivo(event, idProduct) {

    event.preventDefault()

    const { value: file } = await Swal.fire({
        title: 'Selecione o seu arquivo (.pdf)',
        html: `<form id="formGabarito" class="form form-inline" action="/client/upload/${idProduct}"
                            method="POST" enctype="multipart/form-data">
                            <input type="file" name="file" accept=".pdf" id="file">
                            <input type="submit" class="btn btn-primary btn-sm" value="Enviar Gabarito">
                        </form>`,
        inputAttributes: {
            'accept': '.pdf',
            'aria-label': 'Selecione o seu arquivo pdf'
        }
    })
}

function confirmForm(event, form, msg) {
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

function calcPrecoPrazo(event) {
    let tr = event.target.parentElement.parentElement
    let colPrazo = [...tr.children][1]
    let colValor = [...tr.children][2]
    let valorSFrete = document.getElementById('valorSFrete')
    let valorFrete = document.getElementById('valorFrete')
    let valorFinal = document.getElementById('valorFinal')

    colPrazo.innerHTML = `<div class="spinner-border text-dark" role="status">
    <span class="sr-only">Loading...</span>
  </div>`

    colValor.innerHTML = `<div class="spinner-border text-dark" role="status">
    <span class="sr-only">Loading...</span>
  </div>`

    requisicao(`/consultar/CalcPrecoPrazo/${event.target.dataset.idorder}/${event.target.value}`, response => {
        let obj = JSON.parse(`${response}`)

        if (!obj.error) {

            if (obj.PrazoEntrega > 0) {
                colPrazo.innerHTML = `De ${obj.PrazoEntrega} dia(s) à ${parseInt(obj.PrazoEntrega) + 20} dia(s) úteis após a produção do último item.`
            } else {
                colPrazo.innerHTML = `De 3 dias úteis à 5 dias úteis, após a produção do último item`
            }

            colValor.innerHTML = obj.Valor
            valorFrete.innerHTML = obj.Valor

            let vlrFrete, valor;
            vlrFrete = parseFloat(obj.Valor.replace('.', '').replace(',', '.'))
            valor = parseFloat(valorSFrete.dataset.valorsfrete)

            valorFinal.innerHTML = (vlrFrete + valor).toLocaleString('pt-br')

        } else {
            colPrazo.innerHTML = `Falha ao tentar consultar`
            colValor.innerHTML = `Falha ao tentar consultar`
            valorFrete.innerHTML = `Falha ao tentar consultar`
        }

    })

}