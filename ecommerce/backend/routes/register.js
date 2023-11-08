const Joi=require("joi");
const express=require("express");
const router=express.Router();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const generateToken = require("../utiles/genAuthToken");
const User=require('../models/user');

router.post("/",async(req,res)=>{
    //res.json("yes");
    /*const data={
        name:"shady",
        email:"shady",
        password:"123"
    }*/
    const schema=Joi.object({
        name:Joi.string().min(3).max(50).required(),
        email:Joi.string().min(3).max(200).email().required(),
        password:Joi.string().min(6).max(1024).required()
    });
    const {error}=schema.validate(req.body);
    if(error)return res.status(400).send(error.details[0].message);
  let user=await User.find({email:req.body.email});
    //const users = await User.find({ name: req.query.name });
    
    //let user={password:"123"};
    if(user.length>0)return res.status(400).send("user already exist");
    user=new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    //console.log(user.length);
    const salt=await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(user.password,salt); 
  user=await user.save();
    //console.log(user);
    const token=generateToken(user);
    res.send(token);
    //console.log(jwt.sign({name:"shady",role:"admin"},"shady"));
}); 


module.exports=router;