const Sequelize = require('sequelize')
const sequelize =  new Sequelize('testeapi', 'root', 'frog7magus', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
})

try {
    sequelize.authenticate();
    console.log('Conectado ao banco com sucesso');
  } catch (error) {
    console.error('Ocorreu um erro de conexão do tipo:', error);
  }

module.exports = sequelize