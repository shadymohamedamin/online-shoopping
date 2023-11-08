const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    name:{type:String,requied:true},
    sr:{type:Object,requied:true},
    desc:{type:String,requied:true},
    price:{type:String,requied:true},
    brand:{type:String,requied:true},
    product_quantity:{type:Number,default:0},
    sold:{type:Number,default:0}
},
{timestamps:true}
);

const Product=mongoose.model("Product",productSchema);
module.exports=Product; 