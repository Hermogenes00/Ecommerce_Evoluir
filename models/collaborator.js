const sequelize = require('sequelize')
const connection = require('../database/connection')

const collaborator = connection.define('usuarios', {
    nome: {
        type: sequelize.STRING,
        allowNull: false
    },
    email: {
        type: sequelize.STRING,
        allowNull: false
    },
    password: {
        type: sequelize.TEXT,
        allowNull: false
    }

})

/*

collaborator.sync().then(clb => {
    console.log(clb);
}).catch(error => {
    console.log(error);
})
*/

module.exports = collaborator;