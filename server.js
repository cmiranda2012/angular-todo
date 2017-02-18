const express  = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8081;
const config = require('./config/db');
const app = express();

// configuration 
mongoose.connect(config.database);

// express app
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));
app.use(morgan('dev'));
app.use(bodyParser.json());

require('./app/routes.js')(app);

app.listen(port, function() {
	console.log(`App running on port ${port}`);
});
