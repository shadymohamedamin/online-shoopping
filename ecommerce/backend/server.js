//token expire in email
//import ReactDOMServer from 'react-dom/server';
const express=require('express');
const app=express();
const cors=require('cors');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const jwt=require("jsonwebtoken");
const Joi=require("joi");
const rgister=require("./routes/register");
const login=require("./routes/login");
const stripe=require("./routes/stripe");
const product=require("./routes/product");
const Product_Module=require("./models/product");
const users=require('./routes/users');
const orders=require('./routes/orders');
require("dotenv").config();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use("/api/register",rgister);
app.use("/api/login",login);
app.use("/api/stripe",stripe);
app.use("/api/products",product); 
app.use("/api/users/",users);
app.use("/api/orders/",orders);

//console.log(Date.now()/1000/1000)
//var obj={name:'shady',age:24}
//obj["products"]=1;//.push({id:"123",name:"oppo"});
//console.log(obj);


/*const App=require('./utiles/order_');
const sendEmail = require('./utiles/sendEmail');
//const html=ReactDOM.render(<order/>);
const ht=ReactDOMServer.renderToString(<App/>);
const to_to='shadimabdrawy1999@gmail.com';
const subject='order completed successfully';
const body=html;
sendEmail(to_to,subject,body);*/


app.get("/get",async(req,res,next)=>{
    //console.log(req.headers);
    //console.log("shady");
    
    
    
    //const tok=req.headers.authorization;
    //const token = tok.split(' ')[1].replace('Bearer ', '');
    //console.log(token);
    //console.log(obj);
    
    //const image='https://res.cloudinary.com/dnpyllrus/image/upload//c_thumb,w_400,h_300,g_auto/v1696188637/samples/ecommerce/analog-classic.jpg';
    //const result=[{id:"12",name:"shady",sr:image,desc:"product",price:"1000",brand:"galaxy"},{id:"123",name:"shady",sr:image,desc:"product",price:"1000",brand:"galaxy"},{id:"123",name:"shady",sr:image,desc:"product",price:"123",brand:"galaxy"},{id:"123",name:"shady",sr:image,desc:"product",price:"123",brand:"galaxy"},{id:"123",name:"shady",sr:image,desc:"product",price:"123",brand:"galaxy"}]
    const result=await Product_Module.find({});
    
    //console.log(result);
    res.json(result); 
});



const port=process.env.PORT||5000;
const uri=process.env.DB_URI; 
app.listen(port,()=>{
    console.log(`connected to port ${port}`);//197.59.156.254/32  
    //My IP Address
}); 
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{console.log("connected to mongoose")})
.catch((err)=>{console.log(err.message)}); 


/*const data={
    name:"shd",
    email:"shady@gmail.com",
    password:"123456"
}
const schema=Joi.object({
    name:Joi.string().min(3).max(50).required(),
    email:Joi.string().min(3).max(200).email().required(),
    password:Joi.string().min(6).max(1024).required()
});
const {error}=schema.validate(data);
if(error)console.log(error.details[0].message);
//console.log(jwt.sign({name:"shady",role:"admin"},"shady"));*/




/*const express = require('express');
const jwt = require('jsonwebtoken');
const googleAuth = require('./google-auth');

const app = express();

app.get('/auth/google/callback', async (req, res) => {
  // Get the access token from Google
  const accessToken = await googleAuth.getAccessToken(req.query.code);

  // Get the user profile from Google
  const userProfile = await googleAuth.getUserProfile(accessToken);

  // Create a JWT token for the user
  const token = jwt.sign({
    userId: userProfile.id,
    name: userProfile.name,
    email: userProfile.email,
  }, 'suppersecret135711', {
    expiresIn: '1h',
  });

  // Set the JWT token in the response cookie
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 3600000, // 1 hour
  });

  // Redirect the user to the home page
  res.redirect('/');
});

// Start the server
app.listen(5000, () => {
  console.log('Server listening on port 5000');
});*/








