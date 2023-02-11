const mongoose=require("mongoose");
const {Schema,model}=mongoose;
const users=new Schema({
    email:{
        type:String
    },
    pwd:{
        type:String
    },
    name:{
        type:String
    }
})
const user=model('users',users);
exports.User=user;