
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
            })
        }
    })
}