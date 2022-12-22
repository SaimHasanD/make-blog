const mongoose = require("mongoose")
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : false
    },
    userName : {
        type : String,
        required : true
    },  
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }

});

UserModel.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);