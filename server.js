var express = require('express');
var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/text', function(req, res) {
  console.log('sup yall');
  var url = 'http://www.imdb.com/title/tt1229340';
  var rawText;

  request(url, function(error, response, html) {
    console.log('making request...');
    if (!error) {
      console.log('no errors!');
      var $ = cheerio.load(html);

      var stripped = $('body').clone();
      stripped.find('script').remove();
      rawText = stripped
        .text()
        .trim()
        .split(" ")
        .map(el => el.trim().toLowerCase())
        .filter((el, idx, arr) => el && el.search(/[^A-Z]/i) === -1 && arr.indexOf(el) === idx);

      res.send(rawText);
    }

  });

});

app.get('*', function(req, res) {
  res.render('index');
});

app.listen(3001, function() {
  console.log("Listening on localhost:3001");
});