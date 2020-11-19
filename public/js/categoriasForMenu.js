let menu = document.getElementById('menuCategoria')


requisicao('products/categories', response => {

    let objJson = JSON.parse(response);
    console.dir(objJson)
    menu.innerHTML = '';
    let Stringmenu = ''
    for (cat in objJson) {
        Stringmenu += `<li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            ${objJson[cat].nome}              
        </a>`

        for (scat in objJson[cat].subcategorias) {
            Stringmenu += `                
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="/products/findByCategory/${objJson[cat].subcategorias[scat].slug}">${objJson[cat].subcategorias[scat].nome}</a>
                </div>
            </li>
                `
        }
    }
    menu.innerHTML = Stringmenu

})