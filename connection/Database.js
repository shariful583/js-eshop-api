const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('eshop', 'root', 'soboz', {
    host: 'localhost',
    dialect: 'mysql'
  });

module.exports = sequelize;