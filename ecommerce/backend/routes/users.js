const express=require("express");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const bodyParser=require("body-parser");
const router=express.Router();
const moment=require("moment");
const cors=require("cors");
const { date } = require("joi");
router.use(cors());
router.use(express.json());
router.use(bodyParser.json());
const Order=require("../models/order");
const User=require("../models/user");
const Product = require("../models/product");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dnpyllrus",
  api_key: "489863591558694",
  api_secret: "kw89Q9XofqRIZmIWKKyqoG7uY0A",
});
router.get("/get_product/:id",async(req,res,next)=>{
    //console.log(req.params.id);  
    try{
        const product=await Product.findById(req.params.id);
        //const newProducts=products.map((item)=>{
        //    return{
        const obj={        
                _id:product._id,
                name:product.name,
                sr:product.sr,  
                desc:product.desc,
                price:product.price,
                brand:product.brand,
                createdAt:product.createdAt,
                updatedAt:product.updatedAt,
                product_quantity:product.product_quantity?product.product_quantity:0,
                sold:product.sold?product.sold:0
            }
        console.log(obj);
        res.status(200).send(obj);
    }
    catch(err)
    {
        console.log(err); 
        res.status(500).send(err);    
    }
});




router.use(function(req, res, next) {
    //console.log(req.headers);
    
    if(req.headers.authorization)
    {
        //console.log(typeof(req.headers.authorization.substring(7,11)))
        if(req.headers.authorization.substring(7,11)!='null')
        {
            //console.log("USer");
            token=req.headers.authorization.split(' ')[1].replace('Bearer ', '');
            const secret=process.env.JWT_SECRET_KEY;

            obj=jwt.verify(token,secret);
            //console.log("token: ",token);
            //console.log(obj)
            if(obj.isAdmin==false) 
            {
                //res.setHeader('Content-Type', 'text/plain');
                return res.status(403).json({ error: 'the admin only who can control in this route' });
            }
        }
        else return res.status(403).json({ error: 'you should login first' });//console.log("No User");
    }
    next();
});             


router.post("/delete_user/:id",async(req,res,next)=>{
    console.log(req.params.id);
    console.log(req.body);
    try{
        const user=await User.findByIdAndDelete(req.params.id);
        res.status(200).send(user);
    }
    catch(err)
    {
        console.log(err);
        res.status(403).send(err);
    }
});
router.post("/make_admin/:id",async(req,res,next)=>{
    console.log(req.params.id);
    console.log(req.body);
    try{
        const user=await User.findByIdAndUpdate(req.params.id,{$set:req.body});
        res.status(200).send(user);
    }
    catch(err)
    {
        console.log(err);
        res.status(403).send(err);
    }
});
//const previosMonth=moment().month(moment().month()-1).day(-9).set(date,"1").format("YYYY-MM-DD HH:mm:ss");
//console.log(previosMonth);
//const datee=moment();
//datee.format("YYYY-MM-DD HH:mm:ss")
//let dat=new Date();
//console.log(dat.toISOString().replace('T', ' '));
router.get("/stats",async(req,res,next)=>{
    const previosMonth=moment().month(moment().month()-1).day(-9).format("YYYY-MM-DD HH:mm:ss");//.set(date,"1")
    //console.log(previosMonth);
    
    try{
        const user=await User.aggregate([
            {$match:{createdAt:{$gt:new Date(previosMonth)}}},
            {$project:{month:{$month:"$createdAt"}}},
            {$group:{"_id":"$month","total":{$sum:1}}}
        ]);
        res.status(200).send(user);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err); 
    }
});


router.get("/numberOfUsers",async(req,res,next)=>{
    //const previosMonth=moment().month(moment().month()-1).day(-9).format("YYYY-MM-DD HH:mm:ss");//.set(date,"1")
    //console.log(previosMonth);
    
    try{
        const user=await User.aggregate([
            {$count:"total"}
        ]);
        res.status(200).send(user);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});

router.get("/get_users",async(req,res,next)=>{
    try{
        const users=await User.find();
        res.status(200).send(users);
    }
    catch(err){
        console.log(err);
        res.status(403).send(err);
    }
});

router.post("/create_product",async(req,res)=>{
    //console.log(req.headers);
    const obj=req.body;
    
    try{
        if(obj.sr)
        {
            //console.log(req.body);
            //console.log(process.env.CLOUDINARY_API_SECRET)
            const uppload_press=await cloudinary.uploader.upload(req.body.sr);//,{upload_preset:"onlineShop"});
            //console.log(uppload_press) 
            if(uppload_press) 
            {
                
                const product=new Product({
                    name:obj.name,
                    sr:uppload_press,
                    desc:obj.desc,
                    price:obj.price,
                    brand:obj.brand,
                    product_quantity:obj.product_quantity
                })
                //console.log(product) 
                const saved=product.save();
                //console.log("saved: ",product);
                res.send(product);//saved
            }
        }
    }
    catch(err){
        //console.log(err);
        //res.setHeader('Content-Type', 'text/plain');
        //res.status(403).json({error:"error ocured"})
        res.send(err);
    }
});



router.get("/get_products/",async(req,res,next)=>{
    try{
        const product=await Product.find();
        const newProducts=product.map((item)=>{
            return{
                _id:item._id,
                name:item.name,
                sr:item.sr,
                desc:item.desc,
                price:item.price,
                brand:item.brand,
                createdAt:item.createdAt,
                updatedAt:item.updatedAt,
                product_quantity:item.product_quantity?item.product_quantity:0,
                sold:item.sold?item.sold:0
            }

        })
        res.status(200).send(newProducts);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send(err);
    }
});


router.post("/delete_product/:id",async(req,res,next)=>{
    try{
        //const product=await Product.findOneAndDelete(req.params.id);
        
        console.log(req.params.id);
        if(req.params.id)
        {
            const product=await Product.findById(req.params.id);
            if(product)
            {
                const pub=product.sr.public_id;
                const result=await cloudinary.uploader.destroy(pub); 
                if(result)
                {
                    const product=await Product.findByIdAndDelete(req.params.id);
                    res.status(200).send(product); 
                }
                else {console.log("failed to delete image");res.status("403").send("failed to delete image");}
                //res.send("hello")
            }
            else res.status("403").send("product not exist");
        }
        else res.status(403).send("id not exist");
    }
    catch(err)
    {
        console.log(err);
        res.status(403).send(err);
    }
});

router.post("/increase_product_quantity/:id",async(req,res,next)=>{
    try{
        const old_product=await Product.findById(req.params.id);
        const obj={
            name:old_product.name,
            brand:old_product.brand,
            desc:old_product.desc,
            price:old_product.price,
            sr:old_product.sr,
            product_quantity:old_product.product_quantity+1,
            sold:old_product.sold?old_product.sold:0
          }
        const new_product=await Product.findByIdAndUpdate(req.params.id,{$set:obj});
        console.log(new_product);
        res.status(200).send(new_product);
    }
    catch(err)
    {
        console.log(err);
        res.send(err);
    }
});
router.post("/decrease_product_quantity/:id",async(req,res,next)=>{
    try{
        const old_product=await Product.findById(req.params.id);
        const obj={
            name:old_product.name,
            brand:old_product.brand,
            desc:old_product.desc,
            price:old_product.price,
            sr:old_product.sr,
            product_quantity:old_product.product_quantity-1,
            sold:old_product.sold?old_product.sold:0
          }
        const new_product=await Product.findByIdAndUpdate(req.params.id,{$set:obj});
        console.log(new_product);
        res.status(200).send(new_product);
    }
    catch(err)
    {
        console.log(err);
        res.send(err);
    }
});
/*const pub_old=product.sr.public_id;
            const pub_new=req.body.sr.public_id;
            if(pub_old!=pub_new)
            {
                const result1=await cloudinary.uploader.destroy(pub_old);
                const result2=await cloudinary.uploader.upload();
            }*/
            //const result=await cloudinary.uploader.destroy(pub);
router.post("/update_product/:id",async(req,res,next)=>{
    try{
        console.log(req.params.id);
        console.log("new product: ",req.body);
        const product=await Product.findById(req.params.id);
        console.log("old product: ",product);
        if(req.body.sr==product.sr.secure_url)
        {
            const objj={
                sr:product.sr,
                name:req.body.name,
                brand:req.body.brand,  
                price:req.body.price,
                desc:req.body.desc,
                product_quantity:req.body.product_quantity,
                sold:product.sold?product.sold:0
            };
            //cons t result=await Product.findOneAndUpdate({_id:req.params.id},{$set:obj});
            const result=await Product.findByIdAndUpdate(req.params.id,{$set:objj});//,{new:true}
            if(result)res.status(200).send(result);
            else res.status(403).send(result);
        }
        else
        {
            const pub_old=product.sr.public_id;
            const result1=await cloudinary.uploader.destroy(pub_old);
            const result2=await cloudinary.uploader.upload(req.body.sr);
            
            if(result1&&result2)
            {
                const new_product={
                    name:req.body.name,
                    brand:req.body.brand,
                    sr:result2,
                    price:req.body.price,
                    desc:req.body.desc,
                    product_quantity:req.body.product_quantity,
                    sold:product.sold?product.sold:0
                }
                const prod=await Product.findByIdAndUpdate(req.params.id,{$set:new_product});
                res.status(200).send(prod);
            }
            else res.status(403).send({result1,result2});
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(403).send(err);
    }
    
    /*try{
        //const product=await Product.findOneAndDelete(req.params.id);
        //console.log("deleted");
        const product=await Product.findById(req.params.id);
        if(product)
        {
            const pub_old=product.sr.public_id;
            const result1=await cloudinary.uploader.destroy(pub_old);
            const result2=await cloudinary.uploader.upload(req.body.sr);
            
            if(result1&&result2)
            {
                const new_product={
                    name:req.body.name,
                    brand:req.body.brand,
                    sr:result,
                    price:req.body.price,
                    desc:req.body.desc
                }
                const product=await Product.findOneAndUpdate({_id:req.params.id},{$set:new_product});
                res.status(200).send("Product updated successfully");
            }
            else {console.log("failed to upload image");res.status("403").send("failed to upload image");}
        }
        else res.status("403").send("product not exist");
        
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send(err);
    }*/
});    

module.exports=router; 