const jwt = require('jsonwebtoken');

const authMiddleware =async (req,res,next)=>{
    const token = await req.headers.authorization;
    
    //if we do not have a token
    if(!token){
        res.status(401).json({
            message:'you are not authorized'
        })
    }
    //if we have a token
    else{
        jwt.verify(token,'SECRET',(err,result)=>{
            if(err) {
                res.status(400).json({
                    message:'invalid access token or your token is expired,please log in again'
                });
            }else{
                console.log(result)
                next()
            }
            
        })
    }
};

module.exports = authMiddleware;
