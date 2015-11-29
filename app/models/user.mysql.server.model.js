;(function(){
	'use strict';
	// Подключаем зависимости
	var crypto = require('crypto');
    var async = require('async');
    var contract = require('../lib/contract.js');
    var connectionProvider = require('../../config/database/mysql/mysql-connection-sting-provider.js');
    var connection = connectionProvider.mysqlConnectionProvider.getMysqlConnection();
    var moment = require('moment');

    contract.debug = true;

    // Класс для работы с пользователями

    // Конструктор
    function User(userObj){     

        // Инициализация пользователя
        if(userObj === undefined){ userObj = {}; }    	
    	
    	// Публичные свойства
    	this.surname = userObj.surname;  // Фамилия пользователя
        this.name = userObj.name; // Имя пользователя
        this.lastname = userObj.lastname; // Отчество пользователя
        this.email = userObj.email; // Электронный адрес пользователя
        this.login = userObj.login; // Логин пользователя        
        this.hashedPassword = (userObj.hashedPassword) ? userObj.hashedPassword : ''; // Шифрованный пароль пользователя
        this.salt = (userObj.salt) ? userObj.salt : ''; // Соль для пароля
        this.created = moment(new Date()).toDate(); // Дата создания
        this.state = (userObj.state) ? userObj.state : '0'; // Состояние учетной записи   

        // Закрытые свойства
        if(userObj.password){
            var password = userObj.password;
            this.salt = Math.random() + ''; 
            this.hashedPassword = this._encryptPassword(password);
        }             
    }

    //Методы класса

    // Закрытые методы класса
    // Хэширование пароля
    User.prototype._encryptPassword = function(password){
        return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    };
    
    // Проверить на уникальность Логин пользователя
    User.prototype._checkUniqLogin = function(login, callback){

        var self = this;

        self.getUserByLogin(login, function(result){
            if(result){
                callback(false);
            }else{
                callback(true);
            }
        });
    };    
    
    // Публичные методы
    // Создать нового пользователя
    User.prototype.save = function(callback){
        // Инициализация переменных
        var User = this;

        // Проверяем переменные
        if(this.surname && this.email && 
           this.login && this.hashedPassword && this.salt){
            
            // Формируем запрос на создание пользователя
            var insertStatement = "INSERT INTO `amidocs`.`users` SET?";            

            if(connection){
                connection.query(insertStatement, User, function(err, result){
                    if(err) { throw err;}
                    callback({status: 'success'});
                    //console.log(result);                    
                });
            }
            callback(User);
        }else{
            console.log('Ошибка: не все данные заполнены.');
            callback(false);
        }
    }; 

    // Получить пользователя по Логину
    User.getUserByLogin = function(login, callback){
        // Инициализвация переменных
        //var self = this;
        var selectStatement = "SELECT * FROM amidocs.users AS t1 WHERE t1.login = '"+login+"';";
        
        if(connection){
            connection.query(selectStatement, function(err, result){
                if(err) { throw err;}

                if(result.length > 0){
                    callback(result);    
                }else{
                    callback(false);
                }                
            });
        }        
    };
    
    // Авторизация пользователя
    User.authorize = function(login, password, callback){
        
        // Инициализация переменных                
        async.waterfall([function(callback){
            // Получаем пользователя по логину
            User.getUserByLogin(login, function(user){
                
                if(user){
                    callback(null, user[0]);    
                }else{
                    callback({error: 'Пользователь не существует!'});
                }
                
            }); 
        },
        function(user, callback){
            if(user){
                user = new User(user);
                
                console.log(user);
               
                   
            }            
        }], 
        function(err, results){
            if(err){
                console.log(err);
            }
        });
    };
    
    //////////////////////////

    User.authorize("PuNKeR", "123", function(result){
        
    });
})();