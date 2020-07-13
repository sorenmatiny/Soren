'use strict';

Number.prototype.format = function (n, x) {
	var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
	return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

function colectionBangGia() {
	return new Promise((resolve => {
		$.ajax({
			url: "/api/bangGia",
			type: "GET",
			success: function (data) {
				resolve(data[0]);
			},
			error: error => {
				alert(error.responseJSON.message);
			}
		})
	}))
}

function colectionDSPhongTro() {
	return new Promise(resolve => {
		$.ajax({
			url: "/api/dsPhongTro",
			type: "GET",
			success: function (data) {
				resolve(data);
			},
			error: error => {
				alert(error.responseJSON.message);
			}
		})
	})
}

async function khoiTaoDoiTuongPhongTro() {
	var bangGia = await colectionBangGia();
	var dsPhong = await colectionDSPhongTro();
	return new Promise(resolve => {
		for (var i = 0; i < dsPhong.length; i++) {

			// Số điện sử dụng
			var soDienTieuThu = Number(dsPhong[i].dienMoi) - Number(dsPhong[i].dienCu);
			if (soDienTieuThu < 0) {
				soDienTieuThu = 0;
			}
			dsPhong[i].soDienTieuThu = soDienTieuThu;

			// Số nước sử dụng
			var soNuocTieuThu = Number(dsPhong[i].nuocMoi) - Number(dsPhong[i].nuocCu);
			if (soNuocTieuThu < 0) {
				soNuocTieuThu = 0;
			}
			dsPhong[i].soNuocTieuThu = soNuocTieuThu;

			// Bảng giá
			var tienDien = bangGia.giaDien;
			var tienRac = bangGia.giaRac;
			var tienCapTV = bangGia.giaCapTV;
			var tienInternet = bangGia.giaInternet;

			var tienNuoc = dsPhong[i].tienNuoc;
			var tienPhong = dsPhong[i].tienPhong;
			var noTienPhong = dsPhong[i].noTienPhong;
			var tongTien;
			if (!dsPhong[i].rac) {
				tienRac = 0;
			}
			if (!dsPhong[i].capTV) {
				tienCapTV = 0;
			}
			if (!dsPhong[i].internet) {
				tienInternet = 0;
			}

			tongTien = (soDienTieuThu * tienDien) + (soNuocTieuThu * tienNuoc) + tienPhong + tienRac + tienCapTV + tienInternet + noTienPhong;

			if (!dsPhong[i].dienMoi || !dsPhong[i].nuocMoi || !tienPhong) {
				tongTien = 0;
			}

			dsPhong[i].tongTien = tongTien.format() + ' đ';
		}
		resolve(dsPhong);
	});
}

function initTable() {
	$("#table").bootstrapTable({
		columns: [
			[{
				title: 'Mã phòng',
				field: 'maPhong',
				rowspan: 2,
				align: 'center',
				valign: 'middle',
				sortable: true,
				cellStyle: 'cellStyleSuccess'
			}, {
				title: 'Số Counter điện',
				colspan: 2,
				align: 'center'
			}, {
				title: 'Nước',
				colspan: 2,
				align: 'center'
			}, {
				title: 'Số điện tiêu thụ',
				field: 'soDienTieuThu',
				rowspan: 2,
				align: 'center',
				valign: 'middle'
			}, {
				title: 'Số nước tiêu thụ',
				field: 'soNuocTieuThu',
				rowspan: 2,
				align: 'center',
				valign: 'middle'
			}, {
				title: 'Nợ tiền nhà',
				field: 'noTienPhong',
				rowspan: 2,
				align: 'center',
				valign: 'middle',
				cellStyle: 'cellStyleInfo'
			}, {
				title: 'Dịch vụ',
				colspan: 3,
				align: 'center',
				valign: 'middle'
			}, {
				title: 'Tổng tiền',
				field: 'tongTien',
				rowspan: 2,
				align: 'center',
				valign: 'middle',
				cellStyle: 'cellStyleWarning'
			}, {
				title: 'Công cụ',
				colspan: 3,
				align: 'center'
			}],
			[{
				field: 'dienCu',
				title: 'Điện Cũ',
				sortable: true,
				editable: true,
				align: 'center',
				cellStyle: 'cellStyleDanger'
			}, {
				field: 'dienMoi',
				title: 'Điện mới',
				sortable: true,
				align: 'center',
				cellStyle: 'cellStyleDanger'
			}, {
				field: 'nuocCu',
				title: 'Nước Cũ',
				sortable: true,
				editable: true,
				align: 'center',
				cellStyle: 'cellStylePrimary'
			}, {
				field: 'nuocMoi',
				title: 'Nước mới',
				sortable: true,
				align: 'center',
				cellStyle: 'cellStylePrimary'
			}, {
				title: 'Rác',
				field: 'rac',
				formatter: 'cbFormat',
				align: 'center',
				valign: 'middle'
			}, {
				title: 'Cáp TV',
				field: 'capTV',
				formatter: 'cbFormat',
				align: 'center',
				valign: 'middle'
			}, {
				title: 'Internet',
				field: 'internet',
				formatter: 'cbFormat',
				align: 'center',
				valign: 'middle'
			}, {
				title: 'Thanh toán',
				align: 'center',
				events: operateEvents,
				formatter: operateFormatter1
			}, {
				title: 'Chỉnh sửa',
				align: 'center',
				events: operateEvents,
				formatter: operateFormatter2
			}, {
				title: 'Xóa phòng',
				align: 'center',
				events: operateEvents,
				formatter: operateFormatter3
			}
			]
		]
	});

}

// Table event
function operateFormatter1(value, row, index) {
	return [
		'<a class="thanh-toan" href="javascript:void(0)" title="thanhToan">',
		'<i class="fa fa-shopping-cart"></i>',
		'</a>  '
	].join('');
}

function operateFormatter2(value, row, index) {
	return [
		'<a class="chinh-sua-phong" href="javascript:void(0)" title="chinhSuaPhong">',
		'<i class="fa fa-edit"></i>',
		'</a>  '
	].join('');
}

function operateFormatter3(value, row, index) {
	return [
		'<a class="xoa-phong" href="javascript:void(0)" title="xoaPhong">',
		'<i class="fa fa-remove"></i>',
		'</a>'
	].join('');
}

function cbFormat(value) {
	return '<input type="checkbox"' + (value === true ? " checked" : "") + '/>';
}

function cellStyleSuccess(value, row, index) {
	return {
		classes: 'table-success'
	};
}

function cellStylePrimary(value, row, index) {
	return {
		classes: 'table-primary'
	};
}

function cellStyleWarning(value, row, index) {
	return {
		classes: 'table-warning'
	};
}

function cellStyleInfo(value, row, index) {
	return {
		classes: 'table-info'
	};
}

function cellStyleDanger(value, row, index) {
	return {
		classes: 'table-danger'
	};
}

function parseObjectToPrintForm(obj) {
	function returnVietnameseCheck(value) {
		if (value) {
			return "có"
		}
		return "không";
	}

	$("#hiddenMaPhong").val(obj.maPhong);
	$("#hiddenDienCu").val(obj.dienCu);
	$("#hiddenDienMoi").val(obj.dienMoi);
	$("#hiddenNuocCu").val(obj.nuocCu);
	$("#hiddenNuocMoi").val(obj.nuocMoi);
	$("#hiddenSoDienTieuThu").val(obj.soDienTieuThu);
	$("#hiddenSoNuocTieuThu").val(obj.soNuocTieuThu);
	$("#hiddenNoTienPhong").val(obj.noTienPhong);
	$("#hiddenTienPhong").val(obj.tienPhong);
	$("#hiddenTienNuoc").val(obj.tienNuoc);
	$("#hiddenRac").val(returnVietnameseCheck(obj.rac));
	$("#hiddenCapTV").val(returnVietnameseCheck(obj.capTV));
	$("#hiddenInternet").val(returnVietnameseCheck(obj.internet));
	$("#hiddenTongTien").val(obj.tongTien);
}

function printInvoice(obj) {
	// get the template
	var source = $("#printTemplate").html();

	// compile template
	var template = Handlebars.compile(source);

	// apply template
	var newContent = template(obj);

	var htmlFromHBS = document.createElement('div');
	htmlFromHBS.innerHTML = newContent;

	var frame1 = $('<iframe />');
	frame1[0].name = "frame1";
	frame1.css({"position": "absolute", "top": "-1000000px"});
	$("body").append(frame1);
	var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
	frameDoc.document.open();
	//Create a new HTML document.
	frameDoc.document.write('<html><head><title>DIV Contents</title>');
	frameDoc.document.write('</head><body>');
	//Append the external CSS file.
	frameDoc.document.write('<link href=\'/stylesheets/invoice.css\' rel="stylesheet" type="text/css" />');
	//Append the DIV contents.
	frameDoc.document.write(newContent);
	frameDoc.document.write('</body></html>');
	frameDoc.document.close();
	setTimeout(function () {
		window.frames["frame1"].focus();
		window.frames["frame1"].print();
		frame1.remove();
	}, 500);
}

window.operateEvents = {
	'click .xoa-phong': function (e, value, {_id}, index) {
		var dbID = _id;

		// Call Delete model
		$("#btnYNDelete").attr("dbID", dbID);
		$("#ynModal").modal('toggle');
	},

	'click .chinh-sua-phong': function (e, value, {_id}, index) {
		var id = _id;
		var url = '/api/dsPhongTro/' + id;
		$.ajax({
			url,
			type: "GET",
			success: (data) => {
				$("#chinhPhong-maPhong").val(data.maPhong);
				$("#chinhPhong-dienCu").val(data.dienCu);
				$("#chinhPhong-dienMoi").val(data.dienMoi);
				$("#chinhPhong-nuocCu").val(data.nuocCu);
				$("#chinhPhong-nuocMoi").val(data.nuocMoi);
				$("#chinhPhong-rac").prop('checked', data.rac);
				$("#chinhPhong-capTV").prop('checked', data.capTV);
				$("#chinhPhong-internet").prop('checked', data.internet);
				$("#chinhPhong-noTienPhong").val(data.noTienPhong);
				$("#chinhPhong-tienPhong").val(data.tienPhong);
				$("#chinhPhong-tienNuoc").val(data.tienNuoc);
				$("#updateModal").modal('toggle');
				$("#btnUpdate").attr("dbID", id);
			},
			error: error => {
				alert(error.responseJSON.message);
			}
		});
	},

	'click .thanh-toan': function (e, value, arr, index) {

		parseObjectToPrintForm(arr);

		$("#thanhToan-maPhong").val(arr.maPhong);
		$("#thanhToan-tongTien").val(arr.tongTien);

		//remove ',' and parse to number
		var rawTongTien = Number(arr.tongTien.replace(/[,đ]/g, ''));
		var soTienTra = rawTongTien;
		$("#thanhToan-soTienTra").val(soTienTra);
		$("#thanhToan-ketQua").val((rawTongTien - soTienTra) + ' đ');

		$("#btnThanhToan").attr('dbID', arr._id);
		$("#btnThanhToanVaIn").attr('dbID', arr._id);
		$("#thanhToanModal").modal('toggle');
	}
};

$(async function () {
	initTable();
	var dsPhong = await khoiTaoDoiTuongPhongTro();
	$("#table").bootstrapTable('load', {data: dsPhong});
});

//Main
$(document).ready(function () {

	$("#table").on('refresh.bs.table', async function () {
		$("#table").bootstrapTable("showLoading");
		var dsPhong = await khoiTaoDoiTuongPhongTro();
		$("#table").bootstrapTable('load', {data: dsPhong});
		$("#table").bootstrapTable("hideLoading");
	});

	$(document).on('click', "#btnCreate", function () {
		$.ajax({
			url: "/api/dsPhongTro",
			type: "POST",
			data: $('#frmCreate').serialize(),
			dataType: "json",
			success: data => {
				// alert(JSON.stringify(data));
				$('#table').bootstrapTable('refresh');
				$("#createModal").modal('toggle');
			},
			error: error => {
				alert(error.responseJSON.message);
			}
		})
		$('#frmCreate').trigger("reset");
	});

	$('#thanhToan-soTienTra').keyup(function (event) {

		if (event.which >= 37 && event.which <= 40) return;

		let tongTien = $("#thanhToan-tongTien").val();
		tongTien = tongTien.replace(/[,đ]/g, '');

		let soTienTra = $(this).val();

		let ketQua = Number(tongTien) - Number(soTienTra);
		$("#thanhToan-ketQua").val(ketQua.format() + ' đ');
	});


	// Quan ly event
	$(document).on('click', '#btnCallQuanLyModal', async function () {
		let bangGia = await colectionBangGia();
		$("#quanLy-tienDien").val(bangGia.giaDien);
		$("#quanLy-tienRac").val(bangGia.giaRac);
		$("#quanLy-tienCapTV").val(bangGia.giaCapTV);
		$("#quanLy-tienInternet").val(bangGia.giaInternet);
		$("#btnQuanLy").attr('dbID', bangGia._id);
	});
	$(document).on('click', '#btnQuanLy', function () {
		var id = $(this).attr('dbID');
		$.ajax({
			url: '/api/bangGia/' + id,
			data: $("#frmQuanLy").serialize(),
			dataType: "json",
			type: "PUT",
			success: data => {
				alert(data.message);
				$("#quanLyModal").modal('toggle');
				$('#table').bootstrapTable('refresh');
			},
			error: error => {
				alert(error.responseJSON.message);
			}
		})
	});


	// Delete model event
	$(document).on('click', '#btnYNDelete', function () {
		var id = $(this).attr("dbID");

		$.ajax({
			url: '/api/dsPhongTro/' + id,
			type: "DELETE",
			success: (data) => {
				$(this).removeAttr("dbID");
				$("#ynModal").modal('hide');
				$('#table').bootstrapTable('refresh');
			},
			error: error => {
				alert(error.responseJSON.message);
			}
		})
	});

	// Update event
	$(document).on('click', '#btnUpdate', function () {

		var id = $(this).attr("dbID");

		$.ajax({
			url: '/api/dsPhongTro/' + id,
			data: $('#frmUpdate').serialize(),
			type: "PUT",
			dataType: "json",
			success: (data) => {
				$("#updateModal").modal('toggle');
				$('#table').bootstrapTable('refresh');
			},
			error: error => {
				alert(error.responseJSON.message);
			}
		})
	});

	// Thanh toán
	$(document).on('click', '#btnThanhToan', function () {
		var id = $(this).attr("dbID");

		let data = $('#thanhToan-ketQua').val();
		data = Number(data.replace(/[,đ]/g, ''));

		$.ajax({
			url: '/api/thanhToan/' + id,
			data: "ketQua=" + data,
			type: "PUT",
			dataType: "json",
			success: (data) => {
				$("#thanhToanModal").modal('toggle');
				$('#table').bootstrapTable('refresh');
			},
			error: error => {
				alert(error.responseJSON.message);
				$("#thanhToanModal").modal('toggle');
			}
		});
	});

	$(document).on('click', '#btnThanhToanVaIn', async function () {
		var id = $(this).attr("dbID");

		const rawKetQua = $('#thanhToan-ketQua').val();
		let ketQua = Number(rawKetQua.replace(/[,đ]/g, ''));
		let bangGia = await colectionBangGia();


		$.ajax({
			url: '/api/thanhToan/' + id,
			data: "ketQua=" + ketQua,
			type: "PUT",
			dataType: "json",
			success: (data) => {
				// get all field from hidden print form
				let obj = $("#theForm").serializeObject();

				// Format currency number
				obj.soTienTra = Number($("#thanhToan-soTienTra").val()).format();
				obj.conLai = ketQua.format();
				(Number(obj.noTienPhong) !== 0) ? obj.coNoTienPhong = true : obj.coNoTienPhong = false;
				obj.noTienPhong = Number(obj.noTienPhong).format();
				obj.tienPhong = Number(obj.tienPhong).format();
				obj.tienDien = (bangGia.giaDien * Number(obj.soDienTieuThu)).format();
				obj.tienNuoc = (obj.tienNuoc * Number(obj.soNuocTieuThu)).format();
				obj.tongTien = Number(obj.tongTien.replace(/[,đ]/g, '')).format();
				bangGia.giaRac = bangGia.giaRac.format();
				bangGia.giaCapTV = bangGia.giaCapTV.format();
				bangGia.giaInternet = bangGia.giaInternet.format();

				// delete useless element
				delete bangGia._id;

				// merge 2 object
				const docs = {...obj, ...bangGia};

				// add check blank field
				(docs.rac === 'có') ? docs.rac = true : docs.rac = false;
				(docs.capTV === 'có') ? docs.capTV = true : docs.capTV = false;
				(docs.internet === 'có') ? docs.internet = true : docs.internet = false;

				// Date on print
				const date = new Date();
				docs.ngayIn =  date.getDate();
				docs.thangIn = date.getMonth() + 1;
				docs.namIn = date.getFullYear();

				// time to print
				printInvoice(docs);

				$("#thanhToanModal").modal('toggle');
				$('#table').bootstrapTable('refresh');
			},
			error: error => {
				alert(error.responseJSON.message);
				$("#thanhToanModal").modal('toggle');
			}
		});
	});

});
