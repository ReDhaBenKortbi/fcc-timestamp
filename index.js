// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// handle /api/:date?
app.get("/api/:date?", (req, res) => {
  //response model 
  const response = {
    unix: "",
    utc: ""
  }
  //get date params
  const {date} = req.params;
  //if no date params found
  if(!date) {
    response.unix = new Date().getTime();
    response.utc = new Date().toUTCString();
    res.json(response)
  }
  //if there's a date param
  if (!isNaN(date)) { //if it is a number
      response.unix = date
      response.utc = new Date(+date).toUTCString();
      res.json(response)
  }else { //if it is a string
      isValidDate = new Date(date).toString(); //check if this string is valid
      if(isValidDate === "Invalid Date") { // if it is not valid 
        res.json({error: "Invalid Date"})
      }else {
  // in case it's valid 
      response.unix = new Date(date).getTime();
      response.utc = new Date(date).toUTCString();
      res.json(response)
      }
    
    }
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
