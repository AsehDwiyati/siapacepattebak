const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

let word = '';
let leader = null;

io.on('connection', socket => {
  console.log('User connected:', socket.id);

  socket.on('set-word', data => {
    word = data;
    leader = socket.id;
    io.emit('info', `Kata rahasia telah disetel oleh ${socket.id}`);
  });

  socket.on('guess', guess => {
    if (guess.toLowerCase() === word.toLowerCase()) {
      io.emit('correct', { id: socket.id, word });
      word = '';
    } else {
      io.emit('guess-result', { id: socket.id, guess });
    }
  });

  socket.on('disconnect', () => {
    if (socket.id === leader) {
      word = '';
      io.emit('info', 'Pemilik kata meninggalkan permainan.');
    }
    console.log('User disconnected:', socket.id);
  });
});

http.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});