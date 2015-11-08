// Serving up the public directory
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var gulp = require('gulp');
require('./gulpfile');

var Profile = require('./server/controllers/profile');
var Comment = require('./server/controllers/comment');
var SSEComment = require('./server/sse/comment');

app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5050));

/************* Serve public folder ***********/
app.use(express.static(__dirname + '/public'));
/***************** END ***********************/

/************* OnPitch API *******************/
app.get('/userProfile/:id', Profile.getUserProfile);
app.get('/userProjects/:id', Profile.getUserProjects);
app.get('/userComments/:id', Comment.getUserComments);
/***************** END ***********************/

/***************** SSE ***********************/
app.get('/userComments/:id/update-stream', SSEComment.commentUpdate);
app.post('/userComments', SSEComment.triggerCommentUpdate);
/***************** END ***********************/

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  return next();
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at port:" + app.get('port'));
});

if(gulp.tasks.build) {
  console.log('starting gulp build...');
  gulp.start('build');
}

if(process.env.NODE_ENV === 'production') {
  process.on('uncaughtException', function (err) {
    console.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)));
  });
}
