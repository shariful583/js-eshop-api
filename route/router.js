const express = require('express');
const CategoryController = require('../controller/admin/CategoryController');
const productController = require('../controller/admin/productController');
const adminController = require('../controller/admin/adminController');
const auth = require('../auth/auth');


const router = express.Router();
// product
router.post('/admin/product/create',productController.createProduct);
router.get('/product/show',productController.getProduct);
router.get('/product/:id',productController.Product);
router.delete('/product/:id',productController.deleteProduct);


// Category
router.get('/category/show',auth,CategoryController.getCategory);
router.post('/admin/category/create',auth,CategoryController.create);



// admin
router.get('/admin/login/:token',auth,adminController.login);

module.exports = router;