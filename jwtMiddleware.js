const jwt = require('jsonwebtoken');


const jwtMiddleware =async (req,res,next) =>{

   try{
    const token = req.headers.token.split(' ')[1];
    const decode = jwt.verify(token,process.env.SECRETE_KEY);
    const {name,userId} = decode ;
    req.name = name;
    req.userId = userId;
    next();
   }
   
   catch{
      next("authentication Error");
   }
}
module.exports = jwtMiddleware ;