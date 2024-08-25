// index.js
const socket = new WebSocket('ws://localhost:8080');

let gameId;
let player;
let board;

socket.onmessage = (event) => {
  if (event.data.startsWith('gameId:')) {
    const parts = event.data.split(':');
    if (parts.length > 1) {
      gameId = parts[1];
    }
  }
};