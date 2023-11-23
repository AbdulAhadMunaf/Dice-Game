'use strict';

let totalScore1 = 0, totalScore2 = 0, currentScore = 0;
let turn = 0;
// 0 for player1 and 1 for player2

const score0EL = document.querySelector('#score--0');
const score1EL = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

score0EL.textContent = 0;
score1EL.textContent = 0;
document.querySelector('.dice').classList.add('hidden');

let generateDice = function () {
    return Math.trunc(Math.random() * 6) + 1;
}

let updateCurrentScore = function (value) {
    if (!turn) {
        currentScore += value;
        current0El.textContent = currentScore;
    }
    else {
        currentScore += value;
        current1El.textContent = currentScore;
    }
}

let updateTotalScore = function () {
    if (!turn) {
        totalScore1 += currentScore;
        score0EL.textContent = totalScore1;
    }
    else {
        totalScore2 += currentScore;
        score1EL.textContent = totalScore2;
    }
}

let switchPlayer = function () {
    if (!turn) {
        player0El.classList.remove('player--active');
        player1El.classList.add('player--active');
    }
    else {
        player1El.classList.remove('player--active');
        player0El.classList.add('player--active');
    }
}

let gameWon = function () {
    if (!turn) {
        if (totalScore1 >= 100) {
            player0El.classList.add('player--winner');
            player0El.classList.add('name');
            return true;
        }
        return false;
    }
    else {
        if (totalScore2 >= 100) {
            player1El.classList.add('player--winner');
            player1El.classList.add('name');
            return true;
        }
        return false;
    }
}


document.querySelector('.btn--roll').addEventListener(
    'click',
    function () {
        let value = generateDice();
        document.querySelector('.dice').src = `dice-${value}.png`;
        if (value === 1) {
            currentScore = 0;
            updateCurrentScore(0);
            switchPlayer();
            turn ^= 1;
        }
        else {
            updateCurrentScore(value);
        }
    }
)

document.querySelector('.btn--hold').addEventListener(
    'click',
    function () {
        updateTotalScore(currentScore);
        if (gameWon()) {
            updateWinner();
        }
        else {
            currentScore = 0;
            updateCurrentScore(0);
            switchPlayer();
            turn ^= 1;
        }
    }
)


document.querySelector('.btn--new').addEventListener(
    'click',
    function () {
        currentScore = 0;
        totalScore1 = 0;
        totalScore2 = 0;
        turn = 1;
        switchPlayer();
        updateTotalScore();
        turn = 0;
        updateTotalScore();
        if (player0El.classList.contains('name')) {
            player0El.classList.remove('name');
            player0El.classList.remove('player--winner');
        }
        if (player1El.classList.contains('name')) {
            player1El.classList.remove('name');
            player1El.classList.remove('player--winner');
        }
    }
)