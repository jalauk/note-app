const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017/notes-prototype"

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("connected to database")
    })
}

module.exports = connectToMongo