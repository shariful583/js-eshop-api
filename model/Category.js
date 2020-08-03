const {DataTypes} = require('sequelize');
const Sequelize = require('../connection/Database');


const Category = Sequelize.define('Category', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey:true
  },

  categoryname: {
    type: DataTypes.STRING,
    allowNull: false
  },
});


module.exports = Category;