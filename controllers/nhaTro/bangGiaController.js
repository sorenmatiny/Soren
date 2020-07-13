'use strict';

const model = require('../../models/bangGiaModel');

exports.create = (req, res) => {
	var celebrities = new model({
		giaDien: req.body.giaDien || 0,
		giaRac: req.body.giaRac || 0,
		giaCapTV: req.body.giaCapTV || 0,
		giaInternet: req.body.giaInternet || 0
	});

	celebrities.save((err, docs) => {
		if (err) {
			console.log(err);
			res.status(500).send({message: "Không thể tạo được"});
		}
		else {
			res.send(docs);
		}
	})
};

exports.findAll = (req, res) => {
	model.find((err, docs) => {
		if (err) {
			console.log(err);
			res.status(500).send({message: "Lỗi trong quá trình tìm bảng giá"});
		}
		else {
			res.send(docs);
		}
	});
};

exports.findOne = (req, res) => {
	model.findById({'maPhong': req.params.id}, (err, docs) => {
		if (err) {
			console.log(err);
			if (err.kind === 'ObejectId') {
				res.status(404).send({message: "Không tìm được bảng giá với mã: " + req.params.id});
			}
			res.status(500).send({message: "Không thể tìm được  bảng giá"});
		}

		if (!docs) {
			return res.status(404).send({message: "Không tìm được bảng giá với mã: " + req.params.id});
		}

		res.send(docs);
	});
};

exports.update = (req, res) => {
	model.findById(req.params.id, (err, docs) => {
		if (err) {
			console.log(err);
			if (err.kind === 'ObejectId') {
				res.status(404).send({message: "Không tìm được bảng giá với id: " + req.params.id});
			}
			res.status(500).send({message: "Lỗi trong quá trình tìm bảng giá"});
		}

		if (!docs) {
			return res.status(404).send({message: "Không tìm được bảng giá với id: " + req.params.id + req.params.id});
		}

		docs.giaDien = req.body.giaDien || 0;
		docs.giaRac = req.body.giaRac || 0;
		docs.giaCapTV = req.body.giaCapTV || 0;
		docs.giaInternet = req.body.giaInternet || 0;

		docs.save((err, docs) => {
			(err) ? res.status(500).send({message: "Không thể cập nhật bảng giá với id: " + req.params.id}) : res.send({message: "Cập nhật bảng giá thành công!"});
		})
	});
};

exports.delete = (req, res, next) => {
	model.findByIdAndRemove(req.params.id, (err, docs) => {
		if (err) {
			console.log(err);
			if (err.kind === 'ObejectId') {
				res.status(404).send({message: "Không thể tìm được bảng giá với id: " + req.params.id});
			}
			res.status(500).send({message: "Không thể xóa được bảng giá với id: " + req.params.id});
		}

		if (!docs) {
			return res.status(404).send({message: "Không thể tìm thấy bảng giá với id: " + req.params.id});
		}

		res.send({message: "Xóa bảng giá thành công!"});
	});
};