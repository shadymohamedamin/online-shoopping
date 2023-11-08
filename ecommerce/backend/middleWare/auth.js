/*const jwt=require("jsonwebtoken");

const auth=(req,res,next)=>{
    const token=req.header("x-auth-token");
    if(!token)
    {
        return res.send("access denied");
    }
    try{
        const secret_key=process.env.JWT_SECRET_KEY;
        const user=jwt.verify(token,secret_key);
        if(!user)return res.send("access denied");
        req.user=user;
        next();
    }
    catch(err)
    {
        return res.send("access denied");
    }
}

const isAdminIs=(req,res,next)=>{
    auth(req,res,()=>{
        if(req.user.isAdmin)next();
        else return res.send("access denied");
    })
    
}*/