let inputName = document.getElementById('inputName')
    let inputIdAlterarNome = document.getElementById('idAlterarNome')

    let formAlterarNome = document.getElementById('formAlterarNome')
    //formAlterarNome.action = '/category/subcategory/find/'

    function buscarCategoria(event) {
        inputName.value = '';
        inputIdAlterarNome.value = ''
        let id = event.target.dataset.id
        requisicao('/category/find/' + id, (response => {

            let objJson = JSON.parse(response)
            inputName.value = objJson.nome
            inputIdAlterarNome.value = id
            formAlterarNome.action = '/category/updateName/cat'

        }))
    }

    function buscarSubCategoria(event) {
        inputName.value = '';
        inputIdAlterarNome.value = ''

        let id = event.target.dataset.id
        requisicao('/category/subcategory/find/' + id, (response => {
            let objJson = JSON.parse(response)
            inputName.value = objJson.nome
            inputIdAlterarNome.value = id
            formAlterarNome.action = '/category/updateName/scat'

        }))
    }