function filtrar(event) {

    let inputCliente = document.getElementById('inputCliente')
    let dateStart = document.getElementById('dateStart')
    let dateFinish = document.getElementById('dateFinish')
    let selectStatus = document.getElementById('selectStatus')

    if (selectStatus.value && inputCliente.value && dateStart.value && dateFinish.value) {
        window.location.href = `http://localhost:8090/main/orders/${inputCliente.value}/${dateStart.value}/${dateFinish.value}/${selectStatus.value}`
    }

}