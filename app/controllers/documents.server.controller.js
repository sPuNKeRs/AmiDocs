;(function(){
    'use strict';

    // Подключаем зависимости
    var async = require('async');    
    var Document = require('../models/documents.mysql.server.models.js');

    // Получить список всех документов
    exports.getAllDocuments = getAllDocuments;

    // Создать новый документ
    exports.createDocument = createDocument;

    // Получить документ по ID
    exports.getDocumentById = getDocumentById;

    // Сохранить изменения в документ
    exports.updateDocumentById = updateDocumentById;

    // Удалить документ по ID
    exports.deleteDocumentById = deleteDocumentById;

    // ----- //
    // Получить список всех документов
    function getAllDocuments(req, res){
        console.log('Получить список всех документов!');
        Document.getAllDocuments(function(results){
            console.log(results);
            res.status(200).json(results);
        }); 
    }

    // Функция сохранения изменений в документ
    function updateDocumentById(req, res, next){
        console.log('Сохраняем изменения в документ - ' + req.body.id);
        var changedDocument = req.body;
        var documentID = changedDocument.id;

        Document.updateDocumentById(documentID, changedDocument, function(result){
            console.log('Успешное сохранение изменений!');
            console.log(result);
            res.status(200).json(result);            
        });        
    }

    // Функция для загрузки документа по ID
    function getDocumentById(req, res, next){
        var documentID = req.params.id;
        console.log('Получить документ по ID: ' + documentID);

        Document.getDocumentById(documentID, function(result){
            console.log(result);
            res.status(200).json(result);            
        });
    }

    // Функция создания нового документа
    function createDocument (req, res, next){
        console.log('Создаем новый документ!');
        var newDocument = req.body;
        newDocument.creator_id = req.user.userId;

        console.log(newDocument);

        Document.createDocument(newDocument, function(result){
            console.log(result);
            res.status(200).json('{status: "success"}');
        });
    }

    // Функция удаления документа по id
    function deleteDocumentById(req, res, next){
        // Инициализация 
        var documentID = req.params.id;
        console.log('Удаляем документ: ' + documentID);
        if(documentID){
            Document.deleteDocumentById(documentID, function(result){
                console.log('Успешное удаление: ');
                console.log(result);
                res.status(200).json(result);                
            });
        }
    }
})();