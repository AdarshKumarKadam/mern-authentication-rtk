const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authenticate = async (req,res,next)=>{
    try{
        console.log("In authenticate middleware !!")

        const token = req.cookies.jwt;
        console.log("token : "+ token)
        if(!token) {
            return res.status(401).json({error:"Please login first" })
        }
        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        req.user = User.findById(decoded.user._id).select('-password');
        next();
     }catch(err){
        res.status(401)
        throw new Error('Unauthorised !')
     }
}

module.exports = authenticate;