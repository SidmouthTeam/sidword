    const wordList = ["sidmo", "devon", "cream", "beach", "rocks"];
const devonFactsByWord = {
  sidmo: "Sidmouth’s red cliffs are made of Triassic sandstone—over 250 million years old.",
  devon: "Devon is the only county in England with two separate coastlines.",
  cream: "Devon cream tea is traditionally served with clotted cream first, then jam—never the other way round!",
  beach: "Exmouth marks the start of the Jurassic Coast, a UNESCO World Heritage Site.",
  rocks: "Beer Stone from Devon was used to build St. Paul’s Cathedral and the Tower of London."
};

const today = new Date();
const todayStr = today.toDateString();
const index = today.getDate() % wordList.length;
const targetWord = wordList[index];

let currentGuess = "";
let guesses = [];
const keyStates = {};

function createBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";
  for (let i = 0; i < 5 * 6; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    board.appendChild(tile);
  }
}

function createKeyboard() {
  const keys = "abcdefghijklmnopqrstuvwxyz";
  const keyboard = document.getElementById("keyboard");
  keyboard.innerHTML = "";
  keys.split("").forEach(letter => {
    const key = document.createElement("div");
    key.className = "key";
    key.textContent = letter;
    key.onclick = () => handleKey(letter);
    keyboard.appendChild(key);
  });

  const enter = document.createElement("div");
  enter.className = "key";
  enter.textContent = "Enter";
  enter.onclick = handleEnter;
  keyboard.appendChild(enter);

  const del = document.createElement("div");
  del.className = "key";
  del.textContent = "Del";
  del.onclick = handleDelete;
  keyboard.appendChild(del);
}

function handleKey(letter) {
  if (currentGuess.length < 5) {
    currentGuess += letter;
    updateBoard();
  }
}

function handleDelete() {
  currentGuess = currentGuess.slice(0, -1);
  updateBoard();
}

function handleEnter() {
  if (currentGuess.length !== 5) return;
  guesses.push(currentGuess);
  checkGuess(currentGuess);
  currentGuess = "";
  updateBoard();
}

function updateBoard() {
  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile, i) => {
    const guessIndex = Math.floor(i / 5);
    const letterIndex = i % 5;
    const guess = guesses[guessIndex];
    tile.textContent = guess ? guess[letterIndex] || "" : (guessIndex === guesses.length ? currentGuess[letterIndex] || "" : "");
    tile.className = "tile";
    if (guess && guess.length === 5) {
      const letter = guess[letterIndex];
      if (letter === targetWord[letterIndex]) {
        tile.classList.add("correct");
      } else if (targetWord.includes(letter)) {
        tile.classList.add("present");
      } else {
        tile.classList.add("absent");
      }
    }
  });
}

function checkGuess(guess) {
  const message = document.getElementById("message");

  for (let i = 0; i < 5; i++) {
    const letter = guess[i];
    let status = "absent";
    if (letter === targetWord[i]) {
      status = "correct";
    } else if (targetWord.includes(letter)) {
      status = "present";
    }

    const prev = keyStates[letter];
    if (prev !== "correct") {
      if (prev !== "present" || status === "correct") {
        keyStates[letter] = status;
      }
    }
  }

  updateKeyboard();

  if (guess === targetWord) {
    message.textContent = "Brilliant! You got it.";
    updateStatsOnWin();
    showSplashScreen();
  } else if (guesses.length >= 6) {
    message.textContent = `Out of tries! The word was "${targetWord}".`;
  } else {
    message.textContent = "";
  }
}

function updateKeyboard() {
  const keys = document.querySelectorAll(".key");
  keys.forEach(key => {
    const letter = key.textContent.toLowerCase();
    const state = keyStates[letter];
    key.classList.remove("correct", "present", "absent");
    if (state) {
      key.classList.add(state);
    }
  });
}

function showSplashScreen() {
  const splash = document.createElement("div");
  splash.id = "splash";
  splash.innerHTML = `
    <div class="splash-content">
      <h2>🌊 Proper Job!</h2>
      <p>${getLinkedDevonFact()}</p>
      <p>${getStatsMessage()}</p>
      <button onclick="closeSplash()">Close</button>
    </div>
  `;
  document.body.appendChild(splash);
}

function getLinkedDevonFact() {
  return devonFactsByWord[targetWord] || "Devon’s coastlines are full of surprises—just like Sidword!";
}

function closeSplash() {
  const splash = document.getElementById("splash");
  if (splash) splash.remove();
}

function getStatsMessage() {
  const stats = getStats();
  return `Games Played: ${stats.gamesPlayed} | Wins: ${stats.gamesWon} | Streak: ${stats.currentStreak} | Max Streak: ${stats.maxStreak}`;
}

function getStats() {
  let stats = JSON.parse(localStorage.getItem("sidwordStats")) || {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    lastPlayedDate: ""
  };

  if (stats.lastPlayedDate !== todayStr) {
    stats.gamesPlayed += 1;
    stats.lastPlayedDate = todayStr;
    localStorage.setItem("sidwordStats", JSON.stringify(stats));
  }

  return stats;
}

function updateStatsOnWin() {
  const stats = getStats();
  stats.gamesWon += 1;
  stats.currentStreak += 1;
  if (stats.currentStreak > stats.maxStreak) {
    stats.maxStreak = stats.currentStreak;
  }
  localStorage.setItem("sidwordStats", JSON.stringify(stats));
}

// Initialize game
createBoard();
createKeyboard();
