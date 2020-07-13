var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var nhaTro = require('./routes/nhaTro');
var nhaTro_bangGia = require('./routes/nhaTro/bangGia');
var nhaTro_thanhToan = require('./routes/nhaTro/thanhToan');

var app = express();

// Mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// var url = 'mongodb://localhost:27017/qlnhatro';
var url = 'mongodb://admin:admin@ds137019.mlab.com:37019/quan-ly-nha-tro';

mongoose.connect(url).then(() => {
	console.log('connection success');
}).catch(error => {
	console.log('Connect fail: ', error.stack);
	process.exit(1);
});

// MomentJS
var moment = require('moment');
require('moment/locale/vi');
var now = moment().format('LL');
var after = moment().add(30, 'day').format('LL');
var x = moment("01/02/2018", "DD/MM/YYYY").add(30, 'day').format('LL');
var check = false;
if (now === after)
{
	check = true;
}
console.log(now);

// Handlebars
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('raw-helper', (options) => {
	return options.fn();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/dsPhongTro', nhaTro);
app.use('/api/bangGia', nhaTro_bangGia);
app.use('/api/thanhToan', nhaTro_thanhToan);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
