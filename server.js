var express = require('express');
var app = express();

var http = require('http');

app.set('port', (process.env.PORT || 5050));
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('index.html');
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
