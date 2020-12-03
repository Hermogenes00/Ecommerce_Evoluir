let formData = new FormData();

let inputs = document.querySelectorAll('input')

let dados = [...inputs]
let params = {}

for (d in dados) {
    params[dados[d].name] = dados[d].value;
}

requisicaoPost('http://localhost:8090/client/save', params, response => {
    console.log(response);
})

let cep = document.getElementById('cep');

document.getElementById('btnCep').addEventListener('click', (event) => {
    
    buscarCep(cep.value, response => {
        objResponse = JSON.parse(response)
        if(objResponse.uf != undefined){
            document.getElementById('rua').value = objResponse.logradouro
            document.getElementById('bairro').value = objResponse.bairro
            document.getElementById('uf').value = objResponse.uf
            document.getElementById('cidade').value = objResponse.localidade
            
            //Haverá este campo na view create - deliveryRegion
            let ibge = document.getElementById('ibge');
            if(ibge){
                ibge.value = objResponse.ibge
            }


        }else{
            alert('Cep não localizado')
        }
        
    });
})


function verCarrinho(event) {

    let cliente = document.getElementById('modal-cliente')
    cliente.innerHTML = ''
    let status = document.getElementById('modal-status')
    status.innerHTML = ''
    let total = document.getElementById('modal-total')
    total.innerHTML = ''
    let tabela = document.getElementById('modal-tabela')
    tabela.innerHTML = ''
    let idPedido = document.getElementById('modal-idPedido')
    idPedido.innerHTML = ''



    let clientId = event.target.dataset.clientid

    requisicao(`/main/order/${clientId}`, response => {
        let objJson = JSON.parse(response)

        console.log(objJson);

        cliente.innerHTML = `Cliente: ${objJson.ord.cliente.nome}`
        status.innerHTML = `Status: ${objJson.ord.status}`
        total.innerHTML = `Total: ${parseFloat(objJson.ord.total).toLocaleString("pt-br")}`
        idPedido.innerHTML = `Pedido: ${objJson.ord.id}`
        tabela.innerHTML = '';
        objJson.items.forEach(item => {
            let arquivo = item.arquivo ? `<a target="_blank" href="/uploads/${item.arquivo}" class="btn btn-warning btn-sm">Baixar Arquivo</a>` : ''
            tabela.innerHTML += `<tr>
                <td>${item.id}</td>
                <td>${item.produto.nome}</td>
                <td>${item.qtd}</td>
                <td>${parseFloat(item.valor).toLocaleString("pt-br")}</td>
                <td>${arquivo}</td>
                </tr>`
        })
    })
}