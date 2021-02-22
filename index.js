const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const connection = require('./database/connection')
const flash = require('express-flash')
const cors = require('cors')

//Sessions
const session = require('express-session')
const Sequelize = require('sequelize')
let SequelizeStore = require('connect-session-sequelize')(session.Store)

//Create database for session
var sequelize = new Sequelize("session", "root", "admin", {
    dialect: "mysql",
    host: 'localhost'
});

//Create table 
let tableSession = sequelize.define('session', {
    sid: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    userId: Sequelize.STRING,
    expires: Sequelize.DATE,
    data: Sequelize.TEXT,
})

app.use(session(
    {
        secret: '123456789',
        store: new SequelizeStore({
            db: sequelize,
            table: 'session',
            extendDefaultFields: (defaults, session) => {
                return {
                    data: defaults.data,
                    expires: defaults.expires,
                    userId: session.userId,
                }
            }
        }),
        resave: false,
        proxy: true,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 1020 * 60 * 30
        }
    }
))


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
const productController = require('./controllers/productController');
const clientController = require('./controllers/clientController');
const collaboratorController = require('./controllers/collaboratorController');
const orderController = require('./controllers/orderController');
const mainController = require('./controllers/mainController');
const utilsController = require('./controllers/utilsController');
const categoryController = require('./controllers/categoryController')
const storeController = require('./controllers/storeController')
const addressController = require('./controllers/addressController')
const cartController = require('./controllers/cartController')
const deliveryRegionController = require('./controllers/deliveryRegionController');
const slideController = require('./controllers/slideController');
const paymentController = require('./controllers/paymentController');
const printerController = require('./controllers/printerController')
const companyController = require('./controllers/companyController')
const fiscalController = require('./controllers/fiscalController')
const institucionalController = require('./controllers/institucionalController')


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


const gdrive = require('./gdrive');
const { concat } = require('./validations/clientValidation');



//Flash Messages
app.use(flash())

//Controllers
app.use('/', productController)
app.use('/', clientController)
app.use('/', orderController)
app.use('/', collaboratorController)
app.use('/', mainController)
app.use('/', utilsController)
app.use('/', categoryController)
app.use('/', storeController)
app.use('/', addressController)
app.use('/', cartController)
app.use('/', deliveryRegionController)
app.use('/', slideController)
app.use('/', paymentController)
app.use('/', printerController)
app.use('/', companyController)
app.use('/', fiscalController)
app.use('/', institucionalController)




//Api's
app.use('/', productApi)
app.use('/', clientApi)
app.use('/', orderApi)
app.use('/', collaboratorApi)
app.use('/', categoryApi)
app.use('/', addressApi)
app.use('/', cartApi)
app.use('/', deliveryRegionApi)
app.use('/', slideApi)
app.use('/', printerApi)
app.use('/', paymentApi)
app.use('/', itemOrderApi)


//app.use('/', userController)


//View engine ejs
app.set('view engine', 'ejs')

//Arquivos estáticos
app.use(express.static('public'))
app.use(express.static('uploads'))
app.use(express.static('gabarito'))

//Criação do middleware para menu

app.use(async (req, res, next) => {
    try {
        res.locals.menu = await category.findAll({ include: subCategory })
    } catch (error) {
        console.log('Erro ao tentar consultar as categorias->' + error);
    }
    next()
})

//Rotas
app.get('/', defaultAuthentication, async (req, res) => {

    try {
        let prods = await products.findAll()
        let sld = await slides.findAll()

        res.render('index', { products: prods, slides: sld })

    } catch (error) {
        console.log('Erro ao carregar Página home->', error);
        res.send('Ops ocorreu um erro ao tentar carregar a página, tente novamente, caso o erro persista entre em contato com o suporte')
    }

})


app.get('/logout', defaultAuthentication, (req, res) => {
    req.session.destroy()
    res.redirect('/')
})


app.get('/404', defaultAuthentication, (req, res) => {
    res.render('404')
})

app.listen(8090, () => {
    console.log('Rodando na porta 8090');
})

