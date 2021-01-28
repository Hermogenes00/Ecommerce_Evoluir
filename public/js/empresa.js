function habilitarSelect(){
    let regimeEspecialTributacaoEl = document.getElementById('regimeEspecialTributacao')

    let valueDataset = regimeEspecialTributacaoEl.dataset.regimeespecialtributacao;
    
    for (let option in regimeEspecialTributacaoEl.children) {

        let intOption = parseInt(regimeEspecialTributacaoEl.children[option].value)

        if (intOption == valueDataset) {
            regimeEspecialTributacaoEl.children[intOption].selected=true
            break; 
        }
    }
}

window.onload = function(e){
    habilitarSelect()
 }