// Serving up the public directory
var express = require('express');
var app = express();

var Profile = require('./server/controllers/profile');

app.set('port', (process.env.PORT || 5050));

/************* Serve public folder ***********/
app.use(express.static(__dirname + '/public'));
/***************** END ***********************/

/************* OnPitch API *******************/
app.get('/userProfile/:id', Profile.getUserProfile);
app.get('/userProjects/:id', Profile.getUserProjects);
/***************** END ***********************/

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  return next();
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at port:" + app.get('port'));
});

if(process.env.NODE_ENV === 'production') {
  process.on('uncaughtException', function (err) {
    console.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)));
  });
}
