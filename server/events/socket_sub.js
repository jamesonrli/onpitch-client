
module.exports = function(socket) {
  console.log("client connected");

  socket.on('join', function(data) {
    console.log('client joined: ' + data.event);
    socket.join(data.event);
  });
};
