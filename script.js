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
    submitButton: document.getElementById('p1Submit'),
    panel: document.getElementById('player1')
};

const player2 = {
    score: 0,
    legs: 0,
    scoreDisplay: document.getElementById('p2Score'),
    legsDisplay: document.getElementById('p2Legs'),
    submitButton: document.getElementById('p2Submit'),
    panel: document.getElementById('player2')
};

const resetButton = document.getElementById('reset');
const dartGrid = document.getElementById('dartGrid');
const dartInputs = document.querySelectorAll('.dartCell');
const turnIndicator = document.getElementById('turnIndicator');

let playToScore = 501;
let bestOfLegs = 3;
let legsNeededToWin = 2;
let matchOver = false;
let currentPlayer = player1;

startButton.addEventListener('click', () => {
    const p1Name = p1NameInput.value.trim() || "Home";
    const p2Name = p2NameInput.value.trim() || "Away
