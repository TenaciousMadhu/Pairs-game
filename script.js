imageTiles = document.getElementsByClassName("image-tiles");
tilesContainer = document.getElementById("tiles-container");
gameContainer = document.getElementById("game-container");
score = document.getElementById("score");
lives = document.getElementById("lives");
reset = document.getElementById("reset");
minutes = document.getElementById("minutes");
seconds = document.getElementById("seconds");

let randomPositionsCollection = [];

let gameScore = 0;
let gameLives = 5;
let arrangedImagesCollection = [];

function randomizeImagePositions() {
  randomPositionsCollection = [];
  while (randomPositionsCollection.length < 12) {
    pairRandomPosition = Math.floor(Math.random() * 12);
    if (randomPositionsCollection.includes(pairRandomPosition) == false) {
      randomPositionsCollection.push(pairRandomPosition);
    }
  }
}

function startGame() {
  startGameContainer = document.createElement("div");
  startGameContainer.classList.add("startup");
  tilesContainer.appendChild(startGameContainer);
  instructions = document.createElement("div");
  instructions.innerHTML =
    "Remember the position of various images, and guess them correctly to win";
  instructions.classList.add("game-instructions");
  startGameContainer.appendChild(instructions);
  playGame = document.createElement("button");
  playGame.innerHTML = "Let's Start";
  playGame.classList.add("game");
  startGameContainer.appendChild(playGame);
  playGame.addEventListener("click", renderGame);
}

function renderGame() {
  randomizeImagePositions();
  console.log("randomPositionsCollection", randomPositionsCollection);
  initialDelay = setTimeout(generatePairedImages, 1000);
  hideImages = setTimeout(toHidePairedImages, 3000);
  startGameContainer.style.display = "none";
}

function generatePairedImages() {
  //   console.log("pair");
  reset.style.display = "none";
  tilesContainer.classList.add("disable-pointer");
  for (let i = 0; i < imageTiles.length; i++) {
    if (
      i == randomPositionsCollection[0] ||
      i == randomPositionsCollection[1]
    ) {
      imageTiles[i].src = "pair1.jpg";
      arrangedImagesCollection[randomPositionsCollection[0]] = "pair1.jpg";
      arrangedImagesCollection[randomPositionsCollection[1]] = "pair1.jpg";
    } else if (
      i == randomPositionsCollection[2] ||
      i == randomPositionsCollection[3]
    ) {
      imageTiles[i].src = "pair2.jpg";
      arrangedImagesCollection[randomPositionsCollection[2]] = "pair2.jpg";
      arrangedImagesCollection[randomPositionsCollection[3]] = "pair2.jpg";
    } else if (
      i == randomPositionsCollection[4] ||
      i == randomPositionsCollection[5]
    ) {
      imageTiles[i].src = "pair3.jpg";
      arrangedImagesCollection[randomPositionsCollection[4]] = "pair3.jpg";
      arrangedImagesCollection[randomPositionsCollection[5]] = "pair3.jpg";
    } else if (
      i == randomPositionsCollection[6] ||
      i == randomPositionsCollection[7]
    ) {
      imageTiles[i].src = "pair4.jpg";
      arrangedImagesCollection[randomPositionsCollection[6]] = "pair4.jpg";
      arrangedImagesCollection[randomPositionsCollection[7]] = "pair4.jpg";
    } else if (
      i == randomPositionsCollection[8] ||
      i == randomPositionsCollection[9]
    ) {
      imageTiles[i].src = "pair5.jpg";
      arrangedImagesCollection[randomPositionsCollection[8]] = "pair5.jpg";
      arrangedImagesCollection[randomPositionsCollection[9]] = "pair5.jpg";
    } else if (
      i == randomPositionsCollection[10] ||
      i == randomPositionsCollection[11]
    ) {
      imageTiles[i].src = "pair6.jpg";
      arrangedImagesCollection[randomPositionsCollection[10]] = "pair6.jpg";
      arrangedImagesCollection[randomPositionsCollection[11]] = "pair6.jpg";
    }
  }
}

function toHidePairedImages() {
  tilesContainer.classList.remove("disable-pointer");
  for (let i = 0; i < imageTiles.length; i++) {
    imageTiles[i].src = "bg.jpg";
  }
  displayTimer();
  reset.style.display = "inline";
}

let firstImageClicked = 0;
let firstClickedImagePosition = 0;
let secondClickedImagePosition = 0;

for (let i = 0; i < imageTiles.length; i++) {
  imageTiles[i].addEventListener("click", function () {
    imageTiles[i].classList.remove("hide-back");
    imageTiles[i].classList.add("show-image");
    if (firstImageClicked == 0) {
      console.log("i", i);
      showImageTile(i);
    } else if (firstImageClicked == 1) {
      console.log("i", i);
      compareImageTiles(i);
    }
  });
}

function showImageTile(i) {
  // //
  // console.log("in showImageTile");
  // console.log("firstImageClicked", firstImageClicked);
  imageTiles[i].src = arrangedImagesCollection[i];
  firstImageTilePosition = i;
  firstClickedImagePosition = arrangedImagesCollection[i].slice(4, 5);
  firstImageClicked = 1;
  imageTiles[i].classList.add("disable-pointer");
}

function compareImageTiles(i) {
  console.log("in compareImageTiles");
  console.log("firstImageClicked", firstImageClicked);
  imageTiles[i].src = arrangedImagesCollection[i];
  secondClickedImagePosition = arrangedImagesCollection[i].slice(4, 5);
  secondImageTilePosition = i;
  firstImageClicked = 0;
  if (secondClickedImagePosition != firstClickedImagePosition) {
    gameLives--;
    lives.innerHTML = "0" + gameLives;
    if (gameLives <= 0) {
      let resultString = "You Lost";
      displayResult(resultString);
      tilesContainer.classList.add("disable-pointer");
    }
    delayToCompare = setTimeout(function () {
      imageTiles[i].src = "bg.jpg";
      imageTiles[firstImageTilePosition].src = "bg.jpg";
      imageTiles[i].classList.add("hide-back");
      imageTiles[i].classList.remove("show-image");
      imageTiles[firstImageTilePosition].classList.add("hide-back");
      imageTiles[firstImageTilePosition].classList.remove("disable-pointer");
    }, 1000);
  } else {
    imageTiles[secondImageTilePosition].classList.add("disable-pointer");
    // imageTiles[secondImageTilePosition].classList.add("hide-back");
    // imageTiles[secondImageTilePosition].classList.remove("show-image");
    // imageTiles[firstImageTilePosition].classList.add("hide-back");
    gameScore++;
    score.innerHTML = ("0" + gameScore).slice(-2);
    if (gameScore == 6) {
      resultString = "You Won";
      displayResult(resultString);
    }
  }
}

function displayResult(resultString) {
  clearInterval(gameTimer);
  resultWindow = document.createElement("div");
  resultWindow.classList.add("result");
  gameContainer.appendChild(resultWindow);
  resultTitle = document.createElement("div");
  playAgain = document.createElement("button");
  resultTitle.innerHTML = resultString;
  playAgain.innerHTML = "Play Again";
  resultTitle.classList.add("result-title");
  playAgain.classList.add("play-again");
  resultWindow.appendChild(resultTitle);
  resultWindow.appendChild(playAgain);
  playAgain.addEventListener("click", resartGame);
  reset.style.display = "none";
}

function resartGame() {
  tilesContainer.classList.remove("disable-pointer");
  resultWindow.style.display = "none";
  resetGame();
}

function resetGame() {
  clearInterval(gameTimer);
  randomizeImagePositions();
  // console.log("resetGame", randomPositionsCollection);
  gameScore = 0;
  gameLives = 5;
  score.innerHTML = "0" + gameScore;
  lives.innerHTML = "0" + gameLives;
  gameSeconds = 0;
  gameMinutes = 2;
  seconds.innerHTML = ("0" + gameSeconds).slice(-2);
  minutes.innerHTML = "0" + gameMinutes;

  initialDelay = setTimeout(generatePairedImages, 1000);
  hideImages = setTimeout(toHidePairedImages, 3000);
  for (let i = 0; i < imageTiles.length; i++) {
    imageTiles[i].classList.remove("disable-pointer");
    imageTiles[i].src = "bg.jpg";
  }
}

let gameSeconds = 00;
let gameMinutes = 02;

function displayTimer() {
  console.log("in");
  gameTimer = setInterval(timer, 1000);
  function timer() {
    gameSeconds--;
    if (gameSeconds <= 0) {
      gameSeconds = 59;
      gameMinutes--;
    }
    minutes.innerHTML = "0" + gameMinutes;
    seconds.innerHTML = ("0" + gameSeconds).slice(-2);
    if (gameMinutes < 0) {
      minutes.innerHTML = "00";
      seconds.innerHTML = "00";
      displayResult("You Lost");
      clearInterval(gameTimer);
    }
  }
}

startGame();
reset.addEventListener("click", resetGame);
