const superagent = require('superagent');
const constructors = require('./constructors');
const placeJsonData = require('../places.json');
let globalArray = [];

const homePage = (req, res) => {
  res.render('pages/index', { data: 'working' });
};

// function generalFunction(req, res)  {
//   .then(item => {
//     detailsPage(req, res);
//   })

//   // searchBook(req, res);
// }
// generalFunction();

const detailsPage = (req, res) => {
  let globalArray = [];
  let city = req.body.city;
  let placeIdApiKey = process.env.placeIdApiKey;

  let placeIdUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${city}&key=${placeIdApiKey}&type=tourist_attraction`;
  globalArray.push(placeJsonData);
  // console.log(globalArray);
  // res.send(placeJsonData);
  // globalArray.push(placeJsonData);
  // searchBook(city).then(result =>{
  //   res.send(result);
  // });
  let bookfunction = searchBook(city);
  bookfunction.then((arr)=> {
    globalArray.push(arr);
    let eventFunction = eventRenderHandler(city);
    eventFunction.then(eventArray =>{

      globalArray.push(eventArray);
      // res.send(globalArray);
      res.render('pages/details' , {details : globalArray}) ;
    });
  });



};

const searchBook=(city)=>{
  // let query = req.body.query;
  let bookURL=`https://www.googleapis.com/books/v1/volumes?q=intitle:${city}&maxResults=3`;

  return superagent.get(bookURL)
    .then(result=> {
      let bookData = result.body.items;
      let bookArr = bookData.map(item => {
        return new constructors.Book (item); });
      // res.send(bookArr);// for testing
      // res.render('pages/details',{renderBookData:bookArr} );
      // globalArray.push(bookArr);
      // return globalArray
      // globalArray.push(bookArr);
      return bookArr;

    });

};

function eventRenderHandler (city){
  let key = process.env.EVENT_KEY;
  let url = `https://app.ticketmaster.com/discovery/v2/events?apikey=${key}&city=${city}&sort=random`;

  return superagent.get (url)
    .then (eventData=>{
      if (!eventData.body._embedded){
        let ev=['Sorry ,No Events Available'];
        return ev;
      }else {
        let eData = eventData.body._embedded.events;
        let ev = [];
        for (let i=0;i<eData.length;i++){
          if (i > 1){
            if (eData[i].name.includes(eData[i-1].name)){
              continue;
            }else {
              ev.push( new constructors.Event (eData[i]));
              if (ev.length >= 6){
                break;
              }
            }
          }}
        return ev;

      }

    });
}

module.exports = {
  homePage,
  detailsPage,
  searchBook,
};
