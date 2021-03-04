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

//tableSession.sync({alter:true})

let hour = 3600000
let configSession = (session, SequelizeStore) => {

    return session(
        {
            secret: '602dbccda7814faeaf7c528912dfb560',
            store: new SequelizeStore({
                db: sequelize,
                expiration: 24 * 60 * 60 * 1000,
                table: 'session',
                extendDefaultFields: (defaults, session) => {
                    return {
                        data: defaults.data,
                        expires: hour * 24,
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
                expires: hour * 24,
                maxAge: hour * 24
            }
        }
    )

}



module.exports = configSession