const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const Database = require('./connection/Database');
const router = require('./route/router');
const Category = require('./model/Category');
const Product = require('./model/Product');




Category.hasMany(Product);
Product.belongsTo(Category,{
      constraints:true,
      onDelete: 'CASCADE'
});

const diskStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, 'public/storage/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const app = express();
app.use(bodyParser.json());
app.use(multer({storage:diskStorage}).single('image'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public/storage/images',express.static(path.join(__dirname,'public/storage/images')));
app.use(router);



  app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
      );
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      next();
    });


    //Error Handling
    app.use((err,req,res,next) => {
      const status = err.statusCode || 500;
      const message = err.message || 500;
      const data=err.data;
      res.status(status).json({message:message,data:data});
     });
Database.sync()
.then((result)=>{
      app.listen(3000);
})
.catch(err=>{
      console.log(err);
})