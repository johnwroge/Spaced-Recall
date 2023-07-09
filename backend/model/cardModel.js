
const mongoose = require('mongoose');
require('dotenv').config();

const myURI = process.env.MONGO_URI; 


mongoose.connect(myURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'Items'
}).then(() => console.log('connected to Mongo DB'))
  .catch(err => console.log(err));


const ItemSchema = new mongoose.Schema({
  description: {type: String, required: true},
  price: {type: Number, required: true},
  purchased: {type: Boolean, required: true, default: false}
});

const Items = mongoose.model('Items', ItemSchema);

module.exports = Items; // <-- export your model
