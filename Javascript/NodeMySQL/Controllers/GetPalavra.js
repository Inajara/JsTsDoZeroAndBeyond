(async () => {
    const database = require('../Data/db')
    const Palavra = require('../Models/Palavra')
    await database.sync()
    
    const Palavras = await Palavra.findAll()
    console.log(Palavras)
})()