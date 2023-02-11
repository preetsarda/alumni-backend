const mongoose=require("mongoose");
const{Schema,model}=mongoose;
const userprofileSchema=new Schema({
    email:String,
    firstname:String,
    lastname:String,
    phone:String,
    college:String,
    gender:String,
    branch:String,
    studentID:String,
    occupation:String,
    organization:String,
    graduationyear:Number,
    status:Number
})
const Userprofile=new model('Userprofile',userprofileSchema);
exports.Userprofile=Userprofile;