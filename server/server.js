const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = __dirname + '/app/views/';
const app = express();
require('dotenv').config({path: __dirname + '/vars/.env'});
const axios = require('axios').default;
var qs = require('qs');
var session = require('express-session')
const oneDay = 1000 * 60 * 60 * 24;
// let sess = session;
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var MemoryStore =session.MemoryStore;

app.use(session({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  store: new MemoryStore(),
  resave: false 
}));
app.use(express.static(path));

app.get('/',  (req, res)=> {
  // console.log("YO")

  // console.log(req.session.expiry)
  // console.log("YO")
  res.sendFile(path + "index.html");
});
// app.get('/api',  (req, res)=> {
//   console.log("YO")

//   // console.log(req.session.expiry)
//   // console.log("YO")
//   res.sendFile(path + "index.html");
// });

app.get('/api/spotify-auth', (req, res) => {
  console.log("HIT")
  console.log(req.query.code);
  if(req.query.code){
      let code = req.query.code;
      var url = "https://accounts.spotify.com/api/token";
      const headers = { "Authorization": 'Basic ' + (new Buffer.from((process.env.client_id + ':' + process.env.client_secret)).toString('base64')), 
      'Content-Type': 'application/x-www-form-urlencoded' };
      const requestOptions = 
          qs.stringify({'code': code,'redirect_uri': process.env.redirect_uri, 'grant_type': 'authorization_code'});
      axios.post(url, requestOptions, {headers: headers})
      .then((response)=>{
          req.session.spotify_access_token = response.data.access_token;
          req.session.spotify_refresh_token = response.data.refresh_token;
          req.session.spotify_expiry = Math.floor(Date.now() / 1000) + 3600;
          req.session.save(function(err) {
            // session saved
          })
          console.log(req.session)
          res.json({"access_token": response.data.access_token, "refresh_token": response.data.refresh_token,
          "timestamp": + Math.floor(Date.now() / 1000)})

      })
      .catch(function (error) {
        console.log(error);
      }) 
  }
})

app.get('/api/login', function (req, res) {
  var state = Math.floor(Math.random() * 16) + 1;
  const redirectURL =
  process.env.NODE_ENV === "production"
    ? "http://localhost:8080"
    : "http://localhost:8080";
    console.log(redirectURL)
  var url = new URL("https://accounts.spotify.com/authorize?");
  url.searchParams.append('response_type', 'code');
  url.searchParams.append('client_id', process.env.client_id);
  url.searchParams.append('scope', process.env.scopes);
  url.searchParams.append('redirect_uri', redirectURL);
  url.searchParams.append('state',  state);
  res.redirect(url);

});

app.post('/api/top-artists', function (req, res) {
  console.log(req.body.access_token)
  console.log(req.body.type)
  console.log(req.body.limit)
  var url = "https://api.spotify.com/v1/me/top/" + req.body.type;
  const headers = { Accept: 'application/json', Authorization: 'Bearer ' + req.body.access_token, 'Content-Type': 'application/json'};
  // const requestOptions = 
  //     {params: {limit: req.body.limit}};
  axios.get(url, {params: {limit: req.body.limit}, headers: headers})
  .then((response)=>{
    res.json(response.data)
    // console.log(sess.spotify_access_token)
    
  })
  .catch(function (error) {
    console.log(error);
    // console.log(req.body.type)
    // console.log(req.body.access_token)
    // console.log(req.body.limit)
  }) 
  
});

app.post('/api/artist-top', function (req, res) {
  var url = `https://api.spotify.com/v1/artists/${req.body.id}/top-tracks`;
  const headers = { Accept: 'application/json', Authorization: 'Bearer ' + req.body.access_token, 'Content-Type': 'application/json'};
  axios.get(url, {params: {market: "GB"}, headers: headers})
  .then((response)=>{
    res.json(response.data)
  })
  .catch(function (error) {
    console.log(error);
  }) 
  
});

// require("./app/routes/turorial.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 3080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});