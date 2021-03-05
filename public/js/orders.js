function filtrar(event) {

    let inputCliente = document.getElementById('inputCliente')
    let dateStart = document.getElementById('dateStart')
    let dateFinish = document.getElementById('dateFinish')
    let selectStatus = document.getElementById('selectStatus')

    //take function CONSTANTS from file js/constants.js
    if (selectStatus.value && inputCliente.value && dateStart.value && dateFinish.value) {
        window.location.href = `http://localhost:${CONSTANTS().PORT}/main/orders/${inputCliente.value}/${dateStart.value}/${dateFinish.value}/${selectStatus.value}`
    }

}