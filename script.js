let scores = [0, 0];
let history = [[], []];
let playerNames = ["P1 Home", "P2 Away"];
let currentPlayer = 0;

function applyVisualStyle(style) {
  document.body.className = "";
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
  const name1 = document.getElementById("player1Name").value.trim();
  const name2 = document.getElementById("player2Name").value.trim();
  const startingScore = parseInt(document.getElementById("startingScore").value);
  const bullWinner = parseInt(document.getElementById("bullWinner").value);
  const visualStyle = document.getElementById("visualStyle").value;

  playerNames = [name1 || "P1 Home", name2 || "P2 Away"];
  scores = [startingScore, startingScore];
  history = [[], []];
  currentPlayer = bullWinner;

  applyVisualStyle(visualStyle);

  const gameDiv = document.getElementById("game");
  gameDiv.innerHTML = `
    <div class="scoreboard">
      ${[0, 1].map(i => `
        <div class="player">
          <h2>${playerNames[i]}</h2>
          <div class="score" id="score${i}">${startingScore}</div>
          <input type="number" id="input${i}" placeholder="Enter score">
          <div class="scoring-buttons" data-player="${i}">
            <button data-score="25">25</button>
            <button data-score="50">Bull</button>
            <button data-score="0">No Score</button>
            <button data-multiplier="2">Double</button>
            <button data-multiplier="3">Treble</button>
          </div>
          <div class="controls">
            <button id="subtract${i}">Submit</button>
            <button id="undo${i}">Undo</button>
          </div>
        </div>
      `).join("")}
    </div>
  `;

  document.getElementById("setup").style.display = "none";
  gameDiv.style.display = "flex";

  [0, 1].forEach(i => {
    document.getElementById(`subtract${i}`).addEventListener("click", () => {
      const value = parseInt(document.getElementById(`input${i}`).value);
      subtractScore(i, value);
    });

    document.getElementById(`undo${i}`).addEventListener("click", () => undo(i));

    document.querySelectorAll(`.scoring-buttons[data-player="${i}"] button`).forEach(btn => {
      btn.addEventListener("click", () => {
        const score = btn.getAttribute("data-score");
        const mult = btn.getAttribute("data-multiplier");

        if (score !== null) {
          subtractScore(i, parseInt(score));
        } else if (mult !== null) {
          const multiplier = parseInt(mult);
          const input = document.getElementById(`input${i}`);
          const base = parseInt(input.value);
          if (!isNaN(base)) {
            subtractScore(i, base * multiplier);
            input.value = "";
          }
        }
      });
    });
  });

  updateDisplay();
});
