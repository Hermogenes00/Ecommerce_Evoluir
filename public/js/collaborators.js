let colaborador = document.getElementById('colaborador')
let btnCep = document.getElementById('btnCep')
let btnBuscar = document.getElementById('btnBuscar')

if(btnBuscar){
    btnBuscar.addEventListener('click', () => {
        document.location.href = colaborador.value ? colaborador.value : 'all'
    })
}

if(btnCep){
    btnCep.addEventListener('click', (event) => {    
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
}


let btnExcluir = document.getElementById('btnExcluir')

function deleteCollaborator(event, form) {
    
    event.preventDefault()
    
    let flagConfirm = confirm('Clique em ok para confirmar a exclusão')

    if(flagConfirm){
        form.submit()
    }
}