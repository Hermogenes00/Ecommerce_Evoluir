function filtrar(event){

    let inputCliente = document.getElementById('inputCliente')
    let dateStart = document.getElementById('dateStart')
    let dateFinish = document.getElementById('dateFinish')
    let selectStatus = document.getElementById('selectStatus')

    if(inputCliente.value && dateStart.value && dateFinish.value){
        window.location.href = `http://localhost:8090/admin/payment/${inputCliente.value}/${dateStart.value}/${dateFinish.value}/${selectStatus.value}`
    }
    
}