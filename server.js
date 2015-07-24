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

 console.log(config.app.title);