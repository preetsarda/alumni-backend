const mongoose=require("mongoose");
const{Schema,model}=mongoose;
const noticeschema=new Schema({
    title:String,
    body:String,
    by:String,
    postedon:Date,
})
const Notice=new model('Notice',noticeschema);
exports.Notice=Notice;