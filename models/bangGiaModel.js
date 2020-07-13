const mongoose = require('mongoose');

const schema = mongoose.Schema({
	giaDien: Number,
	giaRac: Number,
	giaCapTV: Number,
	giaInternet: Number
}, {versionKey: false});

module.exports = mongoose.model('bangGia', schema, 'bangGia');