let placesArray = [];

const Place = function (name, address, photoRef, rating) {
  this.placeName = name;
  this.Adress = address;
  this.photo = photoRef;
  this.rating = rating;
  placesArray.push(this);
};


function Book(oneBook){
  this.title = oneBook.volumeInfo.title ? oneBook.volumeInfo.title : 'Title is not available',
  this.author = oneBook.volumeInfo.authors? oneBook.volumeInfo.authors : 'Author is not available',
  this.description = oneBook.volumeInfo.description ? oneBook.volumeInfo.description : 'No description available' ,
  this.imgUrl = oneBook.volumeInfo.imageLinks? oneBook.volumeInfo.imageLinks.thumbnail : 'https://i.imgur.com/J5LVHEL.jpg';
}

module.exports = {
  Place,
  placesArray,
  Book,
};
