'use strict';

const model = require('../models/dsPhongTroModel');

exports.create = (req, res) => {
	var celebrities = new model({
		maPhong: req.body.maPhong || "No name",
		dienCu: req.body.dienCu || "0",
		dienMoi: req.body.dienMoi || "0",
		nuocCu: req.body.nuocCu || "0",
		nuocMoi: req.body.nuocMoi || "0",
		noTienPhong: 0,
		tienPhong: req.body.tienPhong || 0,
		tienNuoc: req.body.tienNuoc || 0,
		rac: req.body.rac === 'on',
		capTV: req.body.capTV === 'on',
		internet: req.body.internet === 'on'
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

exports.findAll = async (req, res) => {
	model.find((err, docs) => {
		if (err) {
			console.log(err);
			res.status(500).send({message: "Lỗi trong quá trình tìm phòng"});
		}
		else {
			res.send(docs);
		}
	});
};

exports.findOne = (req, res) => {
	model.findById(req.params.id, (err, docs) => {
		if (err) {
			console.log(err);
			if (err.kind === 'ObejectId') {
				res.status(404).send({message: "Không tìm được phòng với mã: " + req.params.id});
			}
			res.status(500).send({message: "Không thể tìm được phòng"});
		}

		if (!docs) {
			return res.status(404).send({message: "Không tìm được phòng với mã: " + req.params.id});
		}

		res.send(docs);
	});
};

exports.update = (req, res) => {
	model.findById(req.params.id, (err, docs) => {
		if (err) {
			console.log(err);
			if (err.kind === 'ObejectId') {
				res.status(404).send({message: "Không tìm được phòng với id: " + req.params.id});
			}
			res.status(500).send({message: "Lỗi trong quá trình tìm phòng"});
		}

		if (!docs) {
			return res.status(404).send({message: "Không tìm được phòng với id: " + req.params.id + req.params.id});
		}

		docs.maPhong = req.body.maPhong || "No name";
		docs.dienCu = req.body.dienCu || "0";
		docs.dienMoi = req.body.dienMoi || "0";
		docs.nuocCu = req.body.nuocCu || "0";
		docs.nuocMoi = req.body.nuocMoi || "0";
		docs.noTienPhong = req.body.noTienPhong || 0;
		docs.tienPhong = req.body.tienPhong || 0;
		docs.tienNuoc = req.body.tienNuoc || 0;
		docs.rac = req.body.rac === 'on';
		docs.capTV = req.body.capTV === 'on';
		docs.internet = req.body.internet === 'on';

		docs.save((err, docs) => {
			(err) ? res.status(500).send({message: "Không thể cập nhật phòng với id: " + req.params.id}) : res.send(docs);
		})
	});
};

exports.delete = (req, res, next) => {
	model.findByIdAndRemove(req.params.id, (err, docs) => {
		if (err) {
			console.log(err);
			if (err.kind === 'ObejectId') {
				res.status(404).send({message: "Không thể tìm được phòng với id: " + req.params.id});
			}
			res.status(500).send({message: "Không thể xóa được phòng với id: " + req.params.id});
		}

		if (!docs) {
			return res.status(404).send({message: "Không thể tìm thấy phòng với id: " + req.params.id});
		}

		res.send({message: "Xóa phòng thành công!"});
	});
};

exports.thanhToan = (req, res) => {
	model.findById(req.params.id, (err, docs) => {
		if (err) {
			console.log(err);
			if (err.kind === 'ObejectId') {
				res.status(404).send({message: "Không tìm được phòng với id: " + req.params.id});
			}
			res.status(500).send({message: "Lỗi trong quá trình tìm phòng"});
		}

		if (!docs) {
			return res.status(404).send({message: "Không tìm được phòng với id: " + req.params.id + req.params.id});
		}
		
		if (!docs.dienMoi || !docs.nuocMoi)
		{
			res.status(400).send({message: "Kiểm tra lại số điện hoặc số nước mới"});
		}
		else {
			docs.dienCu = docs.dienMoi;
			docs.dienMoi = 0;
			docs.nuocCu = docs.nuocMoi;
			docs.nuocMoi = 0;
			docs.noTienPhong = req.body.ketQua;

			docs.save((err, docs) => {
				(err) ? res.status(500).send({message: "Không thể cập nhật phòng với id: " + req.params.id}) : res.send(docs);
			})
		}
	});
};

exports.home = (req, res, next) => {
	model.find((err, docs) => {
		if (err) return next(err);
		res.render('index', {title: 'Quản lý nhà trọ', docs});
	});
};