// Расширяем функционал модели User
module.exports = function(schema){
	
	// Получить список пользователей
	schema.statics.getUsersList = function(callback){
		this.find({},{surname: 1, name: 1, lastname: 1, email: 1, 
					   userLogin: 1, state: 1, created: 1}, function(err, result){
				callback(err, result);
		});
	};

	// Получить пользователя по ID
	schema.statics.getUserById = function(userId, callback){
		this.findById({_id: userId}, 
					  {surname: 1, name: 1, lastname: 1, email: 1, 
					   userLogin: 1, state: 1, created: 1}).exec(function(err, result){
			callback(err, result);
		});
	};

	// Сохранить изменения в данных пользователя
	schema.statics.editUser = function(userId, newUserData, callback){
		this.findByIdAndUpdate(userId, {$set: newUserData}, function(err, user){
			callback(err, user);
		});		
	};

	// Проверить существование логина в базе
	schema.statics.checkUniqLogin = function(userLogin, callback){
		console.log('Проверка на уникальность логина: ' + userLogin);

		this.find({userLogin: userLogin}).exec(function(err, result){
			if(err) callback(err);

			if(result.length > 0){
				return callback(null, false);
			}else{
				return callback(null, true);
			}

		})
	};

	// Проверить существование email в базе
	schema.statics.checkUniqEmail = function(userEmail, callback){
		this.find({email: userEmail}).exec(function(err, result){
			if(err) callback(err);

			if(result.length > 0){
				return callback(null, false);
			}else{
				return callback(null, true);
			}
		});
	};

	// Удалить пользователя из базы по id
	schema.statics.deleteUserById = function(userId, callback){
		this.findOne({_id: userId}).remove().exec(callback);
	};


	return schema;
};