var express = require('express');
var dateformat = require('dateformat');
var path = require('path');
var app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.get("/", function (request, response) {
  response.render('index');
});

app.get("/:time", function (request, response) {
  var result = {};
  var time = request.params.time;
  if(!isNaN(Number(time))){
    result = {
      "unix": Number(time),
      "natural": dateformat(new Date(Number(time)*1000), "mmmm dd, yyyy")
    }
  }else{
    if(new Date(time) != 'Invalid Date'){
      result = {
        "unix": Date.parse(time)/1000,
        "natural": time
      }
    }else{
      result = {
        "unix": null,
        "natural": null
      }
    }
  }
  response.send(result);
});


// listen for requests :)
app.listen(3000, function () {
  console.log('Your app is listening on port 3000');
});