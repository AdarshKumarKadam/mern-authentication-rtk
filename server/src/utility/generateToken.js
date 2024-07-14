const jwt = require('jsonwebtoken')

const generateToken=(res,payload)=>{

    const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1h'})
    
    res.cookie('jwt',token,{
        httpOnly:true,
        maxAge : 1*24*60*60*1000,
        secure: process.env.NODE_ENV !== 'development',
        sameSite : 'none'
    })
    console.log("Token set to cookie")
}





module.exports = generateToken;