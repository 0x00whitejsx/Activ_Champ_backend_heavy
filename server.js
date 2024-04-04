const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser

require('dotenv').config();
require('./dbconnect/db');

// Importing the router
const UserRouter = require('./routes/user_route');

// Middleware
const app = express();
const port = process.env.ACTIVE_CHAMP_PORT || 3000; // Setting default port to 3000 if ACTIVE_CHAMP_PORT is not defined

// Parsing JSON bodies
app.use(bodyParser.json()); // Use body-parser for JSON bodies

// Parsing urlencoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // Use body-parser for urlencoded bodies

// Using the UserRouter
app.use('/user', UserRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
