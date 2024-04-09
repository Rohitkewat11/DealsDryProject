const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    profileImg:{
        type:String,
        require:true
    },
    token:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model("AdminData",adminSchema);