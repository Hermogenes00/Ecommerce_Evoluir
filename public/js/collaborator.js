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
