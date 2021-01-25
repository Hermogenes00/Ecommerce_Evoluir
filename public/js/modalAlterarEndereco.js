
function alterarEndereco(event) {
    let idEndereco = event.target.dataset.idaddress
    let idorder = event.target.dataset.idorder
    console.log(idEndereco);

    requisicao(`/cart/address/update/${idorder}/${idEndereco}`, response => {
        if (response) {
            Swal.fire({
                icon: 'success',
                title: 'Endereço Atualizado com sucesso',
                showConfirmButton: false,
                timer: 1500
            }).then(response=>{
                //Refresh the page
                document.location.reload()
            }).catch(err=>{})
        }
    })
}