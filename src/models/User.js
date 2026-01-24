const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        // unique : true
    },
    password : {
        type : String,
        required : true
    }
});

userSchema.pre('save' , async function(){
    this.password = await bcrypt.hash(this.password, saltRounds);
});

const User = mongoose.model('User' , userSchema);

module.exports = User;