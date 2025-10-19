const setupScreen = document.getElementById('setupScreen');
const matchScreen = document.getElementById('matchScreen');
const startButton = document.getElementById('startMatch');

const p1NameInput = document.getElementById('p1NameInput');
const p2NameInput = document.getElementById('p2NameInput');
const playToSelect = document.getElementById('playto');
const bestOfSelect = document.getElementById('bestof');
const starterSelect = document.getElementById('starter');
const themeSelect = document.getElementById('theme');

const p1NameLabel = document.getElementById('p1Name');
const p2NameLabel = document.getElementById('p2Name');

const player1 = {
    score: 0,
    legs: 0,
    scoreDisplay: document.getElementById('p1Score'),
    legsDisplay: document.getElementById('p1Legs'),
    dartInputs: [
        document.getElementById('p1Dart1'),
        document.getElementById('p1Dart2'),
        document.getElementById('p1Dart3')
    ],
    submitButton: document.getElementById('p1Submit')
};

const player2 = {
    score: 0,
    legs: 0,
    scoreDisplay: document.getElementById('p2Score'),
    legsDisplay: document.getElementById('p2Legs'),
    dartInputs: [
        document.getElementById('p2Dart1'),
        document.getElementById('p2Dart2'),
        document.getElementById('p2Dart3')
    ],
    submitButton: document.getElementById('p2Submit')
};

const resetButton = document.getElementById('reset');

let playToScore = 501;
let bestOfLegs = 3;
let legsNeededToWin = 2;
let matchOver = false;
let starter = "p1";

startButton.addEventListener('click', () => {
    const p1Name = p1NameInput.value.trim() || "Home";
    const p2Name = p2NameInput.value.trim() || "Away";

    p1NameLabel.textContent = p1Name;
    p2NameLabel.textContent = p2Name;

    playToScore = parseInt(playToSelect.value);
    bestOfLegs = parseInt(bestOfSelect.value);
    legsNeededToWin = Math.ceil(bestOfLegs / 2);
    starter = starterSelect.value;

    const theme = themeSelect.value;
    document.body.className = theme; // Apply theme class to body

    setupScreen.style.display = "none";
    matchScreen.style.display = "grid";

    resetMatch();

    if (starter === "bull") {
        alert("Closest to Bull selected. Decide manually who starts.");
    } else {
        alert(`${starter === "p1" ? p1Name : p2Name} will start the match.`);
    }
});

function submitTurn(player, opponent) {
    if (matchOver) return;

    let turnTotal = 0;
    for (let input of player.dartInputs) {
        const val = parseInt(input.value);
        if (!isNaN(val)) {
            turnTotal += val;
        }
        input.value = '';
    }

    player.score += turnTotal;
    player.scoreDisplay.textContent = player.score;

    if (player.score >= playToScore) {
        player.legs += 1;
        player.legsDisplay.textContent = player.legs;

        if (player.legs >= legsNeededToWin) {
            matchOver = true;
            player.scoreDisplay.classList.add('has-text-success');
            opponent.scoreDisplay.classList.add('has-text-danger');
            alert(`${player === player1 ? p1NameLabel.textContent : p2NameLabel.textContent} wins the match!`);
        } else {
            resetLeg();
        }
    }
}

function resetLeg() {
    for (let p of [player1, player2]) {
        p.score = 0;
        p.scoreDisplay.textContent = 0;
        p.scoreDisplay.classList.remove('has-text-success', 'has-text-danger');
        for (let input of p.dartInputs) {
            input.value = '';
        }
    }
}

function resetMatch() {
    matchOver = false;
    for (let p of [player1, player2]) {
        p.score = 0;
        p.legs = 0;
        p.scoreDisplay.textContent = 0;
        p.legsDisplay.textContent = 0;
        p.scoreDisplay.classList.remove('has-text-success', 'has-text-danger');
        for (let input of p.dartInputs) {
            input.value = '';
        }
    }
}

player1.submitButton.addEventListener('click', () => submitTurn(player1, player2));
player2.submitButton.addEventListener('click', () => submitTurn(player2, player1));
resetButton.addEventListener('click', () => {
    setupScreen.style.display = "block";
    matchScreen.style.display = "none";
});
