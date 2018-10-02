var boxes = document.querySelectorAll('.box');
var winningCombos = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [1,4,7],
  [2,5,8],
  [3,6,9],
  [1,5,9],
  [3,5,7]
];
var player1Moves = [];
var player2Moves = [];
var currentPlayer = 'player1';

function makeMove(event, currentPlayer) {
  event.target.classList.toggle(currentPlayer);
  event.target.classList.toggle('clicked');
  window[currentPlayer + 'Moves'].push(Number(event.target.id));
  
  if(window[currentPlayer + 'Moves'].length >= 3) {
    checkWinningCombo(currentPlayer);
  }

  alternatePlayer();
}

function alternatePlayer() {
  if(currentPlayer === 'player1') {
    currentPlayer = 'player2';
  } else {
    currentPlayer = 'player1';
  }
}

function checkWinningCombo(currentPlayer) {
  var winningMoveCounter = 0;
  var currentPlayerMoves = window[currentPlayer + 'Moves'];
  for(var i = 0; i < winningCombos.length; i++) {
    for(var j = 0; j < currentPlayerMoves.length; j++) {
      if(winningCombos[i].includes(currentPlayerMoves[j])) {
        ++winningMoveCounter;
      }
    }
    if(winningMoveCounter === 3) {
      endGame(currentPlayer);
      break;
    }
    winningMoveCounter = 0;
  }
}

function endGame(currentPlayer) {
  console.log(currentPlayer + ' has won!');
}

boxes.forEach(function(box){
  box.addEventListener('click', function() {
    makeMove(event, currentPlayer);
  });
})