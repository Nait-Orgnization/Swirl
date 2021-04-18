const superagent = require('superagent');
const constructors = require('./constructors');
const placeJsonData = require('../places.json');

const homePage = (req, res) => {
  res.render('pages/index', { data: 'working' });
};

const detailsPage = (req, res) => {
  let city = req.body.city;
  let placeIdApiKey = process.env.placeIdApiKey;

  let placeIdUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${city}&key=${placeIdApiKey}&type=tourist_attraction`;

  res.send(placeJsonData);
};

module.exports = {
  homePage,
  detailsPage,
};
