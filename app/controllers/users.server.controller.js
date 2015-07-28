'use strict';

/**
 * Подключаем зависимости
 */
var _ = require('lodash');

/**
 * Рассширяем котроллер пользователя
 */
module.exports = _.extend(
		require('./users/users.authorization.server.controller'), 
		require('./users/users.profile.server.controller')			
);
