const Cards = require('../model/cardModel.js');
const db = require('../db.js');

const userController = {};

userController.getCards = (req, res, next) => {
  // Find cards in the database
  Cards.find({})
    .then((cards) => {
      // Save the cards to res.locals
      res.locals.cards = cards;
      // Move to the next middleware
      return next();
    })
    .catch((err) => {
      // Error handling
      return next({ err });
    });
};


  userController.createCard = async (req, res, next) => {
    console.log('in create card');
    const { user_id, card_id, title, definition, bin, timeRemaining, timeStamp, incorrectTimes } = req.body;
    try {
      const card = await Cards.create({
         title: title,
         definition: definition, 
         bin: bin,
         timeRemaining: timeRemaining, 
         timeStamp: timeStamp, 
         incorrectTimes: incorrectTimes 
      });
  
      res.locals.response = card;
      return next();
    } catch (err) {
      return next(err);
    }
  };
  


  userController.updateCard = (req, res, next) => {
    console.log('in update cards');
    const { user_id, _id, timeRemaining, timeStamp, incorrectTimes, bin } = req.body;
  
    Cards.findByIdAndUpdate(
        _id,
      { 
        bin: bin, 
        timeRemaining: timeRemaining, 
        timeStamp: timeStamp, 
        incorrectTimes: incorrectTimes 
      }
    )
      .then((item) => {
        res.locals.message = item;
        console.log(item)
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  };
  

  module.exports = userController; 

  /*
   user_id: user_id, 
  */