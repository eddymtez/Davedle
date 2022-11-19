import { words } from "./words.js";

const answer = words[Math.floor(Math.random() * words.length)];

let totalGuesses;

if (answer.length >= 8) {
    totalGuesses = 7;
} else {
    totalGuesses = 6;
}


let guessesRemaining = totalGuesses;
let currentGuess = [];
let nextLetter = 0;




document.addEventListener('DOMContentLoaded', () => {

    start();
    input();

});


function start() {
    const board = document.getElementById('board');

    for (let i = 0; i < totalGuesses; i++) {

        const row = document.createElement('div');
        row.classList.add('letter-row');

        for (let j = 0; j < answer.length; j++) {

            const box = document.createElement('div');
            box.classList.add('letter-box');
            row.appendChild(box);
            
        }

        board.appendChild(row);

    }

}

function input() {

    if (guessesRemaining === 0) {

        return;

    }
    document.addEventListener('keydown', (e) => {

    });

}



