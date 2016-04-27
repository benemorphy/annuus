var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var useraddress;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var server = app.listen(3000, function () {

 var host = server.address().address;
  var port = server.address().port;
  //useraddress=host+port;
 console.log('Example app listening at http://%s:%s', host, port);

});

var io=require('socket.io')(server);  //use io.socket for ws connect;
//
var count = 0;

io.on('connection', function (socket) {
  //socket.emit('news', { hello: 'world' });
  
  count++;
  socket.emit('usernum',{number:count});
  // console.log('inline from:'+server.address().address);  socket.address?
  // console.log (socket.address());
  console.log ('inline:'+count.toString());
  socket.broadcast.emit('usernum',{number:count});
  
  socket.on('message', function (data) {
   // socket.emit('push message', data);
    socket.broadcast.emit('push message', data);
  });
  
  
  socket.on('m_pos', function (data) {
	
      socket.broadcast.emit('m_pos_push', data);
  });
  socket.on('sound_rec', function (data) {
	  //console.log (data.text);
     socket.broadcast.emit('sound_rec_push', data);	 
     //socket.broadcast.emit('sound_rec_push',data);
	  console.log("sound out ");
  });
    socket.on('imageuri', function (data) {
	  //console.log (data.text);
   //  socket.emit('imageuri_push', data);
	 console.log('some img come');
      socket.broadcast.emit('imageuri_push', data);
	   console.log('some img go');
  });
  socket.on('imageuri_mark', function (data) {
	  //console.log (data.obj);
   //  socket.emit('imageuri_push', data);
	 console.log('some mark img come');
	 // socket.emit('imageuri_mark_push', data);
      socket.broadcast.emit('imageuri_mark_push', data);
	   console.log('some mark img go');
  });
  socket.on('imageuri_newnote', function (data) {
	
      socket.broadcast.emit('imageuri_newnote_push', data);
	
  });
  //  监听断开连接,count减1,然后将总连接数发送给其他全部客户端
  socket.on('disconnect',function(){
    count--;
    socket.broadcast.emit('usernum',{number:count});
  });
});



// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
app.get("/annuus.manifest", function(req, res){
  res.header("Content-Type", "text/cache-manifest");
  res.end("CACHE MANIFEST");
});
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
