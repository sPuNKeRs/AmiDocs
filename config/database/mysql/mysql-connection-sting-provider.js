// Подключаем зависимоти
var mysql = require('mysql');

var mysqlConnectionString = require('./mysql-connection-string.js');

mysqlConnectionProvider = {

    getMysqlConnection: function(){


        var connection = mysql.createConnection(mysqlConnectionString.mysqlConnectionString.connection.dev);

        connection.connect(function(err){

            if(err) {throw err;}

            console.log('Connected Succefully.');

        });
        return connection;
    },

    closeMysqlConnection: function(currentConnection){

        if(currentConnection){
            currentConnection.end(function(err){

                if(err) {throw err;}

                console.log('Connection closed succesfully.');
            });
        }
    }
};

module.exports.mysqlConnectionProvider = mysqlConnectionProvider;