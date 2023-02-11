const mongoose=require("mongoose");
const {Schema,model}=mongoose;
const testimonialschema=new Schema({
    name:String,
    content:String
});
const Testimonial=new model('Testimonial',testimonialschema);
exports.Testimonial=Testimonial;