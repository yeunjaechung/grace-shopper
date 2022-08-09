const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  flavorText: {
    type: Sequelize.STRING,
  },
  imageSmall: {
    type: Sequelize.STRING,
    validate:{
      isUrl:true
  },
    defaultValue: 'https://i.pinimg.com/originals/04/82/f2/0482f251621cbe3a67362ef8a76e6bbd.jpg'
  },
  imageLarge: {
    type: Sequelize.STRING,
    validate:{
      isUrl:true
  },
    defaultValue: 'https://i.pinimg.com/originals/04/82/f2/0482f251621cbe3a67362ef8a76e6bbd.jpg'
  },
  nationalPokedexNumbers: {
    type: Sequelize.INTEGER,
  },
});

Product.beforeCreate((product) => {
  product.price = Math.floor(product.price * 100);
});

module.exports = Product;
