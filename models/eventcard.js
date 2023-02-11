const mongoose=require("mongoose");
const {Schema,model}=mongoose;
const eventCardSchema=new Schema({
    name:String,
    organiser:String,
    registrationlink:String,
    date:Date,
    description:String
})
const Event=new model('Event',eventCardSchema);
exports.Event=Event;