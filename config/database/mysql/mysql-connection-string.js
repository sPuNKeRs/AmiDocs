//  Конфигурация подключения к БД MySQL

var mysqlConnectionString = {
    connection:{
        
        dev: {
            host: 'localhost',
            user: 'punker',
            password: 'punker',
            database: 'amidocs'
        },

        production:{
            host: 'localhost',
            user: 'youuser',
            password: 'youpassword',
            database: 'youdatabase'
        }

    }
}

module.exports.mysqlConnectionString = mysqlConnectionString;