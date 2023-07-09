const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const cors = require('cors')
const cookieParser = require('cookie-parser');

// const databaseRouter = require()

// Serve static files from the webpack build directory
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// app.use(cookieParser());



// Handle all routes and serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});





//Global Error Handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(`\u001b[1;31m ${errorObj.log}`);
  return res.status(errorObj.status).json(errorObj.message);
});


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


