const mongoose =require('mongoose');
const userModel = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    createAt:{
        type:Date,
        default:new Date()
    }
});

const userSchema = mongoose.model('userSchema',userModel);

module.exports = userSchema;