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
            if(obj.isAdmin==false){return res.status(403).json({ error: 'the admin only who can control in this route' });}
        }
        else return res.status(403).json({ error: 'you should login first' });//console.log("No User");
    }
    next();
});
//const previosMonth=moment().month(moment().month()-1).day(-9).set(date,"1").format("YYYY-MM-DD HH:mm:ss");
//console.log(previosMonth);
//const datee=moment();
//datee.format("YYYY-MM-DD HH:mm:ss")
//let dat=new Date();
//console.log(dat.toISOString().replace('T', ' '));
router.get("/get_orders",async(req,res,next)=>{
    console.log("yes")
    try{
        const orders=await Order.find();
        //console.log(orders);
        /*const rows=orders.map((items,index)=>{
            //console.log(orders?.shipping?.name);
            return {
                id:orders._id,
                name:orders.shipping.name,
                amount:(orders.total/100).toLocaleString(),
                status:orders.delivery_status,
                dat:moment(orders.createdAt).fromNow()
            }
        });*/
        //console.log(orders);
        
        res.status(200).send(orders);
    }
    catch(err)
    {
        console.log(err);
        res.status(403).send(err);
    }
})
router.get("/get_order/:id",async(req,res,next)=>{
    try{
        const order=await Order.findById(req.params.id);
        res.status(200).send(order);
    }
    catch(err) 
    {
        console.log(err);
        res.status(403).send(err);
    }
});
router.post("/update_orders/:id",async(req,res,next)=>{
    console.log(req.params.id);
    console.log(req.body);

    try{
        const orders=await Order.findByIdAndUpdate(req.params.id,{$set:req.body});
        res.status(200).send(orders); 
        //res.send("hello");
    }
    catch(err)
    {
        console.log(err);
        res.status(403).send(err);
    }
})
router.get("/stats",async(req,res,next)=>{
    const previosMonth=moment().month(moment().month()-1).day(-9).format("YYYY-MM-DD HH:mm:ss");//.set(date,"1")
    //console.log(previosMonth);
    
    try{
        const order=await Order.aggregate([
            {$match:{createdAt:{$gt:new Date(previosMonth)}}},
            {$project:{month:{$month:"$createdAt"}}},
            {$group:{"_id":"$month","total":{$sum:1}}}
        ]);
        res.status(200).send(order);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});

router.get("/income/stats",async(req,res,next)=>{
    
    const previosMonth=moment().month(moment().month()-1).day(-9).format("YYYY-MM-DD HH:mm:ss");//.set(date,"1")
    try{
        const order=await Order.aggregate([
            {$match:{createdAt:{$gt:new Date(previosMonth)}}},
            {$project:{month:{$month:"$createdAt"},sales:"$total"}},
            {$group:{"_id":"$month","total":{$sum:"$sales"}}}
        ]);
        console.log(order);
        res.status(200).send(order);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err); 
    }
});
//console.log(moment().day(moment().day()-7).format("YYYY-MM-DD HH:mm:ss"))
router.get("/week-sales",async(req,res,next)=>{
    //console.log(req.query)
    const previosWeek=moment().day(moment().day()-7).format("YYYY-MM-DD HH:mm:ss");//.set(date,"1")
    try{
        const order=await Order.aggregate([
            {$match:{createdAt:{$gt:new Date(previosWeek)}}},
            {$project:{day:{$dayOfWeek:"$createdAt"},sales:"$total"}},
            {$group:{"_id":"$day","total":{$sum:"$sales"}}}
        ]);
        console.log(order);
        res.status(200).send(order);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err); 
    }
});


router.get("/last",async(req,res,next)=>{
    //console.log(req.query)
    //const previosWeek=moment().day(moment().day()-7).format("YYYY-MM-DD HH:mm:ss");//.set(date,"1")
    console.log(req.query.new);
    const query=req.query.new;
    try{
        const order=query?await Order.find().sort({_id:-1}).limit(4):await Order.find().sort({_id:-1});
        console.log(order); 
        res.status(200).send(order);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err); 
    }
});
router.get("/numberOfOrders",async(req,res,next)=>{
    //const previosMonth=moment().month(moment().month()-1).day(-9).format("YYYY-MM-DD HH:mm:ss");//.set(date,"1")
    //console.log(previosMonth);
    
    try{
        const order=await Order.aggregate([
            {$count:"total"}
        ]);
        res.status(200).send(order);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});

router.get("/earning",async(req,res,next)=>{
    //const previosMonth=moment().month(moment().month()-1).day(-9).format("YYYY-MM-DD HH:mm:ss");//.set(date,"1")
    //console.log(previosMonth);
    
    try{
        const earning=await Order.aggregate([
            {$group:{_id:null,total:{$sum:"$total"}}}
        ]);
        res.status(200).send(earning);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});
module.exports=router;