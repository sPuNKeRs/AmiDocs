'use strict';

/**
 * Подключаем зависимости
 */
var _ = require('lodash');

/**
 * Рассширяем котроллер пользователя
 */
module.exports = _.extend(
		require('./user/user.db.server.models.js')		
);
