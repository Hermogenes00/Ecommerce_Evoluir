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

function dragend() {
    dropzones.forEach(dropzone => {
        dropzone.classList.remove('highlight')
    })

    this.classList.remove('is-dragging')
    this.classList.remove('ghost')

}

//Listener for the dropzones
dropzones.forEach(dropzone=>{
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
    this.appendChild(cardDragging)
}

function dragleave() {
    this.classList.remove('over')
}

function drop() {
    
}