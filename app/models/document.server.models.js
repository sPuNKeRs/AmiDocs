var crypto = require('crypto');
var async = require('async');

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

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

exports.Document = mongoose.model('Document', schema);