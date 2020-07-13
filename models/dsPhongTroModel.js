const mongoose = require('mongoose');

const schema = mongoose.Schema({
	thang: Number,
	maPhong: String,
	dienCu: Number,
	dienMoi: Number,
	nuocCu: Number,
	nuocMoi: Number,
	noTienPhong: Number,
	tienPhong: Number,
	tienNuoc: Number,
	rac: Boolean,
	capTV: Boolean,
	internet: Boolean
}, {versionKey: false});

module.exports = mongoose.model('dsPhongTro', schema, 'dsPhongTro');