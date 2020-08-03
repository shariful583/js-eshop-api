const jwt = require('jsonwebtoken');


    const jsonwebtoken = (req,res,next)=>{
        const token = req.get('token');

        jwt.verify(token,'soboz',(err,decode)=>{
            if(decode){
                next();
            } else {
                res.json({'msg':'auth failed'});
            }
        })
    };

    module.exports = jsonwebtoken;