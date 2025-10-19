// DOM elements
const scoreInput = document.getElementById("score-input");
const submitTurn = document.getElementById("submit-turn");
const undoTurn = document.getElementById("undo-turn");
const bustAlert = document.getElementById("bust-alert");

const playerA = document.getElementById("player-a");
const playerB = document.getElementById("player-b");

let scores = {
  A: 501,
  B: 501,
};

let currentPlayer = "A";
let history = [];

// Update scoreboard
function updateDisplay() {
  playerA.querySelector(".score").textContent = scores.A;
  playerB.querySelector(".score").textContent = scores.B;
}

// Handle turn submission
submitTurn.addEventListener("click", () => {
  const input = parseInt(scoreInput.value, 10);
  if (isNaN(input) || input < 0 || input > 180) return;

  const currentScore = scores[currentPlayer];
  const newScore = currentScore - input;

  if (newScore < 0) {
    bustAlert.hidden = false;
    return;
  }

  bustAlert.hidden = true;
  history.push({ player: currentPlayer, score: input, previous: currentScore });
  scores[currentPlayer] = newScore;

  // Switch player
  currentPlayer = currentPlayer === "A" ? "B" : "A";
  scoreInput.value = "";
  updateDisplay();
});

// Undo last turn
undoTurn.addEventListener("click", () => {
  const last = history.pop();
  if (!last) return;

  scores[last.player] = last.previous;
  currentPlayer = last.player;
  bustAlert.hidden = true;
  updateDisplay();
});
// Initial display
updateDisplay();
