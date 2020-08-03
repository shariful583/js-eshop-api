const express = require('express');
const CategoryController = require('../controller/admin/CategoryController');
const productController = require('../controller/admin/productController');
const adminController = require('../controller/admin/adminController');
const auth = require('../auth/auth');


const router = express.Router();

// User

// product
router.get('/api/product/show',productController.getProduct);
router.get('/api/product/:id',productController.Product);
router.delete('/api/product/:id',productController.deleteProduct);
// Category
router.get('/api/category/show',CategoryController.getCategory);


// admin
// router.get('/admin/login/:token',auth,adminController.login);
router.post('/api/admin/category/create',auth,CategoryController.create);
router.post('/api/admin/product/create',productController.createProduct);
router.delete('/api/admin/category/create',auth,CategoryController.create);


module.exports = router;