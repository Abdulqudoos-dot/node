const { Sequelize, DataTypes } = require('sequelize')

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('devcamper', 'root', 'A03062404012z///+++///', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

try {
    sequelize.authenticate()
    console.log("Connection has been established successfully".bgBlue)
} catch (error) {
    console.log("Unable to connect to datbase", error)
}
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.bootCamp = require('../sequelizeModel/Bootcamps')(sequelize, DataTypes)

db.sequelize.sync({
    force: false
})


module.exports = db