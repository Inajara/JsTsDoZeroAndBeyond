import { Sequelize } from 'sequelize'

export const ApplicationDbSettings =  new Sequelize('testeapi', 'root', 'frog7magus', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
})

try {
    ApplicationDbSettings.authenticate();
    console.log('Conectado ao banco com sucesso');
} catch (error) {
    console.error('Ocorreu um erro de conexão do tipo:', error);
}

/* new Sequelize(process.env.DATABASE_NAME, 
    process.env.DATABASE_USER,
    process.env.DATABASE_PASS, {
        dialect: 'mysql',
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT
    }) */