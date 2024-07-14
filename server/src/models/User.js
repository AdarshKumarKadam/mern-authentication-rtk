const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
},{
    timestamps: true
})
UserSchema.pre('save' ,async function(next){
    
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(13);
    this.password = await bcrypt.hash(this.password, salt);

    next();
    })

UserSchema.methods.matchPassword = async function (enteredPassword) {

    return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;