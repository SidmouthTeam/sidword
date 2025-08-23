document.addEventListener("DOMContentLoaded", () => {
  const wordList = [
    { word: "combe", fact: "A combe is a deep valley, often found in Devon." },
    { word: "otter", fact: "The River Otter flows through East Devon and into the sea at Budleigh Salterton." },
    { word: "cream", fact: "Devon is famous for its clotted cream — always cream first, then jam!" },
    { word: "beach", fact: "Sidmouth’s red cliffs and pebble beach are part of the Jurassic Coast." },
    { word: "pubby", fact: "‘Pubby’ is a local slang for someone who’s always down the pub." }
  ];

  const todayIndex = new Date().getDate() % wordList.length;
  const todayWord = wordList[todayIndex].word.toUpperCase();
  const todayFact = wordList[todayIndex].fact;

  const board = document.getElementById("board");
  const keyboard = document.getElementById("keyboard");
  const fact = document.getElementById("fact");
  const shareButton = document.getElementById("share-button");

  let currentGuess = "";
  let currentRow = 0;

  function createBoard() {
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 5; col++) {
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.id = `tile-${row}-${col}`;
        board.appendChild(tile);
      }
    }
  }

  function createKeyboard() {
    const keys = "QWERTYUIOPASDFGHJKLZXCVBNM";
    keys.split("").forEach(letter => {
      const key = document.createElement("button");
      key.className = "key";
      key.textContent = letter;
      key.onclick = () => handleKey(letter);
      keyboard.appendChild(key);
    });

    const enterKey = document.createElement("button");
    enterKey.className = "key";
    enterKey.textContent = "ENTER";
    enterKey.onclick = submitGuess;
    keyboard.appendChild(enterKey);

    const deleteKey = document.createElement("button");
    deleteKey.className = "key";
    deleteKey.textContent = "DEL";
    deleteKey.onclick = deleteLetter;
    keyboard.appendChild(deleteKey);
  }

  function handleKey(letter) {
    if (currentGuess.length < 5) {
      currentGuess += letter;
      updateBoard();
    }
  }

  function deleteLetter() {
    currentGuess = currentGuess.slice(0, -1);
    updateBoard();
  }

  function updateBoard() {
    for (let i = 0; i < 5; i++) {
      const tile = document.getElementById(`tile-${currentRow}-${i}`);
      tile.textContent = currentGuess[i] || "";
    }
  }

  function submitGuess() {
    if (currentGuess.length !== 5) return;

    for (let i = 0; i < 5; i++) {
      const tile = document.getElementById(`tile-${currentRow}-${i}`);
      const letter = currentGuess[i];
      tile.textContent = letter;

      let status;
      if (letter === todayWord[i]) {
        status = "correct";
      } else if (todayWord.includes(letter)) {
        status = "present";
      } else {
        status = "absent";
      }

      tile.classList.add(status);

      const keyButton = [...keyboard.children].find(btn => btn.textContent === letter);
      if (keyButton) {
        const currentStatus = keyButton.classList.contains("correct")
          ? "correct"
          : keyButton.classList.contains("present")
          ? "present"
          : keyButton.classList.contains("absent")
          ? "absent"
          : null;

        const priority = { correct: 3, present: 2, absent: 1 };
        if (!currentStatus || priority[status] > priority[currentStatus]) {
          keyButton.classList.remove("correct", "present", "absent");
          keyButton.classList.add(status);
        }
      }
    }

    if (currentGuess === todayWord) {
      fact.textContent = `🎉 You got it! ${todayFact}`;
      shareButton.style.display = "inline-block";
    } else if (currentRow === 5) {
      fact.textContent = `❌ Out of guesses! The word was ${todayWord}. ${todayFact}`;
      shareButton.style.display = "inline-block";
    }

    currentGuess = "";
    currentRow++;
  }

  shareButton.onclick = () => {
    const message = `Today's Sidword was "${todayWord}" — ${todayFact}`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };

  createBoard();
  createKeyboard();
});
