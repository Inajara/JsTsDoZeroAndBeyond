const Sequelize = require('sequelize')
const sequelize =  new Sequelize('testeapi', 'root', 'frog7magus', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
})

module.exports = sequelize