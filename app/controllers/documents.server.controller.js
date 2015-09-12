;(function(){
    'use strict';

    // Подключаем зависимости
    var async = require('async');
    var Document = require('../../app/models/document.server.models.js').Document;

    // Получить список всех документов
    exports.getDocumentsList = function(req, res){
        console.log('Получить список всех документов!');
        Document.getDocumentsList(function(err, results){
            if(err) throw err;

            console.log(results);
            res.status(200).json(results);
        }); 
    };

    // Создать новый документ
    exports.createNewDocument = createNewDocument;

    // Получить документ по ID
    exports.getDocumentById = getDocumentById;

    // Сохранить изменения в документ
    exports.saveChangesDocument = saveChangesDocument;

    // Удалить документ по ID
    exports.deleteDocument = deleteDocument;

    // ----- //

    // Функция сохранения изменений в документ
    function saveChangesDocument(req, res, next){
        console.log('Сохраняем изменения в документ - ' + req.body._id);
        var changedDocument = req.body;
        var documentID = changedDocument._id;

        Document.saveChangesDocument(documentID, changedDocument, function(err, result){
            if(err){
                console.log('Ошибка при сохранении изменений: ');
                console.log(err);
                res.status(500).json({error: err});
                next(err);
            }else{
                console.log('Успешное сохранение изменений!');
                console.log(result);
                res.status(200).json(result);
            }
        });
        
    }

    // Функция для загрузки документа по ID
    function getDocumentById(req, res, next){
        var documentID = req.params.id;
        console.log('Получить документ по ID: ' + documentID);

        Document.getDocumentById(documentID, function(err, result){
            if(err){
                console.log(err);
                res.status(500).json({error: err});
                next(err);
            }else{
                console.log(result);
                res.status(200).json(result);
            }
        });
    }

    // Функция создания нового документа
    function createNewDocument (req, res, next){
        console.log('Создаем новый документ!');
        var newDocument = new Document(req.body);

        newDocument.save(function(err, result){
            if(err){
                res.status(500).json({error: err});
                next(err);
            }else{
                console.log('Документ успешно создан!');
                console.log(result);
                res.status(200).json(result);
            }       
        });
    }

    // Функция удаления документа по id
    function deleteDocument(req, res, next){
        // Инициализация 
        var documentID = req.params.id;
        console.log('Удаляем документ: ' + documentID);
        if(documentID){
            Document.deleteDocumentById(documentID, function(err, result){
                if(err){
                    console.log('Ошибка при удалении документа: ');
                    console.log(err);
                    res.status(500).json({error: err});
                    next(err);
                }else{
                    console.log('Успешное удаление: ');
                    console.log(result);
                    res.status(200).json(result);
                }
            });
        }
    }

})();