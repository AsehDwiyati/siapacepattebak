const socket = io();
const log = document.getElementById('log');

function logMessage(message) {
  const div = document.createElement('div');
  div.textContent = message;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

function setWord() {
  const word = document.getElementById('secretWord').value;
  socket.emit('set-word', word);
  logMessage("✅ Kata rahasia disetel.");
}

function sendGuess() {
  const guess = document.getElementById('guessInput').value;
  socket.emit('guess', guess);
}

socket.on('info', msg => logMessage("ℹ️ " + msg));
socket.on('guess-result', data => logMessage(`❌ ${data.id} menebak: ${data.guess}`));
socket.on('correct', data => logMessage(`🏆 ${data.id} menebak dengan benar: ${data.word}`));