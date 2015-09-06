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

exports.createNewDocument = createNewDocument;



// ----- //

// Функция создания нового документа
function createNewDocument (req, res){
	console.log('Создаем новый документ!');
	var newDocument = new Document(req.body);

	newDocument.save(function(err, result){
		if(err) throw err;

		console.log('Документ успешно создан!');
		console.log(result);

		res.status(200).json(result);
	});
}