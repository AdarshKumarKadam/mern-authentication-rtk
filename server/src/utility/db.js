const  mongoose = require('mongoose')


const connectDb = ()=>{
    mongoose.connect(process.env.MONGODB_URI).then(()=>{
            console.log('connected to db')
            }).catch((err)=>{
                console.log(err)
                })

}

module.exports = connectDb;