'use strict';

/**
 * Подключаем зависимости
 */
 var passport = require('../../../config/passport.js')();
 var auth = require('../../middleware/auth.js');

 exports.signin = passport.authenticate('local');

 exports.signout = function(req, res){
 	req.logOut();
	res.sendStatus(200);
 };

 exports.checkAuth = auth;