var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./app/config/nodeconfig');
var port = config.applicationPort;


mongoose.connect(config.dbURI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
	next();
});
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

var apiRouter = require('./app/routes/userRoutes.js')(app, express);
app.use('/api', apiRouter);

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(port);
console.log('Server running at port ' + port);
