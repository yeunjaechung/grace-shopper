const router = require("express").Router();
const {
  models: { Product, Order },
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).send(products);
  } catch (err) {
    next(err);
  }
});

//add a route for single product view

router.get("/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByPk(productId);
    res.send(product);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try{
    const {id} = req.params;
    const productToDestroy = await Product.findByPk(id);
    await productToDestroy.destroy();
    res.send(productToDestroy);
  }catch(err){
    next(err);
  }
})

module.exports = router;
