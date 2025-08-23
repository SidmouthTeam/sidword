// Basic Sidword setup (simplified for demo)
const board = document.getElementById("board");
const keyboard = document.getElementById("keyboard");
const message = document.getElementById("message");

function createBoard() {
  board.innerHTML = "<p>🧠 Guess the Devon-themed word!</p>";
}

function createKeyboard() {
  const keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  keys.forEach(letter => {
    const btn = document.createElement("button");
    btn.textContent = letter;
    btn.onclick = () => handleKey(letter);
    keyboard.appendChild(btn);
  });
}

function handleKey(letter) {
  message.textContent = `You pressed: ${letter}`;
}

// WhatsApp Share Button
document.getElementById("shareBtn").addEventListener("click", function () {
  const gameURL = window.location.href;
  const messageText = `Try today's Sidword! 🧠🌊\nCan you guess the Devon-themed word?\n${gameURL}`;
  const encodedMessage = encodeURIComponent(messageText);
  const whatsappURL = `https://wa.me/?text=${encodedMessage}`;
  window.open(whatsappURL, "_blank");
});

// Initialize game
createBoard();
createKeyboard();
