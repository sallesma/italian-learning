var express = require('express');
var morgan = require('morgan');

const mongo = require('mongodb'), assert = require('assert');

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

app.get('/', function(req, res) {
  res.redirect('/words');
})

app.get('/words', function (req, res) {
  db.collection('words').find().toArray((err, words) => {
    res.render('index', {
      words: words,
      title: "Known words"
    });
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

  db.collection('words').insertOne(word, function(err, r) {
    assert.equal(null, err);
    assert.equal(1, r.insertedCount);
  });

  res.redirect('/');
});

app.get('/words/:id/edit', function(req, res) {
  db.collection('words').findOne({'_id': new mongo.ObjectId(req.params.id)}, function(err, word) {
    assert.equal(err, null);

    res.render('edit', {
      title: "Edit a word",
      word: word
    });
  });
});

app.put('/words/:id/update', function(req, res) {
  var body = req.body;
  var word = new Word(body.french, body.italian)

  db.collection('words').findOneAndUpdate({'_id': new mongo.ObjectId(req.params.id)}, word, function(err, word) {
    assert.equal(err, null);

    res.redirect('/');
  });
});

var db;
mongo.MongoClient.connect('mongodb://localhost:27017/italian-learning', (err, database) => {
  if (err) return console.log(err);
  db = database;

  app.listen(3000, () => {
    console.log('Listening on port 3000...');
  })
})
