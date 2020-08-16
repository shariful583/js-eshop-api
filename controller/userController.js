const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');


const { validationResult } = require('express-validator')

// User Sign Up
module.exports.signUp = (req,res,next)=>{
    const errs = validationResult(req);
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    let imageUrl;
    if (req.file){
        imageUrl = req.file.path;
    }

    if (!errs.isEmpty()){
        const err=new Error('Validation failed');
        err.statusCode=422;
        err.data=errs.array();
        throw err;

    }

    bcrypt.hash(password,12)
        .then(hashPassword=>{
            User.create({
                name: name,
                image: imageUrl,
                email: email,
                password: hashPassword

            })
        })
    .then((result)=>{
        res.status(200).json({msg:'Account registration successful'});
    })
    .catch(err=>{
        if (!err.statusCode){
            err.statusCode=500;
        }
        next(err);

    })
   


};

// User sign in

module.exports.signIn = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    const errs = validationResult(req);
    let loginUser;
    if (!errs.isEmpty()) {
       const err = new Error('validation failed');
       err.statusCode = 422;
       err.data=errs.array();
       throw err;
    }

    User.findOne({where: ({email:email})})
        .then(user=>{
            if (!user){
                const err = new Error('A user with this email not found');
                err.statusCode = 401;
                throw err;
            }
            loginUser = user;

            return bcrypt.compare(password,user.password)
        })
        .then(authenticate=>{
            console.log(loginUser)
            if (!authenticate){
                const err = new Error('Wrong password');
                err.statusCode = 401;
                throw err;
            }
            const token = jwt.sign({ name: loginUser.name,id:loginUser.id}, 'soboz',{
                expiresIn: '1h',

            });

    res.status(200).json({token:token,msg:'User successfuly login'});
        })
        .catch(err=>{
            console.log(err)
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
};