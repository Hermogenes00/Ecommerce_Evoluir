const category = require('../models/category')
const subCategory = require('../models/subCategory')
const products = require('../models/product')

const menuMiddleware = async (req, res, next) => {
    try {

        let categories = await category.findAll({
            include: [{ model: subCategory, include: products }, { model: products }]
        })

        //take categories with linkeds products
        let categoriesValid = categories.filter(cat => cat.produtos.length > 0)
               
        res.locals.menu = categoriesValid
    } catch (error) {
        console.log('Erro ao tentar consultar as categorias->' + error);
    }

    next()
}


module.exports = menuMiddleware