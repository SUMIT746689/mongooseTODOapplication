const res = require("express/lib/response");
const jsonwebtoken = require("jsonwebtoken");


const jwtMiddleware = (req,res,next)=>{
    try{
        const cutToken = req.headers.token.split(' ')[1];
        const isVarify = jsonwebtoken.verify(cutToken,process.env.SECRETE_KEY)
        next();
    }
    catch{
        res.status(500).json({"Error" : "Authenticaion Error"})
    }
}

module.exports = jwtMiddleware ;