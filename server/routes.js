/**
 * Main application routes
 */

'use strict';

var express    = require('express');
var path       = require('path');
var fs         = require('fs');
var jwt        = require('jsonwebtoken');  //https://npmjs.org/package/node-jsonwebtoken
var expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt
var bodyParser = require('body-parser');
var config     = require('./config');

module.exports = function(app) {

	var auth = require('./controllers/auth');
	var data = require('./controllers/data');

	app.use(bodyParser());
	app.use(express.static(path.join(__dirname, '../client')));
	// app.use('/bower_components', express.static(path.join(__dirname, '../bower_components')));

	// app.use('/api', expressJwt({secret: config.jwt.secret}));

	app.use(function(err, req, res, next){
		if (err.constructor.name === 'UnauthorizedError') {
			res.send(401, 'Unauthorized');
		}
	});

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

	// Auth
	app.post('/auth', auth.auth);
	// app.post('/auth/encrypt', auth.encrypt);
	// app.post('/auth/check', auth.check);
	// app.get('/auth/test', auth.test);
	app.post('/api/refreshtoken', auth.refreshToken);

	app.get('/api/data', data.index);
	app.post('/api/data', data.create);
	app.get('/api/data/:id', data.findById);
	app.get('/api/data/txhash/:txhash', data.findByTxHash);
	app.put('/api/data/:id', data.update);
	app.delete('/api/data/:id', data.delete);

	// Tests
	app.get('/foo', function(req, res) {
		res.json({ message: '/foo' });
	});

};
