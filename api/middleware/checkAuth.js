const jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{
try{
    if(!req.headers.authorization){
        return res.status('401').send="Unauthorized Request";
    }
    const token=req.headers.authorization.split(" ")[1];
    console.log(token);
    const decoded=jwt.verify(token,process.env.JWT_KEY);
    if(!decoded){
        return res.status('401').send="Unauthorized Request";
     }
    req.userData=decoded;
    next();
}
catch(error){
    res.status(401).json({
        message:'Auth Failed'
    });
}
}