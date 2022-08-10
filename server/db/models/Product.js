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
    defaultValue: 'https://tcg.pokemon.com/assets/img/global/tcg-card-back.jpg'
  },
  imageLarge: {
    type: Sequelize.STRING,
    defaultValue: 'https://tcg.pokemon.com/assets/img/global/tcg-card-back.jpg'
  },
  nationalPokedexNumbers: {
    type: Sequelize.INTEGER,
  },
});

Product.beforeCreate((product) => {
  product.price = Math.floor(product.price * 100);
});

module.exports = Product;
