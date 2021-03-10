let selectCategoria = document.getElementById('categoria')
let selectSubCategoria = document.getElementById('subCategoria')

requisicao('/category/categories/json', response => {
    let objJson = JSON.parse(response)
    selectCategoria.innerHTML = ''
    selectCategoria.innerHTML += `<option value="">Selecione uma categoria</option>`
    objJson.categories.forEach(cat => {
        selectCategoria.innerHTML += `<option ${(cat.id == selectCategoria.dataset.categoriaid) ? 'selected' : ''} value="${cat.id}">${cat.nome}</option>`
    })
})

function localizarSubCategoria(event) {
    selectSubCategoria.innerHTML = ''
    requisicao('/category/subCategoryByCategory/json/' + event.target.value, response => {
        let objJson = JSON.parse(response)
        console.dir(objJson);
        objJson.subCategories.forEach(scat => {
            selectSubCategoria.innerHTML += `<option value="${scat.id}">${scat.nome}</option>`
        })
    })
}