const mongoose  = require('mongoose');
require('dotenv/config')

export const AppDbSettings = mongoose
.connect(process.env.CONNECTION_STRING,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "testeapi",
  })
.then(() => { console.log("Conectado ao banco com sucesso") })
.catch((err) => { console.log(err) })