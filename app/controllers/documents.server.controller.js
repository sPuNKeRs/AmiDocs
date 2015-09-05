'use strict';

// Подключаем зависимости
var async = require('async');
var Document = require('../../app/models/document.server.models.js').Document;

// Получить список всех документов
exports.getDocumentsList = function(req, res){
	console.log('Получить список всех документов!');
	res.status(200).send('DocsList');
};

function createDoc(){
	var document = new Document({
		doc_number: '134-ФЗ',
		title: 'Закон о Здравоохранении Сочи',
		receipt_date: '2015-09-05',
		status: false,
		creator_id: 'PuNKeR'
	});

	document.save(function(err, result){
		if(err) throw err;

		console.log(result);
	});	
};

//createDoc();