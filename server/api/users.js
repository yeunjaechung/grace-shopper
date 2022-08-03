const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
});

router.get('/cart/:id', async (req, res, next) => {
  try{
    const {id} = req.params;
    const user = await User.findByPk(id, {
      include:{
        model: Order,
        where: {
          status: 'open'
        }
      }
    });
    res.send(user);
  }catch(err){
    next(err)
  }
});


//how to create an admin user? We need to put the userType admin in the req.body.

router.post('/newUser', async (req, res, next) => {
  try{
    const {email, password, firstName, lastName, phoneNumber, shippingAddress, billingAddress} = req.body;
    const newUser = await User.create({email, password, firstName, lastName, phoneNumber, shippingAddress, billingAddress}) 
    res.send(newUser);
  }catch(err){
    next(err)
  }
});
