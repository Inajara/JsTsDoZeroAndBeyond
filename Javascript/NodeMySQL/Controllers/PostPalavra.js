(async () => {
    const database = require('../Data/db')
    const Palavra = require('../Models/Palavra')
    await database.sync()
    const novaPalavra = await Palavra.create({
        termo: 'dicionário'
    })
    console.log(novaPalavra)
})()