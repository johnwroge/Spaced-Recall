const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the webpack build directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all routes and serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
