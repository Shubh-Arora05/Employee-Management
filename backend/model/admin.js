const mongoose = require('mongoose') ;
const bcrypt = require('bcrypt') ;
const adminSchema = new mongoose.Schema({
    email :{
        type:String,
        required:true,
        unique:true
    },
    username :{
        type:String,
        required:true,
    },
    password:{
        type:String,
    }
})

adminSchema.pre('save' ,async function (next) {
    const admin = this ;
    if(!admin.isModified('password')){
        return next() ;
    }

    try{
        const salt = await bcrypt.genSalt(3) ;
        const hashedPassowrd = await bcrypt.hash(admin.password, salt) ;
        admin.password = hashedPassowrd ;
        next() ;
    }
    catch(err){
         return next(err) ;
    }
})

adminSchema.methods.comparePassword = async function(password){

    try{
        const isMatch = await bcrypt.compare(password, this.password) ;
        return isMatch ;

    }catch(err){
        throw err ;
    }
}


const Admin = mongoose.model('Admin' ,adminSchema) ;

module.exports = Admin ;