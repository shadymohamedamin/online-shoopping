const nodemailer = require("nodemailer");
const express=require("express");
const app=express();
//app.use(express());
const Joi=require("joi");
//const express=require("express");
const router=express.Router();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const generateToken = require("../utiles/genAuthToken");
const User=require('../models/user');

function sendEmail(to,subject,body)
{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "shadimabdrawy1999@gmail.com",
          pass: "goiv obpc ahmp yjxb",
        },
      });
      
      const mailOptions = {
        from: "shadimabdrawy1999@gmail.com",
        to: `${to}`,
        subject: `${subject}`,
        //<button onClick="window.open('https://www.google.com', '_blank')">Click me to go to Google</button>
        //text: `${text}`,<button onclick="" style="cursor:pointer;font-size:20px;background:red;color:white;padding:10px;margin:10px;border:none;outline:none;border-radius:7px;">Click me!</button>
        html:`${body}` ,
        /*attachment: [{
          filename: 'logo1.png',
          path: ,
          cid:'logo1'
      }]*/
 
      }; 
      
      //mailOptions.text += `<button>Click me!</button>`;
      transporter.sendMail(mailOptions, (err, info) => {
          if (err) { 
            console.log(err);
          } else {
            console.log("Email sent successfully!");
          }
        });
}
module.exports=sendEmail;
