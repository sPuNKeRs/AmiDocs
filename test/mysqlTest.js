// Подулючаем зависимости
var Document = require('../app/models/documents.mysql.server.models.js');
var moment = require('moment');

var changedDocument = {
                doc_number: "122342343",
                title: "1222223PiuKeR",
                description: "1233434",
                receipt_date: "0000-00-00",
                update_date: moment(new Date()).toDate(),
                status: 2,                
        };

var newDocument = {
                doc_number: "44-ФЗ",
                title: "Закон о торговле",
                description: "Данный закон регламентирует все действия по торгам",
                receipt_date: "2015-07-12",
                status: 2,
                creator_id: 1                
        };


Document.createDocument(newDocument, function(result){
    console.log(result);
})



//console.log(changedDocument);

// Document.updateDocumentById(2, changedDocument, function(result){
//     console.log(result);
// });

// Document.getAllDocuments(function(result){
//      console.log(result);
// });