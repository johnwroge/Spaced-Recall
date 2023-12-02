/* Main server file serving static files and user router for create and update functionality*/

const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routers/userRouter.js');

const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());


app.use('/user', userRouter);

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

