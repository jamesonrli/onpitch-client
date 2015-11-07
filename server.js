// Serving up the public directory
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5050));

app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

// OnPitch API
var restify = require('restify');
var server = restify.createServer();

var Profile = require('./server/controllers/profile');

server.get('/userProfile/:id', Profile.getUserProfile);
server.get('/userProjects/:id', Profile.getUserProjects);

server.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  return next();
});

var port = process.env.PORT_SERVER || 6050;
server.listen(port, function(err) {
  if(err) {
    console.log(err);
  }
  else {
    console.log('Server is ready at : ' + port);
  }
});

if(process.env.environment == 'production') {
  process.on('uncaughtException', function (err) {
    console.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)));
  });
}
