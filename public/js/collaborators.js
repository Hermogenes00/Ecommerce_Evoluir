let colaborador = document.getElementById('colaborador')

document.getElementById('btnBuscar').addEventListener('click', () => {
    document.location.href = colaborador.value ? colaborador.value : 'all'
})

let btnExcluir = document.getElementById('btnExcluir')

function deleteCollaborator(event, form) {
    
    event.preventDefault()
    
    let flagConfirm = confirm('Clique em ok para confirmar a exclusão')

    if(flagConfirm){
        form.submit()
    }
}