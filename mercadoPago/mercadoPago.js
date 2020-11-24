//MercadoPago
const mercadoPago = require('mercadopago')

//Chaves para acesso
const PUBLIC_KEY = 'TEST-37ef8765-47e0-43fe-869d-e80a24018acb'
const ACCESS_TOKEN = 'TEST-377894632490329-110614-f40817ed0257d721b3238430c7bea7f1-668493060'

//Configuração do mercadopago
mercadoPago.configure({
    sandbox: true,
    access_token: ACCESS_TOKEN
})

module.exports = mercadoPago;