var express  = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

// configuration 
mongoose.connect('mongodb://camrfn21:gatito89@ds153239.mlab.com:53239/todolist');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));
app.use(morgan('dev'));
app.use(bodyParser.json());

require('./app/routes/routes.js')(app);

app.listen(8080, function() {
	console.log("App running on port 8080");
});
