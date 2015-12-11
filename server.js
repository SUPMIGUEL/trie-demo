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
  var url = req.query.url;
  var rawText;

  request(url, function(error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);

      var stripped = $('body').clone();
      stripped.find('script').remove();
      rawText = stripped
        .text()
        .trim()
        .split(" ")
        .map(function(el) { return el.trim().toLowerCase(); })
        .filter(function(el) { return el && el.search(/[^A-Z]/i) === -1; });

      var uniqueWords = rawText.filter(function(el, idx, arr) {
        return arr.indexOf(el) === idx;
      });

      res.send({data: uniqueWords, length: rawText.length, uniqueLength: uniqueWords.length});
    }

  });

});

app.get('*', function(req, res) {
  res.render('index');
});

app.listen(3001, function() {
  console.log("Listening on localhost:3001");
});