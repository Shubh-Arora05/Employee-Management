const mongoose = require('mongoose') ;

// require('dotenv').config() ;

const mongoose_url = "mongodb+srv://shubharora:shubharora@cluster0.skii4.mongodb.net/";

// const mongoose_url = "mongodb://localhost:27017/test2";


mongoose.connect( mongoose_url) ;


const db = mongoose.connection ;



db.on('error' ,()=>{
    console.log('Error connecting to database');
})


db.on('connected' ,()=>{
    console.log('Successfully connected to database');
})


db.on('disconnected' ,()=>{
    console.log('Disconnected to database');
})

module.exports = db ;