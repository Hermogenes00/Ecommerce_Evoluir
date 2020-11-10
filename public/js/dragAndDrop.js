let card = document.querySelectorAll('.list-group-item')
let area = document.querySelectorAll('.area')

let dragStart = function (e) {
    this.classList.add('bg-primary')
    this.classList.add('dragging')
    console.log('Iniciando o arraste');
}

let dragEnd = function (e) {
    this.classList.remove('dragging')
    this.classList.remove('bg-primary')
}

let dragOver = function (e) {
    e.target.classList.add('border-primary')
    let dragging = document.querySelector('.dragging')
    this.insertBefore(dragging, e.target)
}

let dragLeave = function (e) {
    //this.classList.remove('dragging')
    e.target.classList.remove('border-primary')
}

let drop = function (e) {
    alert('CHEGOU NO DROP')
    //this.classList.remove('dragging')
    e.target.classList.remove('border-primary')
}

card.forEach(crd => {
    crd.addEventListener('dragstart', dragStart)
    crd.addEventListener('dragend', dragEnd)
})

area.forEach(ar => {
    
    ar.addEventListener('dragover', dragOver)
    ar.addEventListener('dragleave', dragLeave)
    ar.addEventListener('drop', drop)
})