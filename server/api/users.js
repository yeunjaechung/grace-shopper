const router = require("express").Router();
const {
  models: { User, Order_Products, Product, Order },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "email"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//viewing cart
router.get("/viewcart/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const openOrders = await Order.findAll({
      where: {
        userId,
        status: "open",
      },
      include: {
        model: Product,
      },
    });
    res.send(openOrders);
  } catch (err) {
    next(err);
  }
});

//view all closed orders of a user
router.get("/vieworders/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const closedOrders = await Order.findAll({
      where: {
        status: "closed",
        userId,
      },
      include: {
        model: Product,
      },
    });
    res.send(closedOrders);
  } catch (err) {
    next(err);
  }
});

//creating a new User
router.post("/newUser", async (req, res, next) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      shippingAddress,
      billingAddress,
    } = req.body;
    const newUser = await User.create({
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      shippingAddress,
      billingAddress,
    });
    res.send(newUser);
  } catch (err) {
    next(err);
  }
});

//route to set order status from open to closed:
router.put("/checkout/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const ordersToClose = await Order.findOne({
      where: {
        userId: id,
        status: "open",
      },
    });
    await ordersToClose.update({ status: "closed" });
    res.send(ordersToClose);
  } catch (err) {
    next(err);
  }
});

//add item to cart:
// Quick question - Do we actually need this route? Since we are going to make an as
router.put("/addToCart/:productId", async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { productId } = req.params;
    const product = await Product.findByPk(productId);
    const cart = await Order.findOne({
      where: {
        userId,
        status: "open",
      },
      include: {
        model: Product,
      },
    });
    await cart.addProduct(product);
    res.send(cart);
  } catch (err) {
    next(err);
  }
});
//remove item from cart
router.put("/removeItem/:productId", async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { productId } = req.params;
    const product = await Product.findByPk(productId);
    const cart = await Order.findOne({
      where: {
        userId,
        status: "open",
      },
      include: {
        model: Product,
      },
    });
    await cart.removeProduct(product);
    res.send(cart);
  } catch (err) {
    next(err);
  }
});
