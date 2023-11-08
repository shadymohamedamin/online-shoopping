const Joi=require("joi");
const express=require("express");
const router=express.Router();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const generateToken = require("../utiles/genAuthToken");
const User=require('../models/user');
const sendEmail=require('../utiles/sendEmail');

//sendEmail('shadimabdrawy1999@gmail.com','Reset Password','Click this link to Reset your password successfully')
//router.post
router.post('/reset-password',async(req,res,next)=>{
  try{
    const id=req.body._id;
    const user=await User.findById(id);
    const pass=req.body.password;
    const salt=await bcrypt.genSalt(10);
    //user.password=await bcrypt.hash(user.password,salt); 
    const hashedPass=await bcrypt.hash(pass,salt);
    const obj={
      _id:user._id,
      name:user.name,
      email:user.email,
      password:hashedPass,
      isAdmin:user.isAdmin,   
      createdAt:user.createdAt,
      updatedAt:user.updatedAt,
    }
    const upd_user=await User.findByIdAndUpdate(id,{$set:obj});
    console.log(upd_user);
    res.status(200).send(upd_user);
  }
  catch(err)
  {
    res.status(403).send(err);
  }
  
  
});
//update
//token
router.post('/verify-email/:email',async(req,res,next)=>{
  //const email=
  //req.body="shady_mohamed@gmail.com";
  //const arr=[1,2,3];
  console.log(req.params.email)
  try{
    const user=await User.find({email:req.params.email});
    console.log(user); 
    if(user.length)
    {
      const token=jwt.sign({_id:user[0]._id,name:user[0].name,email:user[0].email,isAdmin:user[0].isAdmin,exp: Math.floor(Date.now() / 1000) + 60},'uppersecret135711');
      //const token=generateToken(user[0]);
      const to_to='shadimabdrawy1999@gmail.com';
      const subject='Reset Password';
      var body=`<!DOCTYPE html>
      <html>
      <head>
        <title>Email from Nodemailer</title>
      </head>
      <body>
        <p style="color: blue;font-size:20px;">Click this link to Reset your password successfully</p>
        
        <a href=http://localhost:3000/reset-password/${token}>Click me!</a>
        
      </body>
      </html>`;
      sendEmail(to_to,subject,body);
      console.log(token);
      res.send("hello");
    }
    else {
      res.status(204).send("no");
      return;
    }

  }
  catch(err)
  {
    res.status(402).send(err);
  }
  
});
router.post('/auth-google',async(req,res,next)=>{
    try{ 
      //const token=req.headers.authorization.split(' ')[1].replace('Bearer ', '');
      console.log(req.body);
      console.log("yes");
      const user=await User.find({email:req.body.email});
      console.log(user);
      if(user.length==0&&!(req.body.password))
      {
            res.status(204).send("please enter password");
            return;
      }
      else if(user.length==0)
      {
        //const password=
        const salt=await bcrypt.genSalt(10);
        const pass=await bcrypt.hash(req.body.password,salt); 
        const new_user=new User({
            name:req.body.name,
            password:pass,
            email:req.body.email,
            products:[],
            isAdmin:false,
        })
        const n_user=await new_user.save();
        const token=generateToken(n_user);
        res.status(200).send(token);
        return;
      }
      else 
      {
        const token=generateToken(user[0]);
        res.status(200).send(token);
        return;
      }

      
      
    
      //const obj=await jwt.verify(token,'suppersecret135711');
      //console.log(obj)

      
    }
    catch(err)
    {
      console.log(err);
      res.status(403).send(err);
    }
  
  });

router.post("/",async(req,res)=>{
    const schema=Joi.object({
          
        email:Joi.string().min(3).max(200).required().email(),
        password:Joi.string().min(6).max(1024).required(),
        
    });
    const {error} =schema.validate(req.body);
    if(error)return res.status(400).send(error.details[0].message);
    let user=await User.find({email:req.body.email});
    //console.log(user[0].name);
    if(user.length==0)return res.status(400).send("Invalid email or password");
    
    const isValid=await bcrypt.compare(req.body.password,user[0].password);//boolean
    if(!isValid)return res.status(400).send("Invalid email or password");
    
    const token=generateToken(user[0]);
    
    res.send(token);
})

module.exports=router;