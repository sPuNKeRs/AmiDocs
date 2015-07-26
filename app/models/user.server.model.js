var crypto = require('crypto');
var async = require('async');

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var schema = new Schema({
	surname:{
		type: String,
		unique: false,
		required: false
	},
	name:{
		type: String,
		unique: false,
		required: false
	},
	lastname:{
		type: String,
		unique: false,
		required: false
	},
	email:{
		type: String,
		unique: true,
		required: false
	},
	userLogin:{
		type: String,
		unique: true,
		required: true
	},
	hashedPassword:{
		type: String,
		required: true
	},
	salt:{
		type: String,
		required: true
	},
	created:{
		type: Date,
		default: Date.now
	},
	roles:{
		type: Array,
		required: true,
		default: ['registered']
	},
	groups:{
		type: Array,
		required: false,
		default: ['users']
	},
	state:{
		type: Boolean,
		require: true,
		default: true		
	},	
});

schema.methods.encryptPassword = function(password){
	return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
	.set(function(password){
		this._plainPassword = password;
		this.salt = Math.random() + '';
		this.hashedPassword = this.encryptPassword(password);
	})
	.get(function(){ return this._plainPassword});

schema.methods.checkPassword = function(password){
	return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.authorize = function(userLogin, password, callback){
	var User = this;

	async.waterfall([
		function(callback){
			User.findOne({userLogin: userLogin}, callback);
		},
		function(user, callback){
			if(user){
				if(user.checkPassword(password)){
					callback(null, user);
				}else{
					callback({error: "Не верный пароль!"});
				}
			}else{				
				callback({error: "Пользователя не существует."});
			}
		}
		], callback);
};

exports.User = mongoose.model('User', schema);