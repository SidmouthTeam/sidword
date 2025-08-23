let validWords = [];
let currentRow = 0;
let currentTile = 0;
let currentGuess = "";
const board = document.getElementById("game-board");
const keyboard = document.getElementById("keyboard");
const fact = document.getElementById("fact");

// Load word list
fetch('words.json')
  .then(response => response.json())
  .then(data => {
    validWords = data.validWords;
  })
  .catch(error => {
    console.error("Failed to load word list:", error);
  });

// Create grid
for (let i = 0; i < 6; i++) {
  const row = document.createElement("div");
  row.classList.add("tile-row");
  for (let j = 0; j < 5; j++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    row.appendChild(tile);
  }
  board.appendChild(row);
}

// Create keyboard
const keys = [
  "QWERTYUIOP",
  "ASDFGHJKL",
  "ZXCVBNM"
];

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

// Handle key press
function handleKey(letter) {
  if (currentTile < 5) {
    const row = board.children[currentRow];
    const tile = row.children[currentTile];
    tile.textContent = letter;
    currentGuess += letter;
    currentTile++;
  }
}

// Submit guess
document.addEventListener("keydown", e => {
  if (e.key === "Enter") submitGuess();
  if (e.key === "Backspace") deleteLetter();
  if (/^[a-zA-Z]$/.test(e.key)) handleKey(e.key.toUpperCase());
});

function deleteLetter() {
  if (currentTile > 0) {
    currentTile--;
    const row = board.children[currentRow];
    const tile = row.children[currentTile];
    tile.textContent = "";
    currentGuess = currentGuess.slice(0, -1);
  }
}

function submitGuess() {
  if (currentGuess.length !== 5) {
    fact.textContent = "❌ Enter a full 5-letter word.";
    return;
  }

  if (!validWords.includes(currentGuess.toLowerCase())) {
    fact.textContent = `❌ "${currentGuess}" isn’t valid. Try again.`;
    return;
  }

  fact.textContent = `✅ "${currentGuess}" is valid!`;
  currentRow++;
  currentTile = 0;
  currentGuess = "";
}
