/* Main server file serving static files and user router for create and update functionality*/

const express = require('express');
const path = require('path');
const app = express();
// Heroku creates env port on deployment, otherwise use 3000 in development
const port = process.env.PORT || 3000;
const cors = require('cors')
const cookieParser = require('cookie-parser');
const userRouter = require('./routers/userRouter.js')
 //const adminRouter = require('./routers/adminRouter.js')


// const distPath = '/Users/johnwroge/hiring-john-wroge-flashcards/dist';
// app.use(express.static(distPath));

const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));
console.log(distPath)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// Regular User Routes
app.use('/user', userRouter);

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



app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});


// Start the server and display port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



// Admin Routes
// app.use('/admin', adminRoutes);

// Handle all routes and serve the index.html file
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

//this