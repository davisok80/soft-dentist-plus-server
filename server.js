var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// Main
var index = require('./routes/index');

// Master
var configuration = require('./routes/master/configuration');
var users = require('./routes/master/users');

// Modules
var patients = require('./routes/modules/patients');
var specialist = require('./routes/modules/specialist');
var quotes = require('./routes/modules/quotes');
var odontogram = require('./routes/modules/odontogram');

console.log(process.env.PORT);

var port = 8080;

var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
})

app.use('/', index);

// Master
app.use('/master', configuration);
app.use('/master', users);

// Modules
app.use('/module', patients);
app.use('/module', specialist);
app.use('/module', quotes);
app.use('/module', odontogram);

app.listen(port, function(){
	console.log('Server started on port ' + port);
})