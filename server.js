// Serving up the public directory
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var gulp = require('gulp');
require('./gulpfile');

app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5050));

var Profile = require('./server/controllers/profile');
var Comment = require('./server/controllers/comment');
var User = require('./server/controllers/user');

/************* Serve public folder ***********/
app.use(express.static(__dirname + '/public'));
/***************** END ***********************/

/************* OnPitch API *******************/
app.put('/user/:id', User.updateUser);
app.get('/user', User.queryUsers);
app.get('/userProfile/:id', Profile.getUserProfile);
app.put('/userProfile/:id', Profile.updateUserProfile);
app.get('/userProjects/:id', Profile.getUserProjects);
app.get('/userComments/:id', Comment.getUserComments);
app.post('/userComments', Comment.newComment);
app.get('/userProfileScore/:scoreId', Profile.getUserProfileScore);
/***************** END ***********************/

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  return next();
});

var server = app.listen(app.get('port'), function() {
  console.log("Node app is running at port:" + app.get('port'));
});

var io = require('socket.io')(server);

/***************** Socket ***********************/
var Socket = require('./server/events/socket_sub');
io.on('connection', Socket);
var SocketPub = require('./server/events/socket_pub')(io);
/***************** END ***********************/

/************** Webhooks *********************/
app.post('/wh/userComments', SocketPub.triggerCommentUpdate);
app.post('/wh/userCreated', User.newUserProfile);
/***************** END ***********************/

if(gulp.tasks.build) {
  console.log('starting gulp build...');
  gulp.start('build');
}

if(process.env.NODE_ENV === 'production') {
  process.on('uncaughtException', function (err) {
    console.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)));
  });
}
