const express = require('express');
const userController = require('../controller/userController.js');
const userRouter = express.Router();


userRouter.get('/cards', userController.getCards, (req, res) => {
    res.status(200).json(res.locals.cards);
  });
  
userRouter.post('/cards', userController.createCard, (req, res) => {
    res.status(200).json(res.locals.response);
  });
  
userRouter.patch('/cards', userController.updateCard, (req, res) => {
  res.status(200).json(res.locals.message);
});
  


module.exports = userRouter;