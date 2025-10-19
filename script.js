document.getElementById("startMatch").addEventListener("click", () => {
  const name1 = document.getElementById("player1Name").value || "Player 1";
  const name2 = document.getElementById("player2Name").value || "Player 2";
  const startingScore = parseInt(document.getElementById("startingScore").value);
  const bullWinner = parseInt(document.getElementById("bullWinner").value);

  // Initialize scores and history
  scores = [startingScore, startingScore];
  history = [[], []];

  // Build scoreboard dynamically
  const gameDiv = document.getElementById("game");
  gameDiv.innerHTML = `
    <div class="scoreboard">
      <div class="player">
        <h2>${name1}</h2>
        <div class="score" id="score0">${startingScore}</div>
        <input type="number" id="input0" placeholder="Enter score">
        <div class="controls">
          <button id="subtract0">Submit</button>
          <button id="undo0">Undo</button>
        </div>
      </div>
      <div class="player">
        <h2>${name2}</h2>
        <div class="score" id="score1">${startingScore}</div>
        <input type="number" id="input1" placeholder="Enter score">
        <div class="controls">
          <button id="subtract1">Submit</button>
          <button id="undo1">Undo</button>
        </div>
      </div>
    </div>
  `;

  // Hide setup, show game
  document.getElementById("setup").style.display = "none";
  gameDiv.style.display = "flex";

  // Rebind event listeners
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
