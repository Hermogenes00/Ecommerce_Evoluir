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


function excluirRegiao(event,form){
    event.preventDefault()
    Swal.fire({
        title: 'Confirmação',
        text: "Deseja realmente excluir a região de entrega?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim'
      }).then((result) => {
        if (result.isConfirmed) {
         form.submit()
        }
      })
}