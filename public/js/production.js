
function log(message) {
    console.log(message);
}

//Get all cards
const cards = document.querySelectorAll('.card')

//Get all dropzones
const dropzones = document.querySelectorAll('.dropzone')

//take the value of the dropzone
let tabDropzone = undefined

//takes the status of the selected card
let statusCard = undefined

//takes list of the dropzone selected
let listCards = undefined


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
    this.classList.add('card-reference')

}

function dragleavecard() {

    this.classList.remove('card-reference')
}


function dragend() {

    //takes the div(areaBtn) from the selected card
    let areaBtn = this.querySelector('.content').querySelector('#areaBtn')


    if (statusCard == 'EXPEDICAO') {

        areaBtn.innerHTML = ` <button class="btn btn-sm btn-primary" id="btnFinalizar" onclick="confirmarConclusao(event)" data-idOrder="${this.dataset.idorder}" data-idItemOrder="${this.dataset.iditemorder}">Finalizar</button>`
        this.querySelector('#optionTrabalho').classList.remove('visible')
        this.querySelector('#optionTrabalho').classList.add('invisible')
    } else {
        areaBtn.innerHTML = `<button data-toggle="modal" data-target="#modalParecer" class="btn btn-sm btn-danger">Cancelar</button>`
        this.querySelector('#optionTrabalho').classList.remove('invisible')
        this.querySelector('#optionTrabalho').classList.add('visible')
    }

    //Update the positions in database
    for (item in listCards) {
        if (!isNaN(item)) {

            axios.patch('/order/item/' + listCards[item].dataset.iditemorder, {
                idOrder: listCards[item].dataset.idorder,
                status: statusCard,
                posicaoTab: `${tabDropzone}${item}`
            }).then(response => {

            }).catch(err => {

            })
        }
    }

    dropzones.forEach(dropzone => {
        dropzone.classList.remove('highlight')

    })

    this.classList.remove('is-dragging')
    this.classList.remove('ghost')
}

//----------------------------------------------------------------

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

    //global variables
    statusCard = this.dataset.status
    tabDropzone = this.dataset.tabdropzone
    listCards = this.children

    this.insertBefore(cardDragging, cardReference)

}

function dragleave() {

    this.classList.remove('over')
}

function drop() {
    log('Chegou no drop')
}


//Funções para manipulação dos botões FINALIZAR E CANCELAR

function confirmarConclusao(event) {

    Swal.fire({
        title: 'Confirmação',
        text: 'Deseja realmente finalizar este trabalho?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
    }).then((result) => {
        if (result.isConfirmed) {
            axios.patch('/order/item/' + event.target.dataset.iditemorder, {
                idOrder: event.target.dataset.idorder,
                status: 'CONCLUÍDO'
            }).then(response => {

                document.location.reload()
            }).catch(err => {

            })
        }
    })
}

function cancelarTrabaho(event) {

    if(event.target.value){
        Swal.fire({
            title: 'Confirmação',
            text: 'Deseja realmente cancelar este trabalho?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.patch('/order/item/' + event.target.dataset.iditemorder, {
                    idOrder: event.target.dataset.idorder,
                    status: event.target.value
                }).then(response => {    
                    document.location.reload()
                }).catch(err => {
    
                })
            }
        })
    }

    
}


