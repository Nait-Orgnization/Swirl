'use strict';

// accessing the environment variables
require('dotenv').config();

// Require express to run server and routes
const express = require('express');
const app = express();
const websiteRoutes = require('./routes/websiteRoutes');

//server setup
const PORT = process.env.PORT || 5000;

//Intialize the main project folder
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', websiteRoutes.homePage);

app.listen(PORT, () => {
  console.log('app is running');
  console.log(`app is listen at http://localhost:${PORT}`);
});
