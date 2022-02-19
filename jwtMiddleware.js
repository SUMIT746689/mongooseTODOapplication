const res = require("express/lib/response");
const jsonwebtoken = require("jsonwebtoken");


const jwtMiddleware = (req,res,next)=>{
    try{
        const cutToken = req.headers.token.split(' ')[1];
        const isVarify = jsonwebtoken.verify(cutToken,process.env.SECRETE_KEY)
        req.name = isVarify.name ;
        req.userId = isVarify.id ;
        next();
    }
    catch(err){
        res.status(500).send(err)
    }
}

module.exports = jwtMiddleware ;