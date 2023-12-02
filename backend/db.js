/* Database file to set up the database connection */
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

require('dotenv').config({ path: path.resolve(__dirname, "../.env") });

const URI = process.env.MONGO_URI;

mongoose
  .connect(URI, 
    { 
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'HIRING-JOHN-WROGE-FLASHCARDS' 
    }
    )
  .then(() => console.log("\u001b[1;36m ---- Connected to MongoDB ----\n"))
  .catch((err) => console.log("Error connecting to MongoDB: ", err));

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on(
  "error",
  console.error.bind(console, "\u001b[1;31m MongoDB connection error:")
);
module.exports = db;