const mongoose=require("mongoose")
const {Schema,model}=mongoose;
const addressSchema=new Schema({
    streetad1:String,
    streetad2:String,
    city:String,
    state:String
})
const compSchema=new Schema({
    email:String,
    description:String,
    name:String,
    phone:String,
    typeOfOrganization:String,
    address:addressSchema
});
const Company=new model('Company',compSchema);
exports.Company=Company;