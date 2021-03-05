let formData = new FormData();

let inputs = document.querySelectorAll('input')

let dados = [...inputs]
let params = {}

for (d in dados) {
    params[dados[d].name] = dados[d].value;
}

//take function CONSTANT from file js/constants
requisicaoPost(`http://localhost:${CONSTANTS().PORT}/client/save`, params, response => {
    console.log(response);
})
