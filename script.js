const board = document.getElementById("game-board");
const keyboard = document.getElementById("keyboard");

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
const keys = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
keys.forEach(row => {
  const keyRow = document.createElement("div");
  keyRow.classList.add("key-row");
  row.split("").forEach(letter => {
    const key = document.createElement("button");
    key.textContent = letter;
    key.classList.add("key");
    key.onclick = () => console.log("Pressed:", letter); // placeholder
    keyRow.appendChild(key);
  });
  keyboard.appendChild(keyRow);
});
