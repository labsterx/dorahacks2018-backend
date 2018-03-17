#!/bin/env node

'use strict';

var express    = require('express');
var mongoose   = require('mongoose');
var jwt        = require('jsonwebtoken');  //https://npmjs.org/package/node-jsonwebtoken
var expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt
var config     = require('./config');
var app        = express();

var db = mongoose.connect(config.mongo.uri);

var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.OPENSHIFT_INTERNAL_PORT || config.port; // set our port
var ipaddr = process.env.OPENSHIFT_NODEJS_IP || process.env.OPENSHIFT_INTERNAL_IP || 'localhost';

var USERS = config.usrs;

require('./routes')(app);

// START THE SERVER
// =============================================================================
app.listen(port, ipaddr);
console.log('Magic happens on port ' + port);

