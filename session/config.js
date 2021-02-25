//Sessions
const Sequelize = require('sequelize')

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

let configSession = (session,SequelizeStore) => {

    return session(
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
    )

}



module.exports = configSession