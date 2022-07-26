const jwt = require('jsonwebtoken')
const { model } = require('mongoose')

const JWT_SECRET = 'jalaukisname' 

const fetchuser = (req,res,next) => {
    const token = req.cookies.auth;
    console.log('token',token);
    if(!token){
        res.status(401).send({error:"please header authenicate using valid token"})   
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
    next();
    } catch (error) {
        console.log(error)
        res.status(401).send({error:"please authenicate using valid token"})   
    }
    
}

module.exports = fetchuser