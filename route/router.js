const express = require('express');
const { body, validationResult } = require('express-validator')
const CategoryController = require('../controller/admin/CategoryController');
const productController = require('../controller/admin/productController');
const adminController = require('../controller/admin/adminController');
const userController = require('../controller/userController');
const auth = require('../auth/auth');
const User = require('../model/user');

const router = express.Router();

// User
router.post('/api/user/signup',[
    body('name')
        .not()
        .isEmpty()
        .trim()
        .escape(),
    body('email')
        .isEmail()
        .withMessage('Must be an email')
        .custom((value,{req}) => {
                return User.findOne({where: {email: value}})
                    .then(user => {
                        if (user) {
                            return Promise.reject('E-mail already in use');
                        }
                    });
            }),
    body('password')
        .isLength({min:5})
        .withMessage('Password must be at least 5 character')
],
userController.signUp);



router.post('/api/user/signin',[
    body('email').isEmail()
        .withMessage('Please enter valid a valid email'),
    body('password').escape()
],userController.signIn);






// product
router.get('/api/product/show',auth,productController.getProduct);
router.get('/api/product/:id',productController.Product);




// Category
router.get('/api/category/show',CategoryController.getCategory);


// admin
// router.get('/admin/login',auth,adminController.login);
router.post('/api/admin/category/create',[
    body('categoryname').not().isEmpty().trim().escape().withMessage('Category must not be empty'),
],CategoryController.create);
router.delete('/api/admin/category/delete/:id',CategoryController.deleteCategory);

router.post('/api/admin/product/create',[
    body('productname').not().isEmpty().trim().escape().withMessage('Product must not be empty'),
    body('price').not().isEmpty().trim().escape().withMessage('Product price must not be empty'),
    body('description').not().isEmpty().trim().escape().withMessage('Product description must not be empty'),
    body('CategoryId').not().isEmpty().trim().escape().withMessage('category must not be empty'),
],productController.createProduct);
router.delete('/api/admin/product/delete/:id',productController.deleteProduct);
// router.delete('/api/admin/product/delete/:id',productController.deleteProduct);



module.exports = router;