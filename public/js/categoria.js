let inputs = document.querySelectorAll('input')

    for (item in inputs) {
        switch (inputs[item].name) {
            case 'vlrProduto':
            case 'tamFinalAltura':
            case 'tamFinalLargura':
            case 'tamSangriaAltura':
            case 'tamSangriaLargura':
            case 'peso':
            case 'gramatura':
                inputs[item].addEventListener('input', (event) => {
                    console.log('Achou');
                    if (event.target.value) {
                        let valorFormatado = formatReal(event.target.value)
                        event.target.value = valorFormatado
                    }

                })
                break;
        }
    }

    let selectCategoria = document.getElementById('categoria')
    let selectSubCategoria = document.getElementById('subCategoria')
    requisicao('/category/categories/json', response => {
        let objJson = JSON.parse(response)
        
        objJson.categories.forEach(cat => {
            selectCategoria.innerHTML += `<option ${(cat.id == selectCategoria.dataset.id) ? 'selected' : ''} value="${cat.id}">${cat.nome}</option>`
        })
    })

    function localizarSubCategoria(event) {
        selectSubCategoria.innerHTML = ''
        requisicao('/category/subCategoryByCategory/json/' + event.target.value, response => {
            let objJson = JSON.parse(response)
            console.dir(objJson);
            objJson.subCategories.forEach(scat=>{
                selectSubCategoria.innerHTML += `<option value="${scat.id}">${scat.nome}</option>`
            })
        })
    }