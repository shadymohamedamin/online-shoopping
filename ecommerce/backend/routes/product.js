const express=require("express");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const bodyParser=require("body-parser");
const router=express.Router();
const bcrypt=require("bcrypt");
//const cloudinary=require('../utiles/cloudinary');
const Product=require("../models/product");
const cors=require("cors");
router.use(cors());
router.use(express.json());
router.use(bodyParser.json());
const User=require("../models/user");
const Order = require("../models/order");
//name:"shady",sr:image,desc:"product",price
//console.log("shady");
//const isAdminIs=require("../middleWare/auth");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dnpyllrus",
  api_key: "489863591558694",
  api_secret: "kw89Q9XofqRIZmIWKKyqoG7uY0A",
});
/*router.get('/get_get',async(req,res,next)=>{
    console.log("hello");
    
    const products=await Product.find();
    //for(var i=0;i<products.length;i++)
    //{
        
        /*const cat=products[i].brand;
        delete products[i].brand;
        const obj={
                name:products[i].name,
                sr:products[i].sr,
                desc:products[i].desc,
                price:products[i].price,
                category:cat,
                createdAt:products[i].createdAt,
                updatedAt:products[i].updatedAt,
                product_quantity:products[i].product_quantity?item.product_quantity:0,
        }*/
        //delete products[i].category
        //const result=await Product.findByIdAndUpdate(products[i]._id);
        
    //}
/*    const newProducts=await Product.find(); 
    console.log(newProducts);
    res.status(200).send(newProducts);
})*/
router.get("/",async(req,res)=>{
    //console.log("shady");
    try{
        const products=await Product.find();
        const newProducts=products.map((item)=>{
            return{
                _id:item._id,
                name:item.name,
                sr:item.sr,
                desc:item.desc,
                price:item.price,
                brand:item.brand,
                createdAt:item.createdAt,
                updatedAt:item.updatedAt,
                product_quantity:item.product_quantity?item.product_quantity:"0",
                sold:item.sold?item.sold:0
            }
        })
        res.status(200).send(newProducts);
    }
    catch(err)
    {
        console.log(err);
        res.send(err);
    }
    
})
router.post('/category',async(req,res,next)=>{
    try{
        console.log(req.body);
        var s="";
        s=req.body.name;
        var type=req.body.type;
        var products=[];
        
        if(type=='name')products=await Product.find({name:{$regex:`${s}`}});
        if(type=='category')products=await Product.find({brand:{$regex:`${s}`}});
        //if(type=='id')products=await Product.find({_id:{$regex:`${s}`}});
        if(type=='description')products=await Product.find({desc:{$regex:`${s}`}});
        if(type=='price')products=await Product.find({price:{$regex:`${s}`}});
        if(s=="")products=await Product.find();
        //console.log(products);
        res.status(200).send(products);
    }
    catch(err)
    { 
        res.status(403).send(err); 
    } 
});


/*app.post('/category',(req,res,next)=>{
    //alert(req.body.title_btn);
    var s="";
    s=req.body.name;
    Product.find({category:{$regex:`${s}`}},'title price taxes ads discount total count category',(error,result)=>{
      if(error){console.log(error);}
      else {res.json(result);} 
    });
  });*/

router.get("/get_user/:id",async(req,res,next)=>{
    try{
        const user=await User.findById(req.params.id);
        res.status(200).send(user);
    }
    catch(err)
    {
        console.log(err);
        res.status(403).send(err);
    }
});


router.use(function(req, res, next) {
    //console.log(req.headers);
    //console.log(req.body);

    //if (!req.headers.authorization) {
    //  return res.status(403).json({ error: 'No credentials sent!' });
    //}
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
            //if(obj.isAdmin==false){return res.status(403).json({ error: 'the admin only who can control in this route' });}
        }
        else return res.status(403).json({ error: 'you should login first' });//console.log("No User");
    }
    next();
});

router.post('/get_orders/:id',async(req,res,next)=>{
    try{
        console.log(req.params.id);
        const orders=await Order.find({userId:req.params.id});
        console.log(orders);
        res.status(200).send(orders);
    }
    catch(err)
    {
        console.log(err);
        res.status(403).send(err);
    }
})


router.get("/get_user_products/:id",async(req,res,next)=>{
    console.log(req.params.id);
    //console.log(req.body);
    
    try{
        const user=await User.findById(req.params.id);
        
        if(user){
            //user["products"]=req.body;
            //const new_user=await User.findByIdAndUpdate({_id:req.params.id},{$set:user});
            //res.send("hello")
            console.log("get",user.products);
            if(user.products)res.status(200).send(user.products);
            else res.status(200).send([]);
        }
        else res.status(403).send("User is not exist");
        
    }
    catch(err)
    {
        console.log(err);
        res.status(403).send(err);
    }
});
router.post("/update_user_products/:id",async(req,res,next)=>{
    console.log(req.params.id);
    console.log(req.body); 
    const prod=req.body;
    try{
        var user=await User.findById(req.params.id);
        const obj={
            _id:user._id,
            name:user.name,
            email:user.email,
            password:user.password,
            createdAt:user.createdAt,
            updatedAt:user.updatedAt,
            isAdmin:user.isAdmin,
            products:prod
        }
        if(user){
            //user["products"]=req.body;
            console.log("old user",obj);
            const new_user=await User.findByIdAndUpdate(req.params.id,{$set:obj});
            //res.send("hello")
            //cnsole.
            console.log("new user",new_user);
            res.status(200).send(new_user.products);
        }
        else res.status(403).send("User is not exist");
            
    }
    catch(err)
    {
        console.log(err);
        res.status(403).send(err);
    }
});


router.post("/update_user/:id",async(req,res,next)=>{
    
    try{
        console.log(req.params.id);
    console.log(req.body);
    const obj={
        _id:req.body._id,
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        createdAt:req.body.createdAt,
        updatedAt:req.body.updatedAt,
        isAdmin:req.body.isAdmin?req.body.isAdmin:false
    }
    const password=req.body.new_password;
    //console.log(password)//res.send("hello");
    if(password=="")
    {
        const result=await User.findByIdAndUpdate(req.params.id,{$set:obj});
        if(result)res.status(200).send(result);
        else res.status(403).send(result);
    }
    else 
    {
        const hashed=await bcrypt.hash(password,10);
        obj["password"]=hashed;
        const result=await User.findByIdAndUpdate(req.params.id,{$set:obj});
        if(result)res.status(200).send(result);
        else res.status(403).send(result);
    }
        //const f=await isHashedWithBcrypt(req.body.new_password,req.body.password);
        //console.log(f);
        // res.send("hello");
        //isPasswordHashedWithBcrypt
        //const user=await User.findByIdAndUpdate(req.params.id,{$set:req.body});
        //res.status(200).send(user);
    }
    catch(err)
    {
        console.log(err);
        res.status(403).send(err);
    }
    //res.send(hashed);
    //const isValid=await bcrypt.compare('123456',hashed);//boolean
    //if(!isValid)return res.send("Invalid email or password");
    //else return res.send("valid email and password");
    //const hashed=await bcrypt.hash(password,10);
    //const f=await bcrypt.compare(password,hashed);
    //const f=await isBcryptPassword(password);
    //var f=false;
    //if(f)res.send("true"); 
    //else res.send("false"); 
    //res.send(hashed);
    
});




router.post("/get_the_total_cart",async(req,res,next)=>{
    console.log(req.body);
    try{
        const product=await Product.find({_id:{$in:req.body}});
        //console.log(product);
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
        //console.log("success");
        res.status(200).send(newProducts);
    }
    catch(err)
    {
        console.log(err);
        res.status(403).send(err);
    }
})
module.exports=router;