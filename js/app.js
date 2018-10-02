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
var winningMoveCounter = 0;

function handleClick(event) {
  event.target.classList.toggle('player1');
  event.target.classList.toggle('clicked');
  player1Moves.push(Number(event.target.id));
  if(player1Moves.length >= 3) {
    checkWinningCombo();
  }
}

function checkWinningCombo() {
  for(var i = 0; i < winningCombos.length; i++) {
    player1Moves.forEach(function(move) {
      if(winningCombos[i].includes(move)) {
        ++winningMoveCounter;
      }
    })
    if(winningMoveCounter === 3) {
      endGame();
      break;
    }
    winningMoveCounter = 0;
  }
}

function endGame() {
  console.log("you've won!")
}

boxes.forEach(function(box){
  box.addEventListener('click', handleClick);
})