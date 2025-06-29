const jwt = require('jsonwebtoken') ;

// require('dotenv').config() ;
const JWT_SECRET = "123" ;

const generate_token = (payload) =>{
    const token = jwt.sign(payload , JWT_SECRET , {expiresIn :'3h'}) ;
    return token ;
}

const verify_token = (req, res, next) =>{

    try{
    const token = req.headers.authorization.split(" ")[1] ;
    if(!token){
        return res.status(401).json({message : "Invalid token"}) ;
    }
    const response = jwt.verify(token, JWT_SECRET) ;
    req.user = response ;
    next() ;
    }
    catch(err){
        res.status(401).json({message : "Invalid token"}) ;
       
    }


}

module.exports = {generate_token, verify_token } ;