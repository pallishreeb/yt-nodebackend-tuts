const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
        length:10
    },
    email:{
        type:String,
        required:true,
    },
    hobbies:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

module.exports = mongoose.model("User",UserSchema);