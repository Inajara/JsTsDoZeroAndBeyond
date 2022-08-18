const Sequelize = require('sequelize')
const database = require('../Data/db')

const Palavra = database.define('palavra', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    termo: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
})

module.exports = Palavra