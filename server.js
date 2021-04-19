'use strict';

// accessing the environment variables
require('dotenv').config();

// Require express to run server and routes
const express = require('express');
const app = express();
const websiteRoutes = require('./routes/websiteRoutes');


const methodOverride = require('method-override');

app.use(methodOverride('_method'));


//server setup
const PORT = process.env.PORT || 5000;

//Intialize the main project folder
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

//routes
app.get('/', websiteRoutes.homePage);
app.post('/details', websiteRoutes.detailsPage);
app.get('/tips',websiteRoutes.tipsHandler);
app.post('/addTip',websiteRoutes.addTip);
app.get('/showTip/:id',websiteRoutes.editTip);
app.delete('/deleteTip/:id',websiteRoutes.deleteTip);
app.put('/updateTip/:id',websiteRoutes.updateTip);
app.post('/favorite',websiteRoutes.favorite);

app.listen(PORT, () => {
  console.log('app is running');
  console.log(`app is listen at http://localhost:${PORT}`);
});
