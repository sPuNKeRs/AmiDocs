'use strict';

/**
* Подключаем зависимости
*/
var init 	 = require('./config/init')(); // Инициализация приложения
var config 	 = require('./config/config'); // Конфигурация приложения
var mongoose = require('mongoose'); // Работа с БД MongoDB
var chalk 	 = require('chalk'); // Модуль для расскраски текта в консоли

/**
 * Главный файл входа в приложение
 * Обратите внимание, порядок загрузки очень важен.
 */

// Подключение базы данных
var db = mongoose.connect(config.db.uri, config.db.options, function(err){
	if(err){
		console.error(chalk.red('Ошибка подключение к MongoDB!'));
	}
});
mongoose.connection.on('error', function(err){
	console.error(chalk.red('Ошибка соединиения с MongoDB: ' + err));
});


// Инициализация EXPRESS
var app = require('./config/express')(db);

// Запускаем приложение на порту <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log(chalk.red('-----------'));
console.log(chalk.green(config.app.title + ' - приложение запущено'));
console.log(chalk.green('Среда:' + process.env.NODE_ENV));
console.log(chalk.green('Порт:' + config.port));
console.log(chalk.green('База данных:' + config.db.uri));
console.log(chalk.yellow('URL: http://10.0.0.66:' + config.port));
console.log(chalk.red('-----------'));