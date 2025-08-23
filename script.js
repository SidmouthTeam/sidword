const gameBoard = document.getElementById("game-board");
const keyboard = document.getElementById("keyboard");

let currentRow = 0;
let currentCol = 0;
const maxRows = 6;
const maxCols = 5;

const board = [];

// Create board
for (let r = 0; r < maxRows; r++) {
  const row = [];
  const rowDiv = document.createElement("div");
  rowDiv.classList.add("tile-row");

  for (let c = 0; c < maxCols; c++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    rowDiv.appendChild(tile);
    row.push(tile);
  }

  gameBoard.appendChild(rowDiv);
  board.push(row);
}

// Create keyboard
const keys = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

keys.forEach(row => {
  const keyRow = document.createElement("div");
  keyRow.classList.add("key-row");

  row.split("").forEach(letter => {
    const key = document.createElement("button");
    key.textContent = letter;
    key.classList.add("key");
    key.onclick = () => handleKey(letter);
    keyRow.appendChild(key);
  });

  keyboard.appendChild(keyRow);
});

// Add Enter and Delete
const controlRow = document.createElement("div");
controlRow.classList.add("key-row");

const enterKey = document.createElement("button");
enterKey.textContent = "ENTER";
enterKey.classList.add("key");
enterKey.onclick = submitGuess;
controlRow.appendChild(enterKey);

const deleteKey = document.createElement("button");
deleteKey.textContent = "DEL";
deleteKey.classList.add("key");
deleteKey.onclick = deleteLetter;
controlRow.appendChild(deleteKey);

keyboard.appendChild(controlRow);

// Handle key input
function handleKey(letter) {
  if (currentCol < maxCols) {
    board[currentRow][currentCol].textContent = letter;
    currentCol++;
  }
}

function deleteLetter() {
  if (currentCol > 0) {
    currentCol--;
    board[currentRow][currentCol].textContent = "";
  }
}

function submitGuess() {
  if (currentCol === maxCols) {
    const guess = board[currentRow].map(tile => tile.textContent).join("");
    console.log("Submitted guess:", guess);
    currentRow++;
    currentCol = 0;
  }
}
