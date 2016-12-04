var express = require('express');
var morgan = require('morgan');

var app = express();
app.use(morgan('combined'));

var methodOverride = require('method-override')
app.use(methodOverride('_method'));

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');


var Word = function(french, italian) {
  this.french = french;
  this.italian = italian;
}
var words = [
  new Word("chien", "cane"),
  new Word("chat", "gatto"),
  new Word("souris", "toppo")
];


app.get('/', function(req, res) {
  res.redirect('/words');
})

app.get('/words', function (req, res) {
  res.render('index', {
    words: words,
    title: "Known words"
  });
});

app.get('/words/new', function(req, res) {
  res.render('new', {
    title: "Add a word"
  });
});

app.post('/words', function(req,res) {
  var body = req.body;
  var word = new Word(body.french, body.italian);
  words.push(word);

  res.redirect('/');
});

app.get('/words/:id/edit', function(req, res) {
  var word = words[req.params.id];
  res.render('edit', {
    title: "Edit a word",
    word: word,
    id: req.params.id
  });
});

app.put('/words/:id/update', function(req,res) {
  var word = words[req.params.id];
  var body = req.body;
  word.french = body.french;
  word.italian = body.italian;
  
  res.redirect('/');
});

app.listen(3000, function(){
  console.log("Listening on port 3000...");
});