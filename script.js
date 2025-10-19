let scores = [501, 501];
let history = [[], []];

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

document.addEventListener("DOMContentLoaded", () => {
  updateDisplay();

  document.getElementById("subtract0").addEventListener("click", () => {
    const value = parseInt(document.getElementById("input0").value);
    subtractScore(0, value);
  });

  document.getElementById("subtract1").addEventListener("click", () => {
    const value = parseInt(document.getElementById("input1").value);
    subtractScore(1, value);
  });

  document.getElementById("undo0").addEventListener("click", () => undo(0));
  document.getElementById("undo1").addEventListener("click", () => undo(1));
});
