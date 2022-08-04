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
    type: Sequelize.DECIMAL,
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
  },
  imageLarge: {
    type: Sequelize.STRING,
  },
  nationalPokedexNumbers: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Product;
