const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate:{
      isEmail: true
    }
  },
  phoneNumber:{
    type: Sequelize.STRING,
    validate: {
      isNumeric: true
    }
  },
  shippingAddress: {
    type: Sequelize.STRING
  },
  billingAddress: {
    type: Sequelize.STRING
  },
  // paymentInfo: {
  //   //Look into Stripe / PayPal / Whatever at a later time
  // }
})

module.exports = Order
