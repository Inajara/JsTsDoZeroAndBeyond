(async () => {
    const database = require('../Data/db')
    const Palavra = require('../Models/Palavra')
    await database.sync()
    
    await Palavra.destroy({
        where:{
            termo: "estojo"
        }
    }) 
})()