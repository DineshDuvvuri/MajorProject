const mongoose = require("mongoose");
const Schema  =  mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type:String,
        require:true,
    }
});

//passport-local-mongoose automatically define a username and password so no required to define 
//separately in schema.
//hashing,salting,username is done automatically here by plugin


userSchema.plugin(passportLocalMongoose); 
module.exports = mongoose.model('User', userSchema);