
var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require("sqlite3").verbose();
var cors = require('cors');

// var db = new sqlite3.Database("db/akmy.db");
var app = express();

app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.use(express.static('assets'));
app.get('/', function(req, res){
	res.render('index.html')
});


app.listen(3344);
console.log('Listening on port 3344');
