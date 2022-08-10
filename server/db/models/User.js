const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Order = require("./Order");
const Product = require("./Product");
const Order_Products = require("./Order_Products");

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

User.prototype.getProduct = async function (productId) {
  return Product.findByPk(productId, {
    include: {
      model: Order,
    },
  });
};

User.prototype.getCurrentQty = async function (product) {
  const currentQty =
    product.dataValues.orders[0].dataValues.Order_Product.dataValues.quantity;
  return currentQty;
};

User.prototype.addToCart = async function (productId) {
  let cart = await this.getCart();
  let product = await this.getProduct(productId);
  let productsIds = cart.products.map((product) => product.dataValues.id);
  if (!productsIds.includes(productId)) {
    cart.addProduct(product, {
      through: {
        quantity: 1,
        unitPrice: product.price,
        totalPrice: product.price,
      },
    });
  } else {
    const currentQtyInCart = await this.getCurrentQty(product);
    const updatedQty = currentQtyInCart + 1;
    const updatedPrice = product.price;
    const updatedTotalPrice = updatedQty * updatedPrice;
    cart.addProduct(product, {
      through: {
        quantity: updatedQty,
        unitPrice: updatedPrice,
        totalPrice: updatedTotalPrice,
      },
    });
  }
  return this.getCart();
};

// User.prototype.addToCart = async function (product) {
//   const cart = await this.getCart();
//   const item = await Product.findByPk(product.id, {
//     include: {
//       model: Order,
//       where: {
//         orderId: cart.id,
//       },
//     },
//   });
//   if (!item) {
//     cart.addProduct(item, {
//       through: {
//         quantity: 1,
//         unitPrice: product.price,
//         totalPrice: product.price,
//       },
//     });
//   } else {
//     let quantity = item.orders[0].Order_Products.quantity + 1;
//     const totalPrice = product.price * quantity;
//     await Order_Products.update(
//       { quantity: Sequelize.literal("quantity + 1"), totalPrice },
//       {
//         where: {
//           orderId: cart.id,
//           productId: product.id,
//         },
//       }
//     );
//   }
//   return this.getCart();
// };

User.prototype.removeFromCart = async function (product) {
  const cart = await this.getCart();
  await Order_Products.destroy({
    where: {
      orderId: cart.id,
      productId: product.id,
    },
  });
  return this.getCart();
};

User.prototype.updateOrderProduct = async function (product, updateInfo) {
  const cart = await this.getCart();
  const { quantity, unitPrice, totalPrice } = updateInfo;
  await Order_Products.update(
    {
      quantity,
      unitPrice,
      totalPrice,
    },
    {
      where: {
        orderId: cart.id,
        productId: product.id,
      },
    }
  );
  return this.getCart();
};

User.prototype.removeFromCart = async function (product) {
  const cart = await this.getCart();
  await Order_Products.destroy({
    where: {
      orderId: cart.id,
      productId: product.id,
    },
  });
  return this.getCart();
};

User.prototype.closeTheOrder = async function (cart) {
  const cartToClose = await this.getCart();
  await cartToClose.update({ status: "closed" });
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
// User.afterUpdate(async (user) => {
//   await user.getCart();
// });
//after user is created, assoicate them with the order model via magic methods
// User.afterCreate(async (user) => {
//   await user.createOrder({status: 'open'})
// })
