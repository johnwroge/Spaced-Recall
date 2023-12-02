const Cards = require('../model/cardModel.js');
const db = require('../db.js');

const userController = {};

userController.getCards = (req, res, next) => {
  Cards.find({})
    .then((cards) => {
      res.locals.cards = cards;
      return next();
    })
    .catch((err) => {
      return next({ err });
    });
};


  userController.createCard = async (req, res, next) => {
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
  
    const { user_id, _id, timeRemaining, timeStamp, incorrectTimes, bin } = req.body;
    const updateObject = {};

    if (typeof bin !== 'undefined') {
      updateObject.bin = bin;
    }
    if (timeRemaining !== 'undefined') {
      updateObject.timeRemaining = timeRemaining;
    }
    if (typeof timeStamp !== 'undefined') {
      updateObject.timeStamp = timeStamp;
    }
    if (typeof incorrectTimes !== 'undefined') {
      updateObject.incorrectTimes = incorrectTimes;
    }

    Cards.findByIdAndUpdate(_id, updateObject)
      .then((item) => {
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  };

  
  userController.updateTimes = (req, res, next) => {

  }
  

  module.exports = userController; 

  