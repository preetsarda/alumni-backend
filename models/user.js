const mongoose=require("mongoose");
const { userprofile } = require("./user_profile");

const {Schema,model}=mongoose;
const Usersc=new Schema({
    email:{
        type:String,
        lowercase:true
    },
    pwd:{
        type:String,
        minLength:8,
        validate:()=>{

        }
    },
    profile:{ type:mongoose.SchemaTypes.ObjectId,
    ref:"userprofile"},
    access_code:{
        type:Number,
    }
})
const User=model('User',Usersc);
exports.User=User;