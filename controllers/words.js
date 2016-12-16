var express = require('express')
  , assert = require('assert')
  , ObjectId = require('mongodb').ObjectID;

var Word = function(french, italian) {
  this.french = french;
  this.italian = italian;
}

var router = express.Router();

router.get('/', function (req, res) {
  req.database.collection('words').find().toArray((err, words) => {
    res.render('index', {
      words: words,
      title: "Known words"
    });
  });
});

router.get('/new', function(req, res) {
  res.render('new', {
    title: "Add a word"
  });
});

router.post('/', function(req,res) {
  var body = req.body;
  var word = new Word(body.french, body.italian);

  req.database.collection('words').insertOne(word, function(err, r) {
    assert.equal(null, err);
    assert.equal(1, r.insertedCount);
  });

  res.redirect('/');
});

router.get('/:id/edit', function(req, res) {
  req.database.collection('words').findOne({'_id': new ObjectId(req.params.id)}, function(err, word) {
    assert.equal(err, null);

    res.render('edit', {
      title: "Edit a word",
      word: word
    });
  });
});

router.put('/:id/update', function(req, res) {
  var body = req.body;
  var word = new Word(body.french, body.italian)

  req.database.collection('words').findOneAndUpdate({'_id': new ObjectId(req.params.id)}, word, function(err, word) {
    assert.equal(err, null);

    res.redirect('/');
  });
});

module.exports = router;
