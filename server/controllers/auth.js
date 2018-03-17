'use strict';

var jwt        = require('jsonwebtoken');  //https://npmjs.org/package/node-jsonwebtoken
var config     = require('../config');
var bcrypt     = require('bcryptjs');

var USERS      = config.users;
var secret     = config.jwt.secret;

// var tokenEexpiresInMinutes = 60*24*7;
var tokenExpires = '120h';
// var tokenEexpiresInMinutes = 31;

var findUserByUsernamePasswd = function (username, passwd) {

	var matchedUser = null;

	for (var i = 0; i < USERS.length; i++) {
		var db_user = USERS[i];
		if (username === db_user.username) {
			var passwdCompare = bcrypt.compareSync(passwd, db_user.password);
			if (passwdCompare) {
				matchedUser = db_user;
				break;
			}
		}
	}

	return matchedUser;

};

var findUserById = function (id) {

	var matchedUser = null;

	for (var i = 0; i < USERS.length; i++) {
		var db_user = USERS[i];
		if (id === db_user.id) {
				matchedUser = db_user;
				break;
		}
	}

	return matchedUser;

};

exports.auth = function (req, res) {

	var matchedUser = findUserByUsernamePasswd(req.body.username, req.body.password);

	if (!matchedUser) {
		res.send(401, 'Wrong user or password');
		return;
	}

	var profile = {
		id: matchedUser.id,
		username: matchedUser.username,
		role: matchedUser.role
	};

	var token = jwt.sign(profile, secret, { expiresIn: tokenExpires });

	res.json({ token: token });

};

exports.refreshToken = function (req, res) {

	var token = null;
	var parts = req.headers.authorization.split(' ');
	if (parts && parts.length == 2) {
		var scheme = parts[0];
		var credentials = parts[1];

		if (/^Bearer$/i.test(scheme)) {
				token = credentials;
				var decoded = jwt.decode(token, secret);
				var matchedUser = findUserById(decoded.id);
				if (matchedUser) {
					var profile = {
						id: matchedUser.id,
						username: matchedUser.username,
						role: matchedUser.role
					};
					var newToken = jwt.sign(profile, secret, { expiresIn: tokenExpires });
					res.json({ token: newToken });
				}
				else {
					res.send(401, 'Error getting user info');
					return;
				}
		}
		else {
			res.send(500, 'Error passing headers');
			return;
		}
	}
	else {
		res.send(500, 'Error passing headers');
		return;
	}

};

// exports.encrypt = function(req, res) {
// 	var passwd = req.body.password;

// 	var salt = bcrypt.genSaltSync(10);
// 	var hash = bcrypt.hashSync(passwd, salt);

// 	res.json( {encrypted: hash} );
// };

// exports.check = function(req, res) {
// 	var passwd = req.body.password;
// 	var hash = req.body.hash;
// 	var result = bcrypt.compareSync(passwd, hash);
// 	res.json( {passwd: passwd, hash: hash, result: result} );
// };

