<!DOCTYPE html>
<html>

<!-- Mirrored from quan-ly-nha-tro.herokuapp.com/ by HTTrack Website Copier/3.x [XR&CO'2014], Mon, 13 Jul 2020 11:07:57 GMT -->
<!-- Added by HTTrack --><meta http-equiv="content-type" content="text/html;charset=utf-8" /><!-- /Added by HTTrack -->
<head>
	<title>Quản lý nhà trọ</title>
	<link rel="stylesheet" type="text/css"
		  href="../cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="../maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
	<link rel="stylesheet" href="../cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.12.1/bootstrap-table.min.css">
	<link rel='stylesheet' href='stylesheets/style.css'/>
</head>
<body>

<header>
	<nav class="navbar navbar-dark bg-dark box-shadow fixed-top">
		<div class="container d-flex justify-content-between">
			<a href="#" class="navbar-brand d-flex align-items-center">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
				<strong>Quản lý nhà trọ</strong>
			</a>
		</div>
	</nav>
</header>
<main role="main">
	<section class="jumbotron text-center">
		<div class="container">
			<h1 class="jumbotron-heading">Quản lý phòng trọ</h1>
			<p class="lead text-muted">Đây là website quản lý nhà trọ được xây dựng bằng: NodeJS, ExpressJS, MongoDB,
				jQuery (+ Ajax), Bootstrap 4.</p>
			<p>
				<button type="button" class="btn btn-primary my-2" data-toggle="modal" data-target="#createModal">
					Tạo phòng mới
				</button>

				<button type="button" class="btn btn-primary my-2" data-toggle="modal" id="btnCallQuanLyModal"
						data-target="#quanLyModal">
					Quản lý giá
				</button>
			</p>
		</div>
	</section>

	<form id="theForm" method="post" action="https://quan-ly-nha-tro.herokuapp.com/inHoaDon" target="theWindow">
		<input type="hidden" id="hiddenMaPhong" name="maPhong"/>
		<input type="hidden" id="hiddenDienCu" name="dienCu"/>
		<input type="hidden" id="hiddenDienMoi" name="dienMoi"/>
		<input type="hidden" id="hiddenNuocCu" name="nuocCu"/>
		<input type="hidden" id="hiddenNuocMoi" name="nuocMoi"/>
		<input type="hidden" id="hiddenSoDienTieuThu" name="soDienTieuThu"/>
		<input type="hidden" id="hiddenSoNuocTieuThu" name="soNuocTieuThu"/>
		<input type="hidden" id="hiddenNoTienPhong" name="noTienPhong"/>
		<input type="hidden" id="hiddenTienPhong" name="tienPhong"/>
		<input type="hidden" id="hiddenTienNuoc" name="tienNuoc"/>
		<input type="hidden" id="hiddenRac" name="rac"/>
		<input type="hidden" id="hiddenCapTV" name="capTV"/>
		<input type="hidden" id="hiddenInternet" name="internet"/>
		<input type="hidden" id="hiddenTongTien" name="tongTien"/>
	</form>

	<!--Quản lý giá-->
	<div class="modal fade" id="quanLyModal" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modalTitle"><b>Quản lý giá</b></h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<form id="frmQuanLy">
						<div class="form-group">
							<label for="quanLy-tienDien"><b>Tiền điện</b></label>
							<input type="number" class="form-control" id="quanLy-tienDien" rows="1"
								   name="giaDien"/>
						</div>
						<div class="form-group">
							<label for="quanLy-tienRac"><b>Tiền rác</b></label>
							<input type="number" class="form-control" id="quanLy-tienRac" rows="1"
								   name="giaRac"/>
						</div>
						<div class="form-group">
							<label for="quanLy-tienCapTV"><b>Tiền cáp TV</b></label>
							<input type="number" class="form-control" id="quanLy-tienCapTV" rows="1"
								   name="giaCapTV"/>
						</div>
						<div class="form-group">
							<label for="quanLy-tienInternet"><b>Tiền Internet</b></label>
							<input type="number" class="form-control" id="quanLy-tienInternet" rows="1"
								   name="giaInternet"/>
						</div>
					</form>

				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
					<button type="button" class="btn btn-success" id="btnQuanLy" form="frmQuanLy">Cập nhật</button>
				</div>
			</div>
		</div>
	</div>


	<!--Create Modal-->
	<div class="modal fade" id="createModal" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modalTitle"><b>Thêm phòng trọ</b></h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<form id="frmCreate">
						<div class="form-group">
							<label for="taoPhong-maPhong"><b>Mã phòng</b></label>
							<input class="form-control" id="taoPhong-maPhong" rows="1" name="maPhong"/>
						</div>
						<div class="form-group">
							<label for="taoPhong-dienCu"><b>Điện cũ</b></label>
							<input type="number" class="form-control" id="taoPhong-dienCu" rows="1"
								   name="dienCu"/>
						</div>
						<div class="form-group">
							<label for="taoPhong-dienMoi"><b>Điện mới</b></label>
							<input type="number" class="form-control" id="taoPhong-dienMoi" rows="1"
								   name="dienMoi"/>
						</div>
						<div class="form-group">
							<label for="taoPhong-nuocCu"><b>Nước cũ</b></label>
							<input type="number" class="form-control" id="taoPhong-nuocCu" rows="1"
								   name="nuocCu"/>
						</div>
						<div class="form-group">
							<label for="taoPhong-nuocMoi"><b>Nước mới</b></label>
							<input type="number" class="form-control" id="taoPhong-nuocMoi" rows="1"
								   name="nuocMoi"/>
						</div>
						<div class="form-group">
							<label for="taoPhong-tienPhong"><b>Tiền phòng</b></label>
							<input class="form-control" id="taoPhong-tienPhong" rows="1" name="tienPhong"/>
						</div>
						<div class="form-group">
							<label for="taoPhong-tienNuoc"><b>Tiền nước</b></label>
							<input type="number" class="form-control" id="taoPhong-tienNuoc" rows="1"
								   name="tienNuoc"/>
						</div>
						<b>Dịch vụ</b>
						<div class="custom-control custom-checkbox">
							<input type="checkbox" class="custom-control-input" id="taoPhong-rac" name="rac">
							<label class="custom-control-label" for="taoPhong-rac">Rác</label>
						</div>
						<div class="custom-control custom-checkbox">
							<input type="checkbox" class="custom-control-input" id="taoPhong-capTV" name="capTV"/>
							<label class="custom-control-label" for="taoPhong-capTV">Cáp TV</label>
						</div>
						<div class="custom-control custom-checkbox">
							<input type="checkbox" class="custom-control-input" id="taoPhong-internet" name="internet"/>
							<label class="custom-control-label" for="taoPhong-internet">Internet</label>
						</div>
					</form>

				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
					<button type="button" class="btn btn-success" id="btnCreate" form="frmCreate">Thêm</button>
				</div>
			</div>
		</div>
	</div>


	<!--Yes-No Modal-->
	<div class="modal fade" id="ynModal" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLongTitle">Xóa</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					Bạn có thực sự muốn xóa ?
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-success" data-dismiss="modal">Đóng</button>
					<button type="button" class="btn btn-danger" id="btnYNDelete">Xóa</button>
				</div>
			</div>
		</div>
	</div>


	<!--Update Modal-->
	<div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modalTitle">Chỉnh sửa phòng</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">

					<form id="frmUpdate">
						<div class="form-group">
							<label for="chinhPhong-maPhong"><b>Mã phòng</b></label>
							<input class="form-control" id="chinhPhong-maPhong" rows="1" name="maPhong"/>
						</div>
						<div class="form-group">
							<label for="chinhPhong-dienCu"><b>Điện cũ</b></label>
							<input type="number" class="form-control" id="chinhPhong-dienCu" rows="1"
								   name="dienCu"/>
						</div>
						<div class="form-group">
							<label for="chinhPhong-dienMoi"><b>Điện mới</b></label>
							<input type="number" class="form-control" id="chinhPhong-dienMoi" rows="1"
								   name="dienMoi"/>
						</div>
						<div class="form-group">
							<label for="chinhPhong-nuocCu"><b>Nước cũ</b></label>
							<input type="number" class="form-control" id="chinhPhong-nuocCu" rows="1"
								   name="nuocCu"/>
						</div>
						<div class="form-group">
							<label for="chinhPhong-nuocMoi"><b>Nước mới</b></label>
							<input type="number" class="form-control" id="chinhPhong-nuocMoi" rows="1"
								   name="nuocMoi"/>
						</div>
						<div class="form-group">
							<label for="chinhPhong-noTienPhong"><b>Nợ tiền nhà</b></label>
							<input type="number" class="form-control" id="chinhPhong-noTienPhong" rows="1"
								   name="noTienPhong"/>
						</div>
						<div class="form-group">
							<label for="chinhPhong-tienPhong"><b>Tiền phòng</b></label>
							<input type="number" class="form-control" id="chinhPhong-tienPhong" rows="1"
								   name="tienPhong"/>
						</div>
						<div class="form-group">
							<label for="chinhPhong-tienNuoc"><b>Tiền nước</b></label>
							<input type="number" class="form-control" id="chinhPhong-tienNuoc" rows="1"
								   name="tienNuoc"/>
						</div>
						<b>Dịch vụ</b>
						<div class="custom-control custom-checkbox">
							<input type="checkbox" class="custom-control-input" id="chinhPhong-rac" name="rac">
							<label class="custom-control-label" for="chinhPhong-rac">Rác</label>
						</div>
						<div class="custom-control custom-checkbox">
							<input type="checkbox" class="custom-control-input" id="chinhPhong-capTV" name="capTV"/>
							<label class="custom-control-label" for="chinhPhong-capTV">Cáp TV</label>
						</div>
						<div class="custom-control custom-checkbox">
							<input type="checkbox" class="custom-control-input" id="chinhPhong-internet"
								   name="internet"/>
							<label class="custom-control-label" for="chinhPhong-internet">Internet</label>
						</div>
					</form>

				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
					<button type="button" class="btn btn-success" id="btnUpdate" form="frmUpdate">Lưu</button>
				</div>
			</div>
		</div>
	</div>

	<!--Thanh toán model-->
	<div class="modal fade" id="thanhToanModal" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modalTitle"><b>Thanh toán tiền phòng</b></h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<form id="frmThanhToan">
						<div class="form-group">
							<label for="thanhToan-maPhong"><b>Mã phòng</b></label>
							<input class="form-control" id="thanhToan-maPhong" rows="1" disabled/>
						</div>
						<div class="form-group">
							<label for="thanhToan-tongTien"><b>Tổng tiền</b></label>
							<input class="form-control" id="thanhToan-tongTien" rows="1" disabled/>
						</div>
						<div class="form-group">
							<label for="thanhToan-soTienTra"><b>Số tiền trả</b></label>
							<input type="number" class="form-control" id="thanhToan-soTienTra" rows="1"/>
						</div>
						<div class="form-group">
							<label for="thanhToan-ketQua"><b>Kết quả</b></label>
							<input class="form-control" id="thanhToan-ketQua" rows="1" name="ketQua"/>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
					<button type="button" class="btn btn-success" id="btnThanhToan" form="frmThanhToan">Thanh toán
					</button>
					<button type="button" class="btn btn-primary" id="btnThanhToanVaIn" form="frmThanhToan">Thanh toán
						và In
					</button>
				</div>
			</div>
		</div>
	</div>

	<!--Table-->
	<table id="table"
		   data-show-export="true"
		   data-search="true"
		   data-show-refresh="true"
		   data-classes="table table-hover thead-dark"></table>
</m

					<tr class="service">
						<td class="tableitem">
							<p class="itemtext">Điện</p>
						</td>
						<td class="tableitem">
							<p class="itemtext">{{soDienTieuThu}}</p>
						</td>
						<td class="tableitem">
							<p class="itemtext">{{tienDien}}</p>
						</td>
					</tr>

					<tr class="service">
						<td class="tableitem">
