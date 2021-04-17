const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const connection = require('./database/connection')
const flash = require('express-flash')
const cors = require('cors')

//Sessions
let session = require('express-session')
const configSession = require('./session/config')
let SequelizeStore = require('connect-session-sequelize')(session.Store)

//Session
app.use(configSession(session,SequelizeStore))


//Config DOTENV
require('dotenv').config()

//Possibilita a utilização da api em ambientes externos ao servidor local
app.use(cors())

//BodyParser
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true, parameterLimit: 1000000 }));


//Middleware Authentication
const defaultAuthentication = require('./middleware/defaultAuthentication')

//Verificando conexão.
connection.authenticate().then(() => {
    console.log('Conectado ao banco com sucesso');
}).catch(erro => {
    console.log('Erro ao tentar conectar ao banco ' + erro);
})


//Models
const order = require('./models/order')
const itensOrder = require('./models/itensOrder')
const products = require('./models/product')
const client = require('./models/client')
const collaborator = require('./models/collaborator')
const category = require('./models/category')
const subCategory = require('./models/subCategory')
const address = require('./models/address')
const payment = require('./models/payment')
const deliveryRegion = require('./models/deliveryRegion')
const slides = require('./models/slide')
const printer = require('./models/printer')
const company = require('./models/company')
const institucional = require('./models/institucional')

//Importação dos controllers
const productController = require('./controllers/dash/productController');
const clientController = require('./controllers/site/clientController');
const clientDashController = require('./controllers/dash/clientController')
const collaboratorController = require('./controllers/dash/collaboratorController');
const orderController = require('./controllers/orderController');
const mainController = require('./controllers/dash/mainController');
const utilsController = require('./controllers/utilsController');
const categoryController = require('./controllers/dash/categoryController')
const addressController = require('./controllers/site/addressController')
const cartController = require('./controllers/site/cartController')
const deliveryRegionController = require('./controllers/deliveryRegionController');
const slideController = require('./controllers/dash/slideController');
const paymentController = require('./controllers/dash/paymentController');
const printerController = require('./controllers/dash/printerController')
const companyController = require('./controllers/dash/companyController')
const fiscalController = require('./controllers/dash/fiscalController')
const institucionalController = require('./controllers/dash/institucionalController')


//Importação da api
const addressApi = require('./api/address')
const cartApi = require('./api/cart')
const categoryApi = require('./api/category')
const clientApi = require('./api/client')
const collaboratorApi = require('./api/collaborator')
const deliveryRegionApi = require('./api/deliveryRegion')
const orderApi = require('./api/order')
const printerApi = require('./api/printer')
const productApi = require('./api/product')
const slideApi = require('./api/slide')
const paymentApi = require('./api/payment')
const subCategoryApi = require('./api/subCategory')
const itemOrderApi = require('./api/itemOrder')

//Flash Messages
app.use(flash())

//middleware para alimentar o menu
const menuMiddleware = require('./middleware/menuMiddleware')
app.use(menuMiddleware)



//Rotas
app.get('/logout', defaultAuthentication, (req, res) => {
    req.session.destroy()
    res.redirect('/')
})


app.get('/404', defaultAuthentication, (req, res) => {
    res.render('404')
})
app.get('/',defaultAuthentication, async (req, res) => {

    try {
        let prods = await products.findAll()
        let sld = await slides.findAll()

        res.render('pages/examples/login', { products: prods, slides: sld })

    } catch (error) {
        console.log('Erro ao carregar Página home->', error);
        res.send('Ops ocorreu um erro ao tentar carregar a página, tente novamente, caso o erro persista entre em contato com o suporte')
    }

})


//Controllers
app.use('/', productController)
app.use('/', clientController)
app.use('/', orderController)
app.use('/', collaboratorController)
app.use('/', mainController)
app.use('/', utilsController)
app.use('/', categoryController)
app.use('/', addressController)
app.use('/', cartController)
app.use('/', deliveryRegionController)
app.use('/', slideController)
app.use('/', paymentController)
app.use('/', printerController)
app.use('/', companyController)
app.use('/', fiscalController)
app.use('/', institucionalController)
app.use('/', clientDashController)

//Api's
app.use('/api/', productApi)
app.use('/api/', clientApi)
app.use('/api/', orderApi)
app.use('/api/', collaboratorApi)
app.use('/api/', categoryApi)
app.use('/api/', addressApi)
app.use('/api/', cartApi)
app.use('/api/', deliveryRegionApi)
app.use('/api/', slideApi)
app.use('/api/', printerApi)
app.use('/api/', paymentApi)
app.use('/api/', itemOrderApi)

//View engine ejs
app.set('view engine', 'ejs')

//Arquivos estáticos
app.use(express.static('public'))
app.use(express.static('uploads'))
app.use(express.static('gabarito'))


app.listen(process.env.PORT, () => {
    console.log('Rodando na porta '+process.env.PORT);
})

