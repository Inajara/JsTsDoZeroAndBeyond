(async () => {
    const database = require('./Data/db')
    const Palavra = require('./Models/Palavra')
    await database.sync()
    /* const novaPalavra = await Palavra.create({
        termo: 'dicionário'
    })
    console.log(novaPalavra) */
    //const Palavras = await Palavra.findByPk(4)
    //console.log(Palavras)

    /* Palavras.termo = "estojo"
    await Palavras.save() */

    //await Palavras.destroy()

    //captura e exclusao numa chamada só
    /* await Palavra.destroy({
        where:{
            termo: "abelha"
        }
    }) */
})()