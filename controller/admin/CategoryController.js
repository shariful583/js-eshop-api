
const Category = require('../../model/Category');

module.exports.getCategory = (req,res,next)=>{
    Category.findAll()
    .then((result)=>{
        res.json({result});
    })
    .catch(err=>{
        console.log(err);
        res.json({'message':'Fetching error'});
    })
};

module.exports.create = (req,res,next)=>{
    const categoryName = req.body.categoryname;
    Category.create({categoryname:categoryName})
    .then(()=>{
        res.json({'message':'Insert successfully'});
    })
    .catch(err=>{
        console.log(err);
        res.json({'message':'error'})
    })
};