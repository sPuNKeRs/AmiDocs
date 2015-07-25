'use strict';

/**
* Подключаем зависимости
*/
var fs = require('fs'); // Модуль для работы с файловой системой
var http = require('http'); // Модуль для работы с HTTP
var https = require('https'); // Модуль для работы с HTTPS
var express = require('express'); // Модуль EXPRESS
var morgan = require('morgan'); // Логгер HTTP запросов
var logger = require('./logger'); // Конфигурация Логгера
var bodyParser = require('body-parser'); // Модуль парсер (HTTP)
var session = require('express-session'); // Модуль для работы с сессиями
var compression = require('compression'); // Модуль для сжатия запросов
var methodOverride = require('method-override'); // Модуль позволяет использовать HTTP методы (PUT, DELETE)
var cookieParser = require('cookie-parser'); // Модуль парсер cookie
var helmet = require('helmet'); // Модуль позволяет повысить защиту EXPRESS приложения (HEADERS)
var passport = require('passport'); // Модуль для поддержки авторизации
var MongoStore = require('connect-mongo')({session: session}); // Модуль для хранения сессий в MongoDB
var flash = require('connect-flash'); // Модуль для вывода flash - сообщений
var config = require('./config'); // Модуль конфигурирования приложения
var consolidate = require('consolidate'); // Библиотека шаблонизаторов
var path = require('path'); // Модуль для работы с путями
var mongoose = require('mongoose');

module.exports = function(db){
	// Инициализация EXPRESS приложения
	var app = express();

	// Загрузка файлоф моделей (Mongoose)
	config.getGlobbedFiles('./app/models/**/*.js').forEach(function(modelPath) {
		require(path.resolve(modelPath));
	});

	// Инициализация локальных переменных
	app.locals.title = config.app.title;
	app.locals.description = config.app.description;
	app.locals.keywords = config.app.keywords;
	app.locals.jsFiles = config.getJavaScriptAssets();
	app.locals.cssFiles = config.getCSSAssets();
	
	// Передача строки запроса URL в локальные переменные
	app.use(function(req, res, next){
		res.locals.url = req.protocol + '://' + req.headers.host + req.url ;
		next();
	});

	// Должно распологаться перед express.static
	app.use(compression({
		// Сжимать только следующие типы файлов
		filter: function(req, res) {
			return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
		},
		// Уровень компрессии zlib
		level: 3
	}));

	// Показывать ошибки стека
	app.set('showStackError', true);

	// Устанавливаем шаблонизатор по умочанию (swig)
	app.engine('server.view.html', consolidate[config.templateEngine]);

	// Указываем путь к шаблонам и расширение шаблонизатора
	app.set('view engine', 'server.view.html');
	app.set('views', './app/views');

	// Включаем логгер (morgan)
	app.use(morgan(logger.getLogFormat(), logger.getLogOptions()));

	// Завсисимые от окружения среды middleware
	if (process.env.NODE_ENV === 'development') {
		// Выключить кэширование шаблонов
		app.set('view cache', false);
	} else if (process.env.NODE_ENV === 'production') {
		app.locals.cache = 'memory';
	}

	// Разбор тела запроса (должно быть выше methodOverride)
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	// Используем helmet для защиты заголовков запросов
	app.use(helmet.xframe());
	app.use(helmet.xssFilter());
	app.use(helmet.nosniff());
	app.use(helmet.ienoopen());
	app.disable('x-powered-by');

	// Устанавливаем путь к статическому содержимому
	app.use(express.static(path.resolve('./public')));

	// CookieParser должен быть выше сессий
	app.use(cookieParser());

	// Настраеваем Express MongoDB для хранения сессий
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret,
		store: new MongoStore({
			mongooseConnection: mongoose.connection,
			collection: config.sessionCollection
		}),
		cookie: config.sessionCookie,
		name: config.sessionName
	}));

	// Используем Passport сессии
	app.use(passport.initialize());
	app.use(passport.session());

	// Подключаем быстрые сообщения
	app.use(flash());

	// Подключаем файлы маршрутов
	 config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
	 	require(path.resolve(routePath))(app);
	 });

	// Обрабатываем ошибки
	app.use(function(err, req, res, next) {
		// Если объект ошибки не существует
		if (!err) return next();

		// Вывести ошибку
		console.error(err.stack);

		// Страница ошибки 500
		res.status(500).render('500', {
			error: err.stack
		});
	});

	// Иначе 404
	app.use(function(req, res) {
		res.status(404).render('404', {
			url: req.originalUrl,
			error: 'Не найдено',
			request: req
		});
	});

	// Возвращаем экземпляр EXPRESS
	return app;
};