const express = require('express');
const bodyParser = require('body-parser');
const Database = require('./connection/Database');
const router = require('./route/router');
const Category = require('./model/Category');
const Product = require('./model/Product');




Category.hasMany(Product);
Product.belongsTo(Category,{
      constraints:true,
      onDelete: 'CASCADE'
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(router);

Database.sync()
.then((result)=>{
      app.listen(3000);
})
.catch(err=>{
      console.log(err);
})