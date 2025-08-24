const gameBoard = document.getElementById("game-board");
const keyboard = document.getElementById("keyboard");
const factBox = document.getElementById("fact");

const targetWord = "CRISP"; // Replace with dynamic word logic later
const devonFacts = {
  "CRISP": "Sidmouth’s sea air is famously crisp and refreshing — perfect for a coastal walk.",
  // Add more word-fact pairs here
};

let currentRow = 0;
let currentCol = 0;
const maxRows = 6;
const maxCols = 5;
const board = [];

const keyMap = {};

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
    keyMap[letter] = key;
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

function handleKey(letter) {
  if (currentCol < maxCols && currentRow < maxRows) {
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
  if (currentCol !== maxCols) return;

  const guess = board[currentRow].map(tile => tile.textContent).join("");
  const targetArray = targetWord.split("");
  const guessArray = guess.split("");

  // First pass: correct letters
  guessArray.forEach((letter, i) => {
    const tile = board[currentRow][i];
    if (letter === targetArray[i]) {
      tile.classList.add("correct");
      keyMap[letter]?.classList.add("correct");
      targetArray[i] = null;
      guessArray[i] = null;
    }
  });

  // Second pass: present and absent
  guessArray.forEach((letter, i) => {
    if (!letter) return;
    const tile = board[currentRow][i];
    const index = targetArray.indexOf(letter);
    if (index !== -1) {
      tile.classList.add("present");
      keyMap[letter]?.classList.add("present");
      targetArray[index] = null;
    } else {
      tile.classList.add("absent");
      keyMap[letter]?.classList.add("absent");
    }
  });

  // Show Devon fact
  factBox.textContent = devonFacts[guess] || "";

  currentRow++;
  currentCol = 0;
}
