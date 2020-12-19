function log(message) {
    console.log(message);
}

//Get all cards
const cards = document.querySelectorAll('.card')

//Get all dropzones
const dropzones = document.querySelectorAll('.dropzone')


//Listener for the cards
cards.forEach(card => {
    card.addEventListener('dragstart', dragstart)
    card.addEventListener('drag', drag)
    card.addEventListener('dragend', dragend)
    card.addEventListener('dragover', dragovercard)
    card.addEventListener('dragleave', dragleavecard)
})


function dragstart() {

    dropzones.forEach(dropzone => {
        dropzone.classList.add('highlight')
    })

    this.classList.add('is-dragging')
    this.classList.add('ghost')
}

function drag() {

}

function dragovercard() {
    log('Sobre o cartão')
    this.classList.add('card-reference')
}

function dragleavecard() {
    log('Removido a classe')
    this.classList.remove('card-reference')
}


function dragend() {
    dropzones.forEach(dropzone => {
        dropzone.classList.remove('highlight')
    })

    this.classList.remove('is-dragging')
    this.classList.remove('ghost')

}

//Listener for the dropzones
dropzones.forEach(dropzone => {
    dropzone.addEventListener('dragenter', dragenter)
    dropzone.addEventListener('dragover', dragover)
    dropzone.addEventListener('dragleave', dragleave)
    dropzone.addEventListener('drop', drop)
})


function dragenter() {
    this.classList.add('over')
}

function dragover() {

    const cardDragging = document.querySelector('.is-dragging')
    const cardReference = document.querySelector('.card-reference')

    this.insertBefore(cardDragging, cardReference)
}

function dragleave() {
    this.classList.remove('over')
}

function drop() {

}