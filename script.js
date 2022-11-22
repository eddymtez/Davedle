import { words } from "./words.js";

let answer;
let totalGuesses;
let guessesRemaining;
let currentGuess;
let nextLetter;
let gameWon;

game();

function game() {

    answer = words[Math.floor(Math.random() * words.length)];
    totalGuesses = 1;
    guessesRemaining = totalGuesses;
    currentGuess = [];
    nextLetter = 0;
    gameWon = false;

    document.addEventListener('DOMContentLoaded', () => {

        start();
        input();
        
    });

}

function start() {

    const board = document.querySelector('#board');

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

    //phantom final row
    const row = document.createElement('div');
    row.classList.add('phantom-row');

    for (let j = 0; j < answer.length; j++) {

        const box = document.createElement('div');
        box.classList.add('phantom-box');
        row.appendChild(box);

    }
    
    board.appendChild(row);

}

function input() {

    const board = document.querySelector('#board');
    const guessRow = totalGuesses - guessesRemaining;

    if (guessesRemaining === 0) {

        return;

    }
    
    const keys = document.getElementsByClassName('keyboard-button');

    for (let i = 0; i < keys.length; i++) {

        keys[i].addEventListener('click', (event) => {

            keyPress(event);

        })

    }
  
}

function keyPress(event) {

    if (guessesRemaining > 0) {

        const board = document.querySelector('#board');
        const letter = event.target.textContent;
        const guess = totalGuesses - guessesRemaining;
        const rowLength = answer.length;

        if (letter === 'Del') {

            if (nextLetter > 0) {
                board.children[guess].children[nextLetter-1].innerText = '';
                currentGuess.pop();
                nextLetter--;
            }
    
        } else if (letter === 'Enter') {

            if (nextLetter === rowLength) {
                
                checkGuess(guess, board);
            
            }

        } else {
        
            if (nextLetter < rowLength) {

                board.children[guess].children[nextLetter].innerText = letter;
                currentGuess.push(letter);
                nextLetter++;

            }
                
        }
    }
     
}

function checkGuess(guess, board) {

    const answerArray = answer.split('');
    let correctGuesses = 0;

    for (let i = 0; i < answer.length; i++){

        if (answerArray[i] === currentGuess[i]){

            board.children[guess].children[i].classList.add('correct-guess');
            document.querySelector(`#${currentGuess[i]}`).classList.add('keyboard-correct');
            correctGuesses++;

        } else if (answerArray.includes(currentGuess[i])) {

            board.children[guess].children[i].classList.add('right-guess');
            document.querySelector(`#${currentGuess[i]}`).classList.add('keyboard-right');

        } else {

            board.children[guess].children[i].classList.add('letter-used');
            document.querySelector(`#${currentGuess[i]}`).classList.add('keyboard-used');

        }

        if (correctGuesses === answer.length) {

            gameWon = true;
            win();

        }
        
    }

    reset();

    if (!gameWon) {

        checkLoss(board);

    }
     
}

function checkLoss(board) {

    if (!guessesRemaining) {

        for (let i = 0; i < answer.length; i++) {

            const letter = answer.charAt(i)
            const elem = board.lastElementChild.children[i];
            elem.innerText = letter;
            elem.style.border = '2px solid red';
            const classList = document.querySelector(`#${letter}`).classList;

            if (classList.contains('keyboard-correct')){
                elem.classList.add('keyboard-correct');
            } else if (classList.contains('keyboard-right')){
                elem.classList.add('keyboard-right');
            }      
            
        }

    }

}

function win() {

    alert("You win!")

    //create button for new game
    let button = document.createElement('button');
    button.innerHTML = 'Play again';
    button.style.marginTop = '10px';
    button.addEventListener('click', game());
    document.querySelector('#keyboard-cont').appendChild(button);

}

function reset() {

    currentGuess = [];
    guessesRemaining--;
    nextLetter = 0;

}




