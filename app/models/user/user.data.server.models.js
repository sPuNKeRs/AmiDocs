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
		this.findById({_id: userId}).exec(function(err, result){
			callback(err, result);
		});
	};

	return schema;
};