Getting Started:

Clone this repository
Navigate to the project directory
Install dependencies: npm install
Start the server: node server/server.js
Open a web browser and navigate to http://localhost:8080

Gameplay:
Open two or more browser tabs to play with multiple players.
Each player will receive a unique game ID.
Players can make moves by clicking on the game board.
The game state will be updated in real-time across all connected players.

Files:
server/server.js: Server-side logic for handling WebSocket connections and game state.
client/index.html: Client-side HTML and JavaScript code for rendering the game board and handling user input.
client/index.js: Client-side JavaScript code for establishing a WebSocket connection and handling game state updates.
