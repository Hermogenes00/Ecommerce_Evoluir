let btnMercadoPago = document.querySelector('.mercadopago-button')


btnMercadoPago.addEventListener('click', (event) => {
    
    pagamento(event)
})
console.dir(btnMercadoPago)
btnMercadoPago.classList.add('btn')
btnMercadoPago.classList.add('btn-primary')
//btnMercadoPago.classList.remove('mercadopago-button')

function pagamento(event) {
    alert('Chegou' + event.target.dataset.idorder)
    requisicaoPost('/order/payment/' + event.target.dataset.idorder, response => {
        let obj = JSON.parse(response)
        global.id = obj.id

        event.target.dataset.preferenceid = response.id
    })
}