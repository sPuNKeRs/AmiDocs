;(function(){
    'use strict';

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
        .get(function(){ return this._plainPassword;});

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

            });
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


    exports.User = mongoose.model('User', schema);
})();