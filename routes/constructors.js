let placesArray = [];

const Place = function (name, address, photoRef, rating) {
  this.placeName = name;
  this.Adress = address;
  this.photo = photoRef;
  this.rating = rating;
  placesArray.push(this);
};

module.exports = {
  Place,
  placesArray,
};
