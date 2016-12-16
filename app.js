var express = require('express');
var morgan = require('morgan');

const mongo = require('mongodb');

var app = express();
app.use(morgan('combined'));

var methodOverride = require('method-override')
app.use(methodOverride('_method'));

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.use(function(req, res, next) {
  req.database = db;
  next();
});

app.use('/words', require('./controllers/words'));

app.get('/', function(req, res) {
  res.redirect('/words');
})

var db;
mongo.MongoClient.connect('mongodb://localhost:27017/italian-learning', (err, database) => {
  if (err) return console.log(err);
  db = database;

  app.listen(3000, () => {
    console.log('Listening on port 3000...');
  })
})
