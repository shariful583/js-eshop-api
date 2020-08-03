const {DataTypes} = require('sequelize');
const Sequelize = require('../connection/Database');


const Product = Sequelize.define('Product', {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey:true
    },
  
    productname: {
      type: DataTypes.STRING,
      allowNull: false
    },

    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
    },

    

  });

  module.exports = Product;