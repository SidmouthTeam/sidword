let validWords = [];
let currentGuess = "";
const fact = document.getElementById("fact");

// Load word list from JSON
fetch('words.json')
  .then(response => response.json())
  .then(data => {
    validWords = data.validWords;
  })
  .catch(error => {
    console.error("Failed to load word list:", error);
  });

// Submit guess
function submitGuess() {
  const input = document.getElementById("guess-input");
  currentGuess = input.value.trim().toLowerCase();

  if (currentGuess.length !== 5) {
    fact.textContent = "❌ Please enter a 5-letter word.";
    return;
  }

  if (!validWords.includes(currentGuess)) {
    fact.textContent = `❌ "${currentGuess}" isn’t a valid word. Try a real one!`;
    return;
  }

  // If valid, show success (replace with your tile logic)
  fact.textContent = `✅ "${currentGuess}" is valid!`;
  input.value = "";
}
