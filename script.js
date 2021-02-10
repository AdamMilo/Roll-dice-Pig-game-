"use strict";

//SELECTING HANDLES FOR HTML elements/////////////////////////////////
//player handles
const player0_handle = document.querySelector(".player--0");
const player1_handle = document.querySelector(".player--1");

const player0Name_handle = document.querySelector("#name--0");
const player1Name_handle = document.querySelector("#name--1");
//total scores
const score0_handle = document.querySelector("#score--0");
const score1_handle = document.getElementById("score--1");
//current scores
const currentScore0_handle = document.getElementById("current--0");
const currentScore1_handle = document.getElementById("current--1");
const dice_handle = document.querySelector(".dice");
//buttons
const btnNew_handle = document.querySelector(".btn--new");
const btnRoll_handle = document.querySelector(".btn--roll");
const btnHold_handle = document.querySelector(".btn--hold");

//GLOBAL VARIABLES//////////////////////////////
let totalScores; //tallies scores for each player
let currentScore;
let activePlayer; /*1/0 so that their names correspond the totalScore indexes*/
//"playing" acts as a "state-variable" and is used to define the current global state of the game
let playing;
//we can also declare them in all in a single line:
// let totalScores, currentScore, activePlayer, playing

//INITIALIZE GLOBAL VARIABLES AND INITIAL STATE/////////////
start_restart(); //This method initializes/restarts game state
////////////////////////////////////////////////////////////

//USER FUNCTIONS////////////////////////////////////////////
function switchPlayer() {
  //--Reseting the current score to zero
  //for both the previous and the next player
  currentScore = 0;
  document.getElementById(
    `current--${activePlayer}`
  ).textContent = currentScore;

  activePlayer = activePlayer === 0 ? 1 : 0;
  //if the active player is zero then change him into 1
  //otherwise set active player to zero.

  //--SWITCHING the player--active class
  player0_handle.classList.toggle("player--active");
  //removes the class if it exists
  player1_handle.classList.toggle("player--active");
  //adds the class if it does not exist
}
function start_restart() {
  //GLOBAL VARIABLE INITALIZATION //////////////////////////
  totalScores = [0, 0]; //tallies scores for each player
  currentScore = 0;
  activePlayer = 0; /*1/0 so that their names correspond the totalScore indexes*/
  //"playing" acts as a "state-variable" and is used to define the current global state of the game
  playing = true;
  //User visible display (re)initialization
  score0_handle.textContent = 0; //javascript will automatically
  score1_handle.textContent = 0; //convert these numbers to strings
  currentScore0_handle.textContent = 0;
  currentScore1_handle.textContent = 0;
  dice_handle.classList.add("hidden");

  //Remove the winner styles
  player1_handle.classList.remove("player--winner");
  player0_handle.classList.remove("player--winner");

  //Set up a new active player, and remove the old one
  player1_handle.classList.remove("player--active");
  player0_handle.classList.add("player--active");

  //You don't have to worry if the classes are there or not
  //when using .add(); and .remove(); methods ^______^
  //Note that if a class is already there .add(); method
  // will simply do nothing, and won't add a second one
  //also if the class is already removed, the .remove();
  // method will also simply do nothing, and won't send an erro
}
///////////////////////////////////////////////////////////

///////////////////////EVENT LISTENERS////////////////////
//ROLLING THE DICE FUNCTIONALITY///////////////////////////
btnRoll_handle.addEventListener("click", function () {
  //The code will only execute if the game is still (on!)
  if (playing) {
    //1.generate random dice roll
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    console.log(diceRoll); //check roll value

    //2.Display dice
    dice_handle.classList.remove("hidden");
    dice_handle.src = `images/dice-${diceRoll}.png`;

    //3.Adding score too our current player
    if (diceRoll != 1) {
      //Add diceroll to the current score.
      currentScore += diceRoll;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      //SWITCHING TO THE NEXT PLAYER
      switchPlayer();
    }
  }
});
///////////////////////////////////////////////////////////
btnHold_handle.addEventListener("click", function () {
  if (playing) {
    //1.Add a current score to the active player total score
    totalScores[activePlayer] += currentScore;
    //sums the current score with the total score for the active player([0]/[1])
    //display the total score for the current player
    document.querySelector(`#score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    //2.Check if the player's score is over 100
    if (totalScores[activePlayer] >= 10) {
      //Disable the game from playing further
      playing = false;
      //Hide the Button
      dice_handle.classList.add("hidden");
      //assign a winner class to the player
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    }
    switchPlayer();
  }
});
///////////////////////////////////////////////////////////
btnNew_handle.addEventListener("click", start_restart);
