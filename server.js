// server.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let games = {}; // store games
let players = {}; // store players

wss.on('connection', (ws) => {
  console.log('Client connected');

  // handle game initialization
  ws.on('message', (message) => {
    if (message === 'init') {
      const gameId = generateGameId();
      games[gameId] = { players: [], board: initializeBoard() };
      players[ws.upgradeReq.headers['sec-websocket-key']] = gameId;
      ws.send(`gameId:${gameId}`);
    }
  });

  // handle player moves
  ws.on('message', (message) => {
    const [playerId, move] = message.split(':');
    const gameId = players[ws.upgradeReq.headers['sec-websocket-key']];
    const game = games[gameId];
    const player = game.players.find((player) => player.id === playerId);
    if (player) {
      const isValidMove = validateMove(game.board, player, move);
      if (isValidMove) {
        updateBoard(game.board, player, move);
        broadcastGameState(gameId, game.board);
      } else {
        ws.send('invalidMove');
      }
    }
  });

  // handle disconnections
  ws.on('close', () => {
    console.log('Client disconnected');
    const gameId = players[ws.upgradeReq.headers['sec-websocket-key']];
    delete games[gameId];
    delete players[ws.upgradeReq.headers['sec-websocket-key']];
  });
});

function generateGameId() {
  return Math.random().toString(36).substr(2, 9);
}

function initializeBoard() {
  return [
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ];
}

function validateMove(board, player, move) {
  // implement move validation logic here
  // for now, just return true
  return true;
}

function updateBoard(board, player, move) {
  // implement board update logic here
  // for now, just update the board with the move
  board[move.x][move.y] = player.id;
}

function broadcastGameState(gameId, board) {
  wss.clients.forEach((client) => {
    if (players[client.upgradeReq.headers['sec-websocket-key']] === gameId) {
      client.send(`gameState:${board}`);
    }
  });
}