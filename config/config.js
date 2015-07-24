'use strict';

/**
* Module dependencies.
*/
var _ = require('lodash'),
	glob = require('glob'),
	fs = require('fs');

/**
 *  Загрузка конфигурации из файлов конфигузации в зависимоти от "Окружения среды"
 */
var resolvingConfig = function() {
	var conf = {};

	conf = _.extend(
		require('./env/all'),
		require('./env/' + process.env.NODE_ENV) || {}
	);

	return _.merge(conf, (fs.existsSync('./config/env/local.js') && require('./env/local.js')) || {});
};

/**
 * Загрузка конфигузации приложения
 */
module.exports = resolvingConfig();