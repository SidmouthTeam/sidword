const validWords = wordData.validWords;
const targetWord = getDailyWord(validWords);
let currentGuess = "";

function getDailyWord(wordList) {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const index = seed % wordList.length;
  return wordList[index];
}

function renderKeyboard() {
  const keyboardLayout = [
    ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
    ["J", "K", "L", "M", "N", "O", "P", "Q", "R"],
    ["S", "T", "U", "V", "W", "X", "Y", "Z"]
  ];

  const keyboardContainer = document.getElementById("keyboard");
  keyboardContainer.innerHTML = "";

  keyboardLayout.forEach(row => {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("keyboard-row");

    row.forEach(letter => {
      const key = document.createElement("button");
      key.textContent = letter;
      key.classList.add("key");
      key.setAttribute("data-key", letter);
      key.addEventListener("click", handleKeyClick);
      rowDiv.appendChild(key);
    });

    keyboardContainer.appendChild(rowDiv);
  });

  // Add Enter and Backspace
  ["Enter", "←"].forEach(label => {
    const key = document.createElement("button");
    key.textContent = label;
    key.classList.add("key", "special-key");
    key.setAttribute("data-key", label);
    key.addEventListener("click", handleKeyClick);
    keyboardContainer.appendChild(key);
  });
}

function handleKeyClick(e) {
  const key = e.target.getAttribute("data-key");

  if (key === "←") {
    currentGuess = currentGuess.slice(0, -1);
  } else if (key === "Enter") {
    submitGuess();
  } else if (currentGuess.length < 5) {
    currentGuess += key.toLowerCase();
  }

  updateBoard();
}

function updateBoard() {
  const board = document.getElementById("game-board");
  board.textContent = currentGuess;
}

function submitGuess() {
  if (currentGuess.length !== 5) return;

  if (!validWords.includes(currentGuess)) {
    alert("Not a valid Devon word!");
    return;
  }

  if (currentGuess === targetWord) {
    document.getElementById("fact-box").textContent = devonFacts[targetWord] || "You got it!";
  } else {
    alert("Try again!");
  }

  currentGuess = "";
  updateBoard();
}

const devonFacts = {
  "otter": "The River Otter is home to wild beavers.",
  "cream": "Devon cream tea: jam first, cream second.",
  "sheep": "Dartmoor sheep roam freely across the moor.",
  "cider": "Devon cider is traditionally made from local apples.",
  "combe": "A combe is a deep valley — common in Devon place names."
};

renderKeyboard();
updateBoard();
