const {DataTypes} = require('sequelize');
const Sequelize = require('../connection/Database');


const User = Sequelize.define('User', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey:true
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});


module.exports = User;