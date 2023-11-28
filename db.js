const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://Admin:Admin1234@cluster0.aajbtwx.mongodb.net/pizzaDelivery?retryWrites=true&w=majority'

mongoose.connect(mongoURL , {useUnifiedTopology:true , useNewUrlParser:true})

var db = mongoose.connection

db.on('connected' , ()=>{
    console.log('Mongo DB Connection Successfull');
})

db.on('error' , ()=>{
    console.log(`Mongo DB Connection failed`);
})

module.exports =mongoose