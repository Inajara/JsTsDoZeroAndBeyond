const Mongoose = require('mongoose')

main().catch(err => console.log(err))

async function main() {
    await Mongoose.connect('mongodb+srv://Inajara:frog7magus@cluster0.mtiva.mongodb.net/?retryWrites=true&w=majority');
}

Mongoose.connection.on('open', () => {
    console.log("Connected to Mongoose")
})
module.exports = Mongoose