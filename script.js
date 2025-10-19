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

const playToSelect = document.getElementById('playto');
const bestOfSelect = document.getElementById('bestof');
const resetButton = document.getElementById('reset');

let playToScore = parseInt(playToSelect.value);
let bestOfLegs = parseInt(bestOfSelect.value);
let legsNeededToWin = Math.ceil(bestOfLegs / 2);
let matchOver = false;

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
            alert(`${player === player1 ? "Home" : "Away"} wins the match!`);
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
    playToScore = parseInt(playToSelect.value);
    bestOfLegs = parseInt(bestOfSelect.value);
    legsNeededToWin = Math.ceil(bestOfLegs / 2);

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
playToSelect.addEventListener('change', () => {
    playToScore = parseInt(playToSelect.value);
});
bestOfSelect.addEventListener('change', () => {
    bestOfLegs = parseInt(bestOfSelect.value);
    legsNeededToWin = Math.ceil(bestOfLegs / 2);
});
resetButton.addEventListener('click', resetMatch);
