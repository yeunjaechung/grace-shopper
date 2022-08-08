const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Order = require("./Order");
const Product = require("./Product");

const SALT_ROUNDS = 5;

const User = db.define("user", {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  phoneNumber: {
    type: Sequelize.STRING,
    validate: {
      isNumeric: true,
    },
  },
  shippingAddress: {
    type: Sequelize.STRING,
  },
  billingAddress: {
    type: Sequelize.STRING,
  },
  userType: {
    type: Sequelize.ENUM("standard", "admin"),
    defaultValue: "standard",
  },
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

/**
 * classMethods
 */
User.authenticate = async function ({ email, password }) {
  const user = await this.findOne({ where: { email } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error("Incorrect email/password");
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await User.findByPk(id);

    if (!user) {
      throw "nooo";
    }
    return user;
  } catch (ex) {
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }
};

/**
 * instanceMethods
 */

User.prototype.getCart = async function () {
  const where = {
    userId: this.id,
    status: "open",
  };
  let cart = await Order.findOne({
    where,
  });
  if (!cart) {
    cart = await Order.create(where);
  }
  return Order.findByPk(cart.id, {
    include: {
      model: Product,
    },
  });
};

User.prototype.addToCart = async function (product) {
  const cart = this.getCart();
  let newItem = cart.products.find((item) => item.id === product.id);
  if (newItem) {
    newItem.Order_Product.quantity++;
    await cart.save();
    // let totalPrice = (newItem.Order_Product.quantity * newItem.price)
    // newItem.Order_Product.totalPrice = totalPrice
  } else {
    await cart.addProduct(product);
    // save newItem.Order_Product.unitPrice = product.price
  }
  return this.getcart();
};

User.prototype.removeFromCart = async function (product) {
  const cart = this.getCart();
  await cart.removeProduct(product);
  return this.getCart();
};

/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
//after user is created, assoicate them with the order model via magic methods
// User.afterCreate(async (user) => {
//   await user.createOrder({status: 'open'})
// })
