const router = require('express').Router()
const { models: { Product }} = require('../db')

router.get('/', async (req, res, next) => {
    try{
        const products = await Product.findAll();
        res.status(200).send(products);
        
    } catch(err){
        next(err);
    }
});

//add a route for single product view

router.get('/:productId', async (req, res, next) => {
    try{
        const {productId} = req.params;
        const product = await Product.findByPk(productId);
        res.send(product);
    }catch(err){
        next(err);
    }
})


module.exports = router
