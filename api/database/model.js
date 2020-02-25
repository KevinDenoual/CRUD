const mongoose = require('mongoose')

const EtoileSchema = new mongoose.Schema({

    etoile: String, 
    type: String, 
    distance: String,
    imgEtoile: String,
    name: String,
    createDate: {
        type: Date,
        default: new Date()
    }
})

const etoileModel = mongoose.model('etoilecollection', EtoileSchema)

module.exports = etoileModel