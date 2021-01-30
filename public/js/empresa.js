function habilitarSelect(element){
    let el = document.getElementById(element)

    let valueDataset = el.dataset[element.toLowerCase()];
    
    for (let option in el.children) {

        let intOption = parseInt(el.children[option].value)

        if (intOption == valueDataset) {
            el.children[option].selected=true
            break; 
        }
    }
    //

}

window.onload = function(e){
    habilitarSelect('regimeEspecialTributacao')
    habilitarSelect('naturezaOperacao')
    habilitarSelect('regimeTributario')
 }