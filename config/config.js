;(function(){
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

	/**
	 * Получить файлы по glob шаблону
	 */
	module.exports.getGlobbedFiles = function(globPatterns, removeRoot) {
		// Для переключения контекста
		var _this = this;

		// Регулярное вырожение для путей URL
		var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

		// Выходной массив
		var output = [];

		// Если glob шаблон это массив, то используем рекурсивный путь, иначе используем glob
		if (_.isArray(globPatterns)) {
			globPatterns.forEach(function(globPattern) {
				output = _.union(output, _this.getGlobbedFiles(globPattern, removeRoot));
			});
		} else if (_.isString(globPatterns)) {
			if (urlRegex.test(globPatterns)) {
				output.push(globPatterns);
			} else {
				var files = glob.sync(globPatterns);
				if (removeRoot) {
				    files = files.map(function(file) {
				        return file.replace(removeRoot, '');
				    });
				}
				output = _.union(output, files);
			}
		}

		return output;
	};

	/**
	 * Получить JavaScript файлы модулей
	 */
	module.exports.getJavaScriptAssets = function() {
		var output = this.getGlobbedFiles(this.assets.lib.js.concat(this.assets.js), 'public/');
		return output;
	};

	/**
	 * Получить CSS файлы модулей
	 */
	module.exports.getCSSAssets = function() {
		var output = this.getGlobbedFiles(this.assets.lib.css.concat(this.assets.css), 'public/');
		return output;
	};
})();