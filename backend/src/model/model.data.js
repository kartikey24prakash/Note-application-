const mongoose = require('mongoose')

const noteschema=new mongoose.Schema({
    title:String,
    description:String
})

const model = mongoose.model("note",noteschema)

module.exports = model