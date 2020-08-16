const {validationResult} = require('express-validator');
const Product = require('../../model/Product');
//create product
module.exports.createProduct = (req,res,next)=>{
    const ProductName = req.body.productname;
    const price = req.body.price;
    const description = req.body.description;
    const CategoryId = req.body.CategoryId;


    const errs = validationResult(req);
    if (!errs.isEmpty()){
        const err = new Error('validation failed');
        err.statusCode = 422;
        err.data = errs.array();
        throw err;
    }
    Product.create({
        productname:ProductName,
        price:price,
        description:description,
        CategoryId: CategoryId
    })
    .then(result=>{
        if (!result){
            const err = new Error('Product create failed');
            err.statusCode = 500;
            throw err;
        }
        res.json({message:'Product create success'});
    })
    .catch(err=>{
        if (!err.statusCode){
            err.statusCode = 500
        }
        next(err);
    })

};

module.exports.getProduct = (req,res,next)=>{
    Product.findAll()
    .then(result=>{
        if (!result){
            const err = new Error('Product not found');
            err.statusCode = 404;
            throw err;
        }
        res.json({msg: 'successfully fetched', result: result});
    })
    .catch(err=>{
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
};

module.exports.Product = (req,res,next)=>{
    const productId = req.params.id;
    Product.findAll({
       where:{
           CategoryId:productId
       }
    })
    .then(result=>{
        if (!result){
            const err = new Error('Product not found');
            err.statusCode = 404;
            throw err;
        }
        res.json({product:result});
    })
    .catch(err=>{
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
};

module.exports.deleteProduct = (req,res,next)=>{
    const id = req.params.id;
    if (!id){
        const err = new Error('Id is not provided');
        err.statusCode = 400;
        throw err;
    }
    Product.destroy({
        where: {
            id: id
        }
    })
        .then(result=>{
            if (!result){
                const err = new Error('Product delete failed');
                err.statusCode = 500;
                throw err;
            }
            res.status(200).json({msg:' Product delete successfully'});
        })
        .catch(err=>{
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
}