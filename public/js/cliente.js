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
        }else{
            alert('Cep não localizado')
        }
        
    });
})