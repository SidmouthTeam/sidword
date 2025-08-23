const board = document.getElementById("board");
const keyboard = document.getElementById("keyboard");
const message = document.getElementById("message");
const shareBtn = document.getElementById("shareBtn");

const targetWord = "EXMOU"; // Example Devon-themed word
let guesses = [];
const maxGuesses = 6;

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
  if (guesses.length >= maxGuesses) return;

  guesses.push(letter);
  message.textContent = `You guessed: ${guesses.join("")}`;

  if (guesses.join("") === targetWord) {
    endGame(true, targetWord);
  } else if (guesses.length === maxGuesses) {
    endGame(false, targetWord);
  }
}

function endGame(success, finalWord) {
  if (success) {
    message.textContent = `🎉 You guessed it! The word was "${finalWord}".`;
  } else {
    message.textContent = `😢 Out of guesses! The word was "${finalWord}".`;
  }

  shareBtn.style.display = "inline-block";

  const gameURL = window.location.href;
  const shareText = success
    ? `I guessed today's Sidword: "${finalWord}"! 🧠🌊\nTry it yourself:\n${gameURL}`
    : `I missed today's Sidword: "${finalWord}". 😅\nCan you do better?\n${gameURL}`;

  const encoded = encodeURIComponent(shareText);
  shareBtn.onclick = () => {
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };
}

// Initialize game
createBoard();
createKeyboard();
