// Подключаем зависимости
var moment = require('moment');
var connectionProvider = require('../../config/database/mysql/mysql-connection-sting-provider.js');

var DocumentsModel = {
    // Создать новый документ
    createDocument: function(documentData, callback){

        var insertStatement = "INSERT INTO `amidocs`.`documents` SET?";

        var document = {
                doc_number: documentData.doc_number,
                title: documentData.title,
                description: documentData.description,
                receipt_date: documentData.receipt_date,
                create_date: moment(new Date()).toDate(),
                update_date: moment(new Date()).toDate(),
                status: documentData.status,
                creator_id: documentData.creator_id
        }

        var connection = connectionProvider.mysqlConnectionProvider.getMysqlConnection();

        if(connection){

            connection.query(insertStatement, document, function(err, result){
                if(err) { throw err;}

                callback({status: 'success'});
                console.log(result);

            });
        }
    },
    // Получить список всех документов
    getAllDocuments: function(callback){
        var selectStatement = "SELECT * FROM `amidocs`.`documents`";

        var connection = connectionProvider.mysqlConnectionProvider.getMysqlConnection();

        if(connection){

            connection.query(selectStatement, function(err, result){
                if(err) { throw err;}

                callback(result);
                //console.log(result);

            });
        }
    },
    // Получить документ по ID
    getDocumentById: function(documentID, callback){
        var selectStatement = "SELECT * FROM `amidocs`.`documents` WHERE id=" + documentID + ";";

        var connection = connectionProvider.mysqlConnectionProvider.getMysqlConnection();

        if(connection){

            connection.query(selectStatement, function(err, result){
                if(err) { throw err;}

                callback(result);
                //console.log(result);

            });
        }
    },
    // Изменить документ по ID
    updateDocumentById: function(documentID, changedDocument, callback){
        var updateStatement = "UPDATE `amidocs`.`documents` SET? WHERE id=" + documentID + ";";

        var connection = connectionProvider.mysqlConnectionProvider.getMysqlConnection();

        var document = {
                doc_number: changedDocument.doc_number,
                title: changedDocument.title,
                description: changedDocument.description,
                receipt_date: changedDocument.receipt_date,
                update_date: moment(new Date()).toDate(),
                status: changedDocument.status
        }

        if(connection){

            connection.query(updateStatement, document, function(err, result){
                if(err) { throw err;}

                //callback({status: 'success'});
                callback(result);
                //console.log(result);
            });
        }
    }
}

module.exports = DocumentsModel;