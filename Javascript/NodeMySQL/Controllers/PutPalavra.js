(async () => {
    const database = require('../Data/db')
    const Palavra = require('../Models/Palavra')
    await database.sync()
    
    const Palavras = await Palavra.findByPk(5)
    Palavras.termo = "estojo"
    await Palavras.save()
})()