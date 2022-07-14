'use strict';
//selecting html elements
const playerZero = document.querySelector('.player--0');
const playerOne = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');


const rollDiceBtn = document.querySelector('.btn--roll');
const newGameBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');
let diceImg = document.querySelector('.dice');

//declaring current score and total score for the game
let currentScore,scores,activePlayer,playing;
function init(){ 
currentScore = 0;
 scores = [0, 0];
 activePlayer = 0;
 playing = true;

 score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceImg.classList.add('hidden');
 playerZero.classList.add('player--active');
playerOne.classList.remove('player--active');
playerZero.classList.remove('player--winner');
playerOne.classList.remove('player--winner');


};
init();

//function to switch the player
function switchPlayer() {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    //Switching the active player
    activePlayer = activePlayer === 0 ? 1 : 0;
    playerZero.classList.toggle('player--active');
    playerOne.classList.toggle('player--active');
}

//adding eventlistener to rollDiceBtm
rollDiceBtn.addEventListener('click', () => {
    if (playing) {
        //generating value for the dice
        let diceValue = Math.trunc(Math.random() * 6) + 1;
        console.log(diceValue);
        //changing the dice image according to the dice value and making it visible
        diceImg.src = `dice-${diceValue}.png`;
        diceImg.classList.remove('hidden');
        //checking if the dicevalue is not 1 and then updating currentScore
        if (diceValue !== 1) {
            currentScore += diceValue;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        }
        //condition when the dicValue is one
        else {
            //resetting the currentscore of active player back to zero
            switchPlayer();

        }
    }
})
//adding click event to hold button
holdBtn.addEventListener('click', () => {
    if (playing) {
        //updating the total score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        //check if any player won
        if (scores[activePlayer] >= 20) {
            document.querySelector(`.player--${activePlayer}`).classList.toggle('player--active');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            diceImg.classList.add('hidden');
            playing = false;
        }
        else {
            switchPlayer();
        }
    }
})
newGameBtn.addEventListener('click',init);