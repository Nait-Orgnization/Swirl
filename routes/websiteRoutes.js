const superagent = require('superagent');
const constructors = require('./constructors');
const placeJsonData = require('../places.json');
const recommend = require('../data/recomend.json');
let globalArray = [];

const homePage = (req, res) => {
  // res.render('pages/index', { data: 'working' });
  let SQL = `SELECT * FROM places ;`;
  client.query(SQL).then(result => {
    // console.log("rrrrrrr",result.rows);
    res.render('pages/index', { fav: result.rows, recommend: recommend });
  });
};

//DATABASE
const pg = require('pg');
const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
});
client.connect();

// function generalFunction(req, res)  {
//   .then(item => {
//     detailsPage(req, res);
//   })

//   // searchBook(req, res);
// }
// generalFunction();

const detailsPage = (req, res) => {
  globalArray = [];
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
  bookfunction.then(arr => {
    globalArray.push(arr);
    let eventFunction = eventRenderHandler(city);
    eventFunction.then(eventArray => {
      globalArray.push(eventArray);
      // res.send(globalArray);
      res.render('pages/details', { details: globalArray });
    });
  });
};

const searchBook = city => {
  // let query = req.body.query;
  let bookURL = `https://www.googleapis.com/books/v1/volumes?q=intitle:${city}&maxResults=6`;
  return superagent.get(bookURL).then(result => {
    if (!result.body.items) {
      let fail = [
        {
          title: `Sorry There Is No Book Available About ${city}`,
          author: '',
          description: '',
          imgUrl: 'https://i.postimg.cc/VvzSchbN/J5LVHEL.png',
        },
      ];
      return fail;
    } else {
      let bookData = result.body.items;
      let bookArr = bookData.map(item => {
        return new constructors.Book(item);
      });
      // res.send(bookArr);// for testing
      // res.render('pages/details',{renderBookData:bookArr} );
      // globalArray.push(bookArr);
      // return globalArray
      // globalArray.push(bookArr);
      return bookArr;
    }
  });
};

function eventRenderHandler(city) {
  let key = process.env.EVENT_KEY;
  let url = `https://app.ticketmaster.com/discovery/v2/events?apikey=${key}&city=${city}&sort=random`;

  return superagent.get(url).then(eventData => {
    if (!eventData.body._embedded) {
      let ev = [
        {
          name: 'Sorry ,No Events Available',
          url: 'Sorry ,No Events Available',
          id: 'no id available',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png',
          dateAndTime: 'none - available',
          timeZone: 'unknown',
          venues: 'no venues available',
          venuesURL: 'no url available',
        },
      ];
      ev.length = 1;
      return ev;
    } else {
      let eData = eventData.body._embedded.events;
      let ev = [];
      for (let i = 0; i < eData.length; i++) {
        // if (i > 1) {
        // if (eData[i].name.includes(eData[i - 1].name)) {
        // continue;
        // } else {
        ev.push(new constructors.Event(eData[i]));
        if (ev.length >= 6) {
          break;
        }
      }
      // }
      // }
      return ev;
    }
  });
}

function tipsHandler(req, res) {
  let SQL = `SELECT * FROM tips ;`;
  let imgArray = ['./assets/a1.jpg','./assets/a2.jpg'];
  client
    .query(SQL)
    .then(tipsData => {
      // console.log(tipsData.rows);
      // res.send(tipsData.rows);
      res.render('pages/useful', { tips: tipsData.rows , imgs: imgArray });
    })
    .catch(error => {
      console.log(error);
    });
}

function addTip(req, res) {
  let { title, description } = req.body;
  let SQL = `INSERT INTO tips (title,description)VALUES ($1,$2) RETURNING *;`;
  let safeValues = [title, description];
  client.query(SQL, safeValues).then(() => {
    // console.log(results.rows[0]);
    // res.send(results.rows);
    res.redirect(`/tips`);
  });
}

function editTip(req, res) {
  // console.log(req.params);
  let SQL = `SELECT * FROM tips WHERE id=$1;`;
  let safeValues = [req.params.id];
  // console.log(safeValues);
  client.query(SQL, safeValues).then(results => {
    // res.send(results.rows[0]);
    console.log(results.rows);
    res.render('pages/editTip', { edit: results.rows[0] });
  });
}

function deleteTip(req, res) {
  let SQL = `DELETE FROM tips WHERE id=$1;`;
  let value = [req.params.id];
  client.query(SQL, value).then(res.redirect('/tips'));
}

function updateTip(req, res) {
  let { title, description } = req.body;
  let SQL = `UPDATE tips SET title=$1,description=$2 WHERE id=$3;`;
  let safeValues = [title, description, req.params.id];
  client.query(SQL, safeValues).then(() => {
    res.redirect(`/showTip/${req.params.id}`);
  });
}

function favorite(req, res) {
  let { placeName, Adress, photo, rating } = req.body;
  // console.log(placeName);
  let SQL =
    'INSERT INTO places (placeName,Adress,photo,rating) VALUES ($1,$2,$3,$4) RETURNING * ;';
  let safeValues = [placeName, Adress, photo, rating];
  // console.log(req.body);
  // console.log(safeValues);
  client
    .query(SQL, safeValues)
    .then(() => res.redirect('/'))
    .catch(() => {
      res.redirect('/');
    });
}


function aboutHandler(req,res){
  res.render('pages/about');
}



module.exports = {
  homePage,
  detailsPage,
  searchBook,
  tipsHandler,
  addTip,
  editTip,
  deleteTip,
  updateTip,
  favorite,
  aboutHandler,

};
