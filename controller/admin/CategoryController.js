const {validationResult} = require('express-validator');
const Category = require('../../model/Category');

//get All Category
module.exports.getCategory = (req,res,next)=>{
    Category.findAll()
    .then((result)=>{
        if (!result){
            const err = new Error('Category list is empty');
            err.statusCode = 404;
            throw err;
        }
        res.status(200).json({result});
    })
    .catch(err=>{
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
};

//create Category

module.exports.create = (req,res,next)=>{
    const categoryName = req.body.categoryname;
    const errs = validationResult(req);
    if (!errs.isEmpty()){
        const err = new Error('validation failed');
        err.statusCode = 422;
        err.data = errs.array();
        throw err;
    }
    Category.create({categoryname:categoryName})
    .then((category)=>{
        if (!category){
            const err = new Error('Category create failed');
            err.statusCode = 500;
            throw err;
        }
        res.json({message:'Insert successfully'});
    })
    .catch(err=>{
        if (!err.statusCode){
            err.statusCode = 500
        }
        next(err);
    })
}

//delete Category

    module.exports.deleteCategory = (req,res,next) => {
        const id = req.params.id;
        if (!id){
            const err = new Error('Id is not provided');
            err.statusCode = 400;
            throw err;
        }
        Category.destroy({
            where: {
                id: id
            }
        })
        .then(result=>{
            if (!result){
                const err = new Error('Category delete failed');
                err.statusCode = 500;
                throw err;
            }
            res.status(200).json({'msg':'Delete successfully'});
        })
        .catch(err=>{
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
    }