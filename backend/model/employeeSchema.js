const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    emp_id:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    mobile:{
        type:String,
        require:true,
    },
    desigination:{
        type:String,
        require:true,
    },
    gender:{
        type:String,
        require:true,
    },
    course:{
        type:Array,
        require:true,
    },
    enroll:{
        type:String,
        require:true
    },
    profileImg:{
        type:String,
        require:true
    }
});

module.exports = mongoose.model("employeeData",EmployeeSchema);