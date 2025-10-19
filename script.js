let scores = [0, 0];
let history = [[], []];
let playerNames = ["P1 Home", "P2 Away"];
let currentPlayer = 0;

function applyVisualStyle(style) {
  document.body.className = ""; // Reset styles
  switch (style) {
    case "highContrast":
      document.body.classList.add("high-contrast");
      break;
    case "largeFont":
      document.body.classList.add("large-font");
      break;
    case "darkMode":
      document.body.classList.add("dark-mode");
      break;
    default:
      // Default style, no class needed
      break;
  }
}

function updateDisplay() {
  document.getElementById("score0").textContent = scores[0];
  document.getElementById("score1").textContent = scores[1];
}

function subtractScore(playerIndex, amount) {
  if (scores[playerIndex] >= amount) {
    history[playerIndex].push(scores[playerIndex]);
    scores[playerIndex] -= amount;
    updateDisplay();
  }
}

function undo(playerIndex) {
  if (history[playerIndex].length > 0) {
    scores[playerIndex] = history[playerIndex].pop();
    updateDisplay();
  }
}

document.getElementById("startMatch").addEventListener("click", () => {
  // Get setup values
  const name1 = document.getElementById("
