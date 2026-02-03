const mongoose = require('mongoose')
require("dotenv").config();

function connectToDb(){
    mongoose.connect(process.env.mongo_uri)
    .then(()=>{
        console.log("connected to Database")
    })
}

module.exports = connectToDb