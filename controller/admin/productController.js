const Product = require('../../model/Product');

module.exports.createProduct = (req,res,next)=>{
    const ProductName = req.body.productname;
    const price = req.body.price;
    const description = req.body.description;
    const CategoryId = req.body.CategoryId;

    Product.create({
        productname:ProductName,
        price:price,
        description:description,
        CategoryId: CategoryId
    })
    .then(result=>{
        res.json({'message':'success'});
    })
    .catch(err=>{
        console.log(err);
        res.json({'message':'error'});
    })

};

module.exports.getProduct = (req,res,next)=>{
    Product.findAll()
    .then(result=>{
        res.json(result);
    })
    .catch(err=>{
        console.log(err);
        res.json({message:'error'});
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
        res.json({product:result});
    })
    .catch(err=>{
        console.log(err);
        res.json({message:'error'});
    })
};


module.exports.deleteProduct = (req,res,next)=>{
    
};