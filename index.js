const mongoose = require("mongoose");
const cors = require('cors');
const express = require("express");
const { Userprofile } = require("./models/user_profile");
const { User } = require("./models/user");
const { Event } = require("./models/eventcard");
const { Company } = require("./models/company");
const { Testimonial } = require("./models/testimonial");
const { Notice } = require("./models/notice");
const port = 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
mongoose.connect("mongodb+srv://user_1:kmit1@cluster0.o7yf1ms.mongodb.net/?retryWrites=true&w=majority", {
    useNewURLParser: true,
    useUnifiedTopology: true,
})
    .then(() => { console.log("Database connected") })
    .catch(() => { console.log("Error connecting to database") });
app.get("/", function (req, res) {
    res.send("HELOOO");
});
app.get("/user", function (req, res) {
    res.send("HELOOO");
});
app.get("/testimonials",async function(req,res){
    const Testjson= await Testimonial.find({}).sort({_id:-1});
    console.log(Testjson)
    res.send(Testjson);
})
app.get("/events/get",async function(req,res){
    const Eventjson= await Event.find({}).sort({_id:-1});
    console.log(Eventjson);
    res.send(Eventjson);
})
app.get("/notices/get",async function(req,res){
    const NoticeJson= await Notice.find({}).sort({_id:-1});
    console.log(NoticeJson);
    res.send(NoticeJson);
})
app.get("/user/add", function (req, res) {
    res.send("HUU");
});
app.post("/login",async function(req,res){
    const Try=await User.find({email:req.body.email});
    if(Try[0].email){
        if(Try[0].pwd==req.body.pwd){
            res.send({"Log":1});
        }
        else{
            res.send({"Log":2});
        }
    }
    else{
        res.send({"Log":3});
    }
})
app.post("/user/verify",async function(req,res){
    const Vlistjson=await Userprofile.find({college:req.body.college});
    console.log(Vlistjson);
    res.send(Vlistjson);
})
app.post("/user/verify/reject",async function(req,res){
    Userprofile.findOneAndDelete({studentID:req.body.studentID},(err,docs)=>{
        if(err){
            console.log(err);
        }
        else{
            User.findOneAndDelete({email:docs.email},(err,docs)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log(docs);
                }
            })
        }
    })
})
app.post("/user/verify/accept",async function(req,res){
    Userprofile.findOneAndUpdate({studentID:req.body.studentID},{status:1},(err,docs)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(docs)
        }
    } )
})
app.post("/user/verify",async function(req,res){
    const Vlistjson=await Userprofile.find({college:req.body.college});
    console.log(Vlistjson);
    res.send(Vlistjson);
})
app.post("/user/add", async function (req, res) {
    console.log((req.body))
    let profid;
    const newprofile = new Userprofile({
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        college: req.body.college,
        gender: req.body.gender,
        branch: req.body.branch,
        studentID: req.body.studentID,
        occupation: req.body.occupation,
        organization: req.body.organization,
        graduationyear: req.body.graduationyear,
        status: req.body.status,

    })
    await newprofile.save((err, prof) => {
        profid = prof._id.toString();
        console.log(profid);
    });
    const newuser = new User({
        email: req.body.email,
        pwd: req.body.pwd,
        profile: profid,
        access_code: req.body.access_code,
    });
    newuser.populate('profile')
    newuser.save()
        .then(() => console.log("SAved"))
        .then(() => { res.send("Success") });
});
app.post("/user/add/co", async function (req, res) {
    console.log((req.body))
    const newcompany = new Company({
        email: req.body.email,
        description: req.body.description,
        name: req.body.name,
        phone: req.body.phone,
        typeOfOrganization: req.body.typeOfOrganization,
        address: {
            streetad1: req.body.streetad2,
            streetad2: req.body.streetad1,
            city: req.body.city,
            state: req.body.state
        }
    })
    await newcompany.save();
    const newuser = new User({
        email: req.body.email,
        pwd: req.body.pwd,
        access_code: req.body.access_code,
    });
    newuser.save()
        .then(() => console.log("SAved"))
        .then(() => { res.send("Success") });
});

app.post("/events/add", async function (req, res) {
    console.log((req.body))
   newEvent=new Event({
    name:req.body.name,
    organiser:req.body.organiser,
    registrationlink:req.body.registrationlink,
    date:req.body.date,
    description:req.body.description
   })
    newEvent.save()
        .then(() => console.log("SAved"))
        .then(() => { res.send("Success") });
});