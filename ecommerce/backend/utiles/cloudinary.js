const dotenv=require("dotenv");//.config();
const cloudinary=require("cloudinary").v2;
dotenv.config();
//const cloudinary=cloudinaryModel.v2;

cloudinary.config({
    cloud_name:'dnpyllrus',//process.env.CLOUDINARY_CLOUD_NAME,
    api_key:'489863591558694',//process.env.CLOUDINARY_API_KEY,
    secret_key:'kw89Q9XofqRIZmIWKKyqoG7uY0A', ////process.env.CLOUDINARY_API_SECRET
    secure:true
})


module.exports=cloudinary;