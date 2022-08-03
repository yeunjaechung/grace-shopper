//this is the access point for all things database related!
const Sequelize = require('sequelize')
const db = require('./db')

const User = require('./models/User')
const Product = require('./models/Product')
const Order = require('./models/Order')
//associations could go here!

const Order_Products = db.define('Order_Product', {
quantity: {
  type: Sequelize.INTEGER
},
//Price is calculated in pennies
unitPrice: {
  type: Sequelize.INTEGER
},
totalPrice: {
  type: Sequelize.INTEGER
}
})


Order.belongsTo(User);
User.hasMany(Order);


Product.belongsToMany(Order, {through: Order_Products});
Order.belongsToMany(Product, {through: Order_Products});

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    Order_Products
  },
}
