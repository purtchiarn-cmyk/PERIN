const player1 = {
    score: 0,
    scoreDisplay: document.getElementById('p1Score'),
    dartInputs: [
        document.getElementById('p1Dart1'),
        document.getElementById('p1Dart2'),
        document.getElementById('p1Dart3')
    ],
    submitButton: document.getElementById('p1Submit')
};

const player2 = {
    score: 0,
    scoreDisplay: document.getElementById('p2Score'),
    dartInputs: [
        document.getElementById('p2Dart1'),
        document.getElementById('p2Dart2'),
        document.getElementById('p2Dart3')
    ],
    submitButton: document.getElementById('p2Submit')
};

const playToSelect = document.getElementById('playto');
const resetButton = document.getElementById('reset');
let playToScore = parseInt(playToSelect.value);
let gameOver = false;

function submitTurn(player) {
    if (gameOver) return;

    let turnTotal = 0;
    for (let input of player.dartInputs) {
        const val = parseInt(input.value);
        if (!isNaN(val)) {
            turnTotal += val;
        }
        input.value = ''; // Clear input
    }

    player.score += turnTotal;
    player.scoreDisplay.textContent = player.score;

    if (player.score >= playToScore) {
        gameOver = true;
        player.scoreDisplay.classList.add('has-text-success');
    }
}

player1.submitButton.addEventListener('click', () => submitTurn(player1));
player2.submitButton.addEventListener('click', () => submitTurn(player2));

playToSelect.addEventListener('change', () => {
    playToScore = parseInt(playToSelect.value);
    resetGame();
});

resetButton.addEventListener('click', resetGame);

function resetGame() {
    gameOver = false;
    for (let p of [player1, player2]) {
        p.score = 0;
        p.scoreDisplay.textContent = 0;
        p.scoreDisplay.classList.remove('has-text-success');
        for (let input of p.dartInputs) {
            input.value = '';
        }
    }
}
