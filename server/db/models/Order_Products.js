const Sequelize = require("sequelize");
const db = require("../db");

const Order_Products = db.define("Order_Product", {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
    defaultValue: 1,
  },
  //Price is calculated in pennies
  unitPrice: {
    type: Sequelize.INTEGER,
  },
  totalPrice: {
    type: Sequelize.INTEGER,
  },
});

Order_Products.beforeCreate((instance) => {
  instance.quantity = 1;
});

module.exports = Order_Products;
