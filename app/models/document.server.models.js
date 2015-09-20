var crypto = require('crypto');
var async = require('async');

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Свойства модели
var schema = new Schema({
    doc_number:{
        type: String,
        unique: false,
        required: true
    },
    title:{
        type: String,
        unique: false,
        required: true
    },
    receipt_date:{
        type: Date,
        unique: false,
        required: false,
        default: Date.now
    },
    create_date:{
        type: Date,
        unique: false,
        required: true,
        default: Date.now
    },
    update_date:{
        type: Date,
        unique: false,
        required: false,
        default: Date.now
    },
    status:{
        type: Boolean,
        unique: false,
        required: true,
        default: false
    },
    creator_id:{
        type: String,
        unique: false,
        required: true
    }   
});

// Методы модели

// Получить все документы из БД
schema.statics.getDocumentsList = function(callback){
    this.find({}).exec(function(err, results){
        return callback(err, results);
    });
};

// Получить документ по ID
schema.statics.getDocumentById = function(documentID, callback){
    this.findOne({'_id': documentID}, {'update_date': 0}).exec(function(err, result){
        return callback(err, result);
    });
};

// Сохраняем изменения в документ
schema.statics.saveChangesDocument = function(documentID, changedDocumentData, callback){
        this.findByIdAndUpdate(documentID, 
                {$set: changedDocumentData, 
                 $currentDate: {"update_date": true}}, 
                function(err, result){
                    callback(err, result);
                });     
    };

// Удалить документ по ID
schema.statics.deleteDocumentById = function(documentID, callback){
    this.findOne({'_id': documentID}).remove().exec(function(err, result){
        callback(err, result);
    });
};

exports.Document = mongoose.model('Document', schema);