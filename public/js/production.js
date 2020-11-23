let card = document.querySelectorAll('.list-group-item')
let area = document.querySelectorAll('.area')


let dragStart = function (e) {
    this.classList.add('bg-primary')
    this.classList.add('dragging')
}

let dragEnd = function (e) {


    console.log('Chegou no dragEnd');
    let coluna = this.parentNode;
    let classes = [...coluna.classList]

    let elemento = document.getElementsByClassName('dragging')[0]

    classes.forEach(cl => {
        if (cl == 'areaAguardando') {
            requisicao(`/main/production/status/update/${elemento.dataset.id}/AGUARDANDO`, response => {

            })
        }
        if (cl == 'areaProduzindo') {
            requisicao(`/main/production/status/update/${elemento.dataset.id}/PRODUZINDO`, response => {

            })
        }
        if (cl == 'areaFinalizado') {
            requisicao(`/main/production/status/update/${elemento.dataset.id}/FINALIZADO`, response => {

            })
        }
    })

    this.classList.remove('dragging')
    this.classList.remove('bg-primary')
}

let dragOver = function (e) {

    e.target.classList.add('border-primary')
    console.log(e.target);    
    let dragging = document.querySelector('.dragging')
    this.insertBefore(dragging, e.target)

}

let dragLeave = function (e) {
    //this.classList.remove('dragging')
    e.target.classList.remove('border-primary')
    console.log('Chegou no leave');
}

let drop = function (e) {
    //this.classList.remove('dragging')
    e.target.classList.remove('border-primary')
}

card.forEach(crd => {
    crd.addEventListener('dragstart', dragStart)
    crd.addEventListener('dragend', dragEnd)
})

area.forEach(item => {
    item.addEventListener('dragleave', dragLeave)
    item.addEventListener('dragover', dragOver)
})
