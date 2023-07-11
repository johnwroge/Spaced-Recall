
const mongoose = require('mongoose');

 
const CardSchema = new mongoose.Schema({
  //stretch feature
  // user_id: { type: String, required: false },

  title: {type: String, required: true},
  definition: {type: String, required: true},
  bin: {type: Number, required: true, default: 0},
  timeRemaining: {type: Number, required: true, default: 0},
  timeStamp: {type: Number, required: true}, 
  incorrectTimes: {type: Number, required: true, default: 0},
},

{ timestamps: true });

const Cards = mongoose.model('Cards', CardSchema);

module.exports = Cards;
