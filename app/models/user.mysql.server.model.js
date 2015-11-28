;(function(){
	'use strict';
	// Подключаем зависимости
	var crypto = require('crypto');
    //var async = require('async');
    var contract = require('../lib/contract.js');
    var connectionProvider = require('../../config/database/mysql/mysql-connection-sting-provider.js');
    var connection = connectionProvider.mysqlConnectionProvider.getMysqlConnection();
    var moment = require('moment');

    contract.debug = true;

    // Класс для работы с пользователями

    // Конструктор
    function User(newUser){
        //console.log(arguments);
        // contract(arguments)
        // .params('object')
        // .end();

        // Инициализация пользователя
        if(newUser === undefined){ newUser = {}; }    	
    	
    	// Публичные свойства
    	this.surname = newUser.surname;  // Фамилия пользователя
        this.name = newUser.name; // Имя пользователя
        this.lastname = newUser.lastname; // Отчество пользователя
        this.email = newUser.email; // Электронный адрес пользователя
        this.login = newUser.login; // Логин пользователя        
        this.hashedPassword = ''; // Шифрованный пароль пользователя
        this.salt = ''; // Соль для пароля
        this.created = moment(new Date()).toDate(); // Дата создания
        this.state = (newUser.state) ? newUser.state : '0'; // Состояние учетной записи   

        // Закрытые свойства
        if(newUser.password){
            var password = newUser.password;
            this.salt = Math.random() + ''; 
            this.hashedPassword = this._encryptPassword(password);
        }             
    }

    //Методы класса

    // Закрытые методы класса
    User.prototype._encryptPassword = function(password){
        return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
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
                    console.log(result);

                });
            }
            callback(User);

        }else{
            console.log('Ошибка: не все данные заполнены.');
            callback(false);
        }
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


    // Получить пользователя по Логину
    User.prototype.getUserByLogin = function(login, callback){
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



    // Получить пользователя по ID
    User.prototype.getUserById = function(userID, callback){
            callback('User = ' + userID);
    };


    var newUser = new User({surname: 'Аленин',
                            name: 'Егор',
                            lastname: 'Сергеевич',
                            email: 'sliva666@mail.ru',
                            login: 'Gosha',
                            password: '123456',
                            state: true,
                            });  
    console.log(newUser);
    console.log("///////////////////");

    var newUser2 = new User();  
    console.log(newUser2);
    console.log("///////////////////");


    // newUser.getUserByLogin('PuNKeR', function(result){
    //     console.log(result);
    // });
    newUser._checkUniqLogin("PuNKeR", function(result){
        console.log(result);        
    });   

    // newUser.save(function(result){
    //     console.log(result);
    // });

})();