
var io;

module.exports.init = function (http) {
    io = require('socket.io')(http);
    io.on('connection', function(socket){
        console.log('User connected');
    });
}

module.exports.notifyClient = function(noteId) {
    io.emit('NoteList', noteId);
}