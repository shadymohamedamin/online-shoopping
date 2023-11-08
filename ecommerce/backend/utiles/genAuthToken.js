
const jwt=require("jsonwebtoken");

const generateToken=(user)=>{
    //console.log(user);
    const tok=jwt.sign({_id:user._id,name:user.name,email:user.email,isAdmin:user.isAdmin,},process.env.JWT_SECRET_KEY);
    console.log(tok);
    return tok;
}
module.exports=generateToken; 