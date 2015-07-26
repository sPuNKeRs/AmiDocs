'use strict';

/**
 * Подключаем зависимости
 */
 var passport = require('../../../config/passport.js')();
 var auth = require('../../middleware/auth.js');

 exports.signin = passport.authenticate('local');

exports.checkAuth = auth;

exports.signout = function(req, res){
	req.logOut();
	res.sendStatus(200);
};

exports.loggedin = function(req, res){
	res.send(req.isAuthenticated() ? req.user : '0');
};