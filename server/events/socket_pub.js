var ServerConstants = require('../common/constants');

module.exports = function(io) {
  this.io = io;

  return {
    triggerCommentUpdate: function(req, res) {
      var obj = req.body.object;
      console.log('comment update triggered: ' + ServerConstants.COMMENT_UPDATE_EVENT + '-' + obj.userId.objectId);

      io.sockets.in(ServerConstants.COMMENT_UPDATE_EVENT + '-' + obj.userId.objectId).
        emit(ServerConstants.COMMENT_UPDATE_EVENT, {userId: obj.userId.objectId});

      res.end();
    },
  };
};
