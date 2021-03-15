window.onload = event => {

    let qtdEl = document.getElementsByName('qtd')
    let vlrTotalel = document.getElementById('vlrTotal');
    let selectQtd = document.querySelector('.selectQtd')
    let contadorAuxiliarEl = document.querySelector('#contadorAuxiliar')
    if (selectQtd) {

        let vlrRel = document.getElementById('vlrel')
        vlrTotalel.innerText = (selectQtd.value * vlrRel.dataset.valortotal).toLocaleString('pt-br', { currency: 'brl', style: 'decimal', minimumFractionDigits: 2 })

        selectQtd.addEventListener('change', (event) => {

            let descontoPorcentagem = document.getElementById('descUnit')

            let qtd = parseInt(event.target.value);

            let valorSemDesconto = qtd * vlrel.dataset.valortotal
            let descontoReal = 0

            let contadorAuxiliarDS = event.target.selectedOptions[0].dataset.contadorauxiliar

            descontoReal = valorSemDesconto * (descontoPorcentagem.value / 100)
            let total = 0;

            total = valorSemDesconto

            if (contadorAuxiliarDS > 0)
                total = valorSemDesconto - descontoReal

            vlrTotalel.innerText = total.toLocaleString('pt-br', { style: 'currency', currency: 'brl', minimumFractionDigits: 2 })
            contadorAuxiliarEl.value = contadorAuxiliarDS
            vlrel.toLocaleString('pt-br', { style: 'currency', currency: 'brl', minimumFractionDigits: 2 })
        })
    } else {
        console.log('não achou o select')
    }

}
