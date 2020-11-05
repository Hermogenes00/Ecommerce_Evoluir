const express = require('express')
const bodyparser = require('body-parser')
const app = express();
const session = require('express-session');
const connection = require('./database/connection')
const localStorage = require('local-storage')
const clientAuthentication = require('./middleware/clientAuthentication')
const defaultAuthentication = require('./middleware/defaultAuthentication')

//Verificando conexão.
connection.authenticate().then(() => {
    console.log('Conectado ao banco');
}).catch(erro => {
    console.log('Erro ao tentar conectar ao banco ' + erro);
})


//Models
const order = require('./models/order')
const itensOrder = require('./models/itensOrder')
const products = require('./models/product')
const client = require('./models/client')

//Importação dos controllers
const productController = require('./controllers/productController');
const clientController = require('./controllers/clientController');
const userController = require('./controllers/userController');
const orderController = require('./controllers/orderController');


//Session
app.use(session({
    secret: 'cloneLoja',
    cookie: { sameSite: 'lax', maxAge: new Date().getTime() + 9999, expires: false }
}))

//BodyParser
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

//Controllers
app.use('/', productController)
app.use('/', clientController)
app.use('/', orderController)
//app.use('/', userController)

//Rotas

app.get('/',defaultAuthentication,(req, res) => {

    products.findAll().then(products => {

        res.render('index', { products: products })

    }).catch(erro => {
        res.json(erro)
    })

})

app.get('/criarSessao/:nome',defaultAuthentication, (req, res) => {
    req.session.client = 'Santos'
    res.send('Sessão Criada')
})

app.get('/verSessao',clientAuthentication,(req, res) => { 

    res.render('admin/teste')
})


app.get('/limparCookie',defaultAuthentication, (req, res) => {
    res.clearCookie('testeCookie')
    res.render('admin/teste')
})

app.get('/logout',defaultAuthentication, (req, res) => {
    req.session.nome = undefined;
    res.redirect('/')
})

//View engine ejs
app.set('view engine', 'ejs')

//Arquivos estáticos
app.use(express.static('public'))

app.listen(8090, () => {
    console.log('Servidor iniciado');
})

