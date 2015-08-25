// Расширяем функционал модели User
module.exports = function(schema){
	
	// Получить список пользователей
	schema.statics.getUsersList = function(callback){
		this.find({}, function(err, result){
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

	return schema;
};