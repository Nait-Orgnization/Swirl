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

function Event (eventData){
  if (!eventData.name){
    this.name = 'no name available ';
  }else {
    this.name = eventData.name ;
  }

  if (!eventData.url){
    this.url = 'no url available ';
  }else {
    this.url = eventData.url;
  }

  if (!eventData.id){
    this.id = 'no id available ';
  }else {
    this.id = eventData.id;
  }

  if (!eventData.images){
    this.image = 'https://www.ecpgr.cgiar.org/fileadmin/templates/ecpgr.org/Assets/images/No_Image_Available.jpg';
  }else {
    this.image = eventData.images[0].url;
  }

  if (!eventData.dates){
    this.dateAndTime = 'Unknown';
  }else {
    this.dateAndTime =`This Event Starts on ${eventData.dates.start.localDate} at ${eventData.dates.start.localTime}`;
  }
  if (!eventData.dates.timezone){
    this.timeZone = 'Unknown';
  }else {
    this.timeZone = eventData.dates.timezone;
  }

  if (!eventData._embedded.venues){
    this.venues = 'no venue available';
  }else {
    this.venues = eventData._embedded.venues[0].name;
  }
  if (!eventData._embedded.venues){
    this.venuesURL = 'no venue available';
  }else {
    this.venuesURL = eventData._embedded.venues[0].url;

  }

}

module.exports = {
  Place,
  placesArray,
  Book,
  Event,
};
