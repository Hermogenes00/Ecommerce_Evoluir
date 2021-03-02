const category = require('../models/category')
const subCategory = require('../models/subCategory')


const menuMiddleware = async (req, res, next) => {
    try {
        res.locals.menu = await category.findAll({ include: subCategory })
    } catch (error) {
        console.log('Erro ao tentar consultar as categorias->' + error);
    }
    next()
}


module.exports = menuMiddleware