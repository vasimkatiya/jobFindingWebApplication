const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    avtar:{
        type:String
    },
    role : {
        type:String,
        enum:["user","recruiter"]
    },

    resumeFile : {
        type:String,
    }


},{timestamps:true});

const userModel = mongoose.model("user",userSchema);

module.exports = userModel;