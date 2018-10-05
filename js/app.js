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
var playersSection = document.querySelector('.players');
var players = document.querySelectorAll('.players');
var playingField = document.querySelector('.playing-field');
var playingFieldRows = document.querySelectorAll('.row');

var player1 = document.querySelector('.players #player1');
var player1Moves = [];
var player1ScoreTextContent = document.querySelector('#player1 .score');
var player1ScoreCount = 0;

var player2 = document.querySelector('.players #player2');
var player2Moves = [];
var player2ScoreTextContent = document.querySelector('#player2 .score');
var player2ScoreCount = 0;

var activePlayer = '';
var boardSize = 3;

var winnerSection = document.querySelector('.winner');
var winnerName = document.querySelector('.winner-name');
var finalScore = document.querySelector('.final-score');
var newGameButton = document.querySelector('.new-game-btn');

var bombSound = new Audio('sounds/bomb.mp3');
var makeMoveSound = new Audio('sounds/loadgun.mp3');
var winnerSound = new Audio('sounds/winner.mp3');
var trumpActive = new Audio('sounds/trump-active.mp3');
var kimActive = new Audio('sounds/kim-active.mp3');

// var intervalId = 0;
// var timerValue = 5;

function makeMove(event, activePlayer) {
  playSounds('makeMoveSound');
  if(!event.target.classList.contains('clicked')) {
    event.target.classList.toggle(activePlayer);
    event.target.classList.toggle('clicked');
    window[activePlayer + 'Moves'].push(Number(event.target.id));
    
    if(window[activePlayer + 'Moves'].length >= boardSize) {
      checkForWin(activePlayer);
    }
    alternatePlayers();
  }
}

function alternatePlayers() {
  if(activePlayer === 'player1') {
    player2.classList.add('active');
    player1.classList.remove('active');
    activePlayer = 'player2';
    playSounds('kimActive');
  } else {
    player1.classList.add('active');
    player2.classList.remove('active');
    activePlayer = 'player1';
    playSounds('trumpActive');
  }
}

function checkForWin(activePlayer) {
  var winningMoveCounter = 0;
  var currentPlayerMoves = window[activePlayer + 'Moves'];
  for(var i = 0; i < winningCombos.length; i++) {
    for(var j = 0; j < currentPlayerMoves.length; j++) {
      if(winningCombos[i].includes(currentPlayerMoves[j])) {
        ++winningMoveCounter;
      }
    }
    if(winningMoveCounter === boardSize) {
      playSounds('bombSound');
      setTimeout(function(){updateScore(activePlayer)}, 300);
      break;
    } else if (player1Moves.length + player2Moves.length === boardSize * boardSize) {
      startNewGame();
    }
    winningMoveCounter = 0;
  }
}

function updateScore(activePlayer) {
  window[activePlayer + 'ScoreCount'] += 1;
  window[activePlayer + 'ScoreTextContent'].textContent = window[activePlayer + 'ScoreCount'] + ' / ' + boardSize;
  if (window[activePlayer + 'ScoreCount'] === boardSize) {
    setTimeout(function(){endGame(activePlayer)}, 1000);
  } else {
    player1Moves = [];
    player2Moves = [];
    boxes.forEach(function(box) {
      box.classList.remove('clicked');
      box.classList.remove('player1');
      box.classList.remove('player2');
    })
  }
}

function endGame(activePlayer) {
  playSounds('winnerSound');
  player1.classList.add('hidden');
  player2.classList.add('hidden');
  if(activePlayer === 'player1') {
    playersSection.classList.add('hidden');
    playingField.classList.add('winner-player1');
    playingFieldRows.forEach(function(row) {
      row.classList.add('hidden');
    })
    winnerSection.classList.remove('hidden');
    winnerName.textContent = 'The Don wins';
    if(player2ScoreCount === 0) {
      finalScore.textContent = player1ScoreCount + ' to nil';
    } else {
      finalScore.textContent = player1ScoreCount + ' to ' + player2ScoreCount;
    }
  } else {
    playersSection.classList.add('hidden');
    playingField.classList.add('winner-player2');
    playingFieldRows.forEach(function(row) {
      row.classList.add('hidden');
    })
    winnerSection.classList.remove('hidden');
    winnerName.textContent = 'Master Kim wins';
    if(player1ScoreCount === 0) {
      finalScore.textContent = player2ScoreCount + ' to nil';
    } else {
      finalScore.textContent = player2ScoreCount + ' to ' + player1ScoreCount;
    }
  }
  // setCountdown();
}

// function setCountdown() {
//   intervalId = window.setInterval(updateNewGameButtonCountdown, 1000);
// }

// function updateNewGameButtonCountdown() {
//   if(timerValue === 0) {
//     window.clearInterval(intervalId);
//     intervalId = 0;
//     startNewGame();
//   } else {
//     newGameButton.textContent = 'NEW ATTACK IN ' + timerValue;
//     timerValue--;
//   }
// }

function startNewGame() {
  player1Moves = [];
  player2Moves = [];
  player1.classList.remove('active');
  player2.classList.remove('active');
  boxes.forEach(function(box) {
    box.classList.remove('clicked');
    box.classList.remove('player1');
    box.classList.remove('player2');
  })
  players.forEach(function(player) {
    player.classList.remove('active');
  })
  player1ScoreCount = 0;
  player1ScoreTextContent.textContent = '0 / ' + boardSize;
  player2ScoreCount = 0;
  player2ScoreTextContent.textContent = '0 / ' + boardSize;
  winnerName.textContent = '';
  finalScore.textContent = '';
  playersSection.classList.remove('hidden');
  player1.classList.remove('hidden');
  player2.classList.remove('hidden');
  playingField.classList.remove('winner-player1');
  playingField.classList.remove('winner-player2');
  playingFieldRows.forEach(function(row) {
    row.classList.remove('hidden');
  })
  winnerSection.classList.add('hidden');
  setStartingPlayerRandomly();
  // newGameButton.textContent = 'NEW ATTACK';
  // intervalId = 0;
  // timerValue = 5;
}

function setStartingPlayerRandomly() {
  var randomPlayer = Math.floor((Math.random() * 2) + 1);
  if (randomPlayer === 1) {
    activePlayer = 'player1';
    playSounds('trumpActive');
  } else {
    activePlayer = 'player2';
    playSounds('kimActive');
  }
  window[activePlayer].classList.add('active');
}

function playSounds(sound) {
  switch(sound) {
    case 'bombSound': bombSound.play();
    break;
    case 'makeMoveSound': makeMoveSound.play();
    break;
    case 'winnerSound': winnerSound.play();
    break;
    case 'trumpActive': trumpActive.play();
    break;
    case 'kimActive': kimActive.play();
    break;
  }
}

boxes.forEach(function(box){
  box.addEventListener('click', function() {
    makeMove(event, activePlayer);
  });
})

newGameButton.addEventListener('click', startNewGame);

startNewGame();