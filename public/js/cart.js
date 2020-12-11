
let selectCidade = document.getElementById('selectCidade')
let selectEstado = document.getElementById('selectEstado')
let areaItens = document.getElementById('areaItens')



selectCidade.addEventListener('change', function () {
    requisicao(`/consultar/CalcPrecoPrazo/${this.dataset.idorder}/RETIRA_BASE/${selectCidade.value}`,
        result => {
            console.log(result);
        })
})

selectEstado.addEventListener('change', function () {
    requisicao(`/consultar/CalcPrecoPrazo/${selectCidade.dataset.idorder}/RETIRA_BASE/${selectCidade.value}`,
        result => {
            console.log(result);
        })
})


requisicao(`/admin/cart/itensCart/` + document.getElementById('idOrder').value, (data => {
    let itens = JSON.parse(data)
    itens.forEach(item => {
        let tamanho = item.altura ? `<small>Altura: ${item.altura} Largura: ${item.largura} </small>` : ``
        let linkBaixarArquivo = item.arquivo ? `    
<a class="btn btn-sm btn-outline-primary mt-2" href="/uploads/${item.arquivo}">Baixar Arquivo<i class="material-icons">cloud_download</i></a>
`: ''
        areaItens.innerHTML += `<div class="row">
        <div class="col-md-2">
            <button onclick="enviarArquivo(event,${item.id})" class="btn btn-primary btn-sm">${item.arquivo ? 'Substituir Arquivo' : 'Enviar Arquivo'}</button>
            ${linkBaixarArquivo}
        </div>
        <div class="col-md-4 text-left">
            <h6>${item.produto.nome}</h6>
            ${tamanho}
        </div>
        <div class="col-md-1">${item.qtd} und</div>
        <div class="col-md-2">${item.produto.previsaoProducao} Dias úteis.</div>
        <div class="col-md-1">${parseFloat(item.valor).toLocaleString('pt-br', { style: 'currency', currency: 'brl' })}</div>
        <div class="col-md-2 text-center">
        <form class="form form-inline" onsubmit="remover(event,this,'Deseja realmente remover o item?')"
                                method="POST" action="/admin/cart/itemCart/delete">
                                <input type="hidden" name="idItem" value="${item.id}">
                                <input type="hidden" name="idPedido" value="${item.pedidoId}">
                                <button data-toggle="tooltip" title="Remover Item" type="submit"
                                    class=" btn btn-danger"><i class="fas fa-trash-alt"></i></button>
                            </form>
        
        </div>        
    </div>
    <hr>`
    })

}
)

)


requisicao('/main/deliveryRegion/uf', response => {
    let objResponse = JSON.parse(response)
    let selectEstado = document.getElementById('selectEstado')
    objResponse.forEach(item => {
        selectEstado.innerHTML += `<option value="${item.uf}">${item.uf}</option>`;
    })

})


function buscarCidadeByUf(event) {
    requisicao(`/main/deliveryRegion/cidadeByUf/${event.target.value}`, response => {
        let objResponse = JSON.parse(response)
        let selectCidade = document.getElementById('selectCidade')
        selectCidade.innerHTML = '<option value="">Selecione a cidade...</option>'
        objResponse.forEach(item => {
            selectCidade.innerHTML += `<option value="${item.id}">Rua: ${item.rua} Nº: ${item.numero} Bairro: ${item.bairro} Cidade: ${item.cidade} Estabelecimento: ${item.estabelecimento}</option>`;
        })
    })
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
    let colPrazo = undefined
    let colValor = undefined
    let valorFrete = document.getElementById('valorFrete')
    let valorFinal = document.getElementById('valorFinal')
    let response = undefined;

    if (event.target.value != 'RETIRA_BASE') {

        colPrazo = [...tr.children][1]
        colValor = [...tr.children][2]

        colPrazo.innerHTML = `<div class="spinner-border text-dark" role="status">
        <span class="sr-only">Loading...</span>
      </div>`

        colValor.innerHTML = `<div class="spinner-border text-dark" role="status">
        <span class="sr-only">Loading...</span>
      </div>`
    }

    if (event.target.value == 'RETIRA_BASE') {

        requisicao(`/consultar/CalcPrecoPrazo/${event.target.dataset.idorder}/${event.target.value}/${selectCidade.value}`, result => {
            response = result

            let obj = JSON.parse(response)

            if (!obj.error) {

                valorFrete.innerHTML = 'Frete: ' + parseFloat(obj.Valor).toLocaleString('pt-br', { style: 'currency', currency: 'brl' })

                let total = parseFloat(obj.Valor) + parseFloat(valorFrete.dataset.valorsemfrete)
                valorFinal.innerHTML = 'Total: ' + total.toLocaleString('pt-br', { style: 'currency', currency: 'brl' })

            } else {
                colPrazo.innerHTML = `Falha ao tentar consultar, tente novamente mais tarde`
                colValor.innerHTML = `Falha ao tentar consultar, tente novamente mais tarde`
                //valorFrete.innerHTML = `Falha ao tentar consultar, tente novamente mais tarde`
            }
        })


    } else {


        requisicao(`/consultar/CalcPrecoPrazo/${event.target.dataset.idorder}/${event.target.value}`, result => {
            response = result

            let obj = JSON.parse(`${response}`)

            if (!obj.error) {

                if (obj.PrazoEntrega > 0) {
                    colPrazo.innerHTML = `De ${obj.PrazoEntrega} dia(s) à ${parseInt(obj.PrazoEntrega) + 20} dia(s) úteis após a produção do último item.`
                } else {
                    colPrazo.innerHTML = `De 3 dias úteis à 5 dias úteis, após a produção do último item`
                }

                colValor.innerHTML = obj.Valor
                valorFrete.innerHTML = 'Frete: ' + parseFloat(obj.Valor).toLocaleString('pt-br', { style: 'currency', currency: 'brl' })

                let total = parseFloat(obj.Valor.replace('.', '').replace(',', '.')) + parseFloat(valorFrete.dataset.valorsemfrete)
                valorFinal.innerHTML = 'Total: ' + total.toLocaleString('pt-br', { style: 'currency', currency: 'brl' })

            } else {
                colPrazo.innerHTML = `Falha ao tentar consultar, teve novamente mais tarde`
                colValor.innerHTML = `Falha ao tentar consultar, teve novamente mais tarde`
                valorFrete.innerHTML = `Falha ao tentar consultar, teve novamente mais tarde`
            }
        })
    }

}