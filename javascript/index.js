const box = document.querySelectorAll(".content-box");
const game = document.getElementById("game");
const playerX = document.getElementById("player-x");
const playerO = document.getElementById("player-o");
const playerOne = document.getElementById("player-one");
const nameplayerOne = document.getElementById("name-player-one");
const playerTwo = document.getElementById("player-two");
const nameplayerTwo = document.getElementById("name-player-two");
const continueGame = document.getElementById("continue");
const inputName = document.querySelectorAll(".input-name");
const cardWarining = document.getElementById("card-warining");
const startGame = document.getElementById("start-game");
const winnerPage = document.getElementById("winner");
let winnerName = document.getElementById("winner-name");
const gameOver = document.getElementById("game-over");
const playAgain = document.getElementById("play-again");
const tryAgain = document.getElementById("try-again");
const changeName = document.querySelectorAll(".change-name");
const namePlayerOne = localStorage.getItem("name-player-one");
const namePlayerTwo = localStorage.getItem("name-player-two");
let imgBlue = document.getElementById("img-blue");
let imgRed = document.getElementById("img-red");
let boxArray = [];
let currentBox = "x";
const imgBluee = imgBlue;
const imgRedd = imgRed;
console.log("element", imgRed);
let leftPositionBlue = 0;
let topPositionBlue = 0;
let leftPositionRed = 0;
let topPositionRed = 0;
while (imgBlue) {
  leftPositionBlue += imgBlue.offsetLeft;
  topPositionBlue += imgBlue.offsetTop;
  imgBlue = imgBlue.offsetParent;
}
while (imgRed) {
  leftPositionRed += imgRed.offsetLeft;
  topPositionRed += imgRed.offsetTop;
  imgRed = imgRed.offsetParent;
}
/*         name player one        */
playerOne.addEventListener("change", () => {
  const namePlayer = playerOne.value;
  localStorage.setItem("name-player-one", namePlayer);
  nameplayerOne.textContent = namePlayer;
});

/*         name player two        */
playerTwo.addEventListener("change", () => {
  const namePlayer = playerTwo.value;
  localStorage.setItem("name-player-two", namePlayer);
  nameplayerTwo.textContent = namePlayer;
});
/*          Button Continue      */

continueGame.addEventListener("click", () => {
  if (
    playerOne.value != "" &&
    playerOne.value != null &&
    playerTwo.value != "" &&
    playerTwo.value != null
  ) {
    startGame.style.display = "none";
  } else {
    cardWarining.style.cssText = "display: flex";
    inputName.forEach((value) => {
      if (value.value === ""){ 
        value.classList.add("warining")
      };
      setTimeout(() => {
        cardWarining.style.cssText = "display: none";
      }, 2000);
    });
  }
});

/*          Function Display     */
function display() {
  box.forEach((element) => {
    element.addEventListener("click", (event) => {
      const value = element.getAttribute("value");
      const index = value - 1;
      const boxContent = document.querySelector(
        `.content-box[value="${value}"]`
      );

      boxArray[index] = currentBox;
      winner(); /* <------ call function Winner    */
      if (currentBox === "x" && boxContent.innerHTML === "") {
        imgBluee.style.cssText = `position : absolute; left : ${
          event.x - leftPositionBlue - 20
        }px; top:${event.y - topPositionBlue}px; transform: scale(.8);`;
        imgRedd.style.cssText = "position : static; transform: scale(1);";
        boxContent.innerHTML = currentBox;
        boxContent.style.color = "#335995";
        currentBox = "o";
        playerX.style.cssText="background-color :rgb(255,255,255)";
        playerO.style.cssText="background-color :rgb(255,255,255 , 70%)";
      } else if (currentBox === "o" && boxContent.innerHTML === "") {
        imgRedd.style.cssText = `position : absolute; left : ${
          event.x - leftPositionRed + 20
        }px; top:${event.y - topPositionRed}px; transform: scale(.8);`;
        imgBluee.style.cssText = "position : static; transform: scale(1);";
        boxContent.innerHTML = currentBox;
        boxContent.style.color = "#ec1c24";
        currentBox = "x";
        playerO.style.cssText="background-color :rgb(255,255,255)";
        playerX.style.cssText="background-color :rgb(255,255,255 , 70%)"
      }
    });
  });
}
display();

/*               function winner            */
function winner() {
  if (
    (boxArray[0] === boxArray[1] &&
      boxArray[0] === boxArray[2] &&
      boxArray[0] !== undefined) ||
    (boxArray[3] === boxArray[4] &&
      boxArray[3] === boxArray[5] &&
      boxArray[3] !== undefined) ||
    (boxArray[6] === boxArray[7] &&
      boxArray[6] === boxArray[8] &&
      boxArray[7] !== undefined) ||
    (boxArray[0] === boxArray[3] &&
      boxArray[0] === boxArray[6] &&
      boxArray[0] !== undefined) ||
    (boxArray[1] === boxArray[4] &&
      boxArray[1] === boxArray[7] &&
      boxArray[1] !== undefined) ||
    (boxArray[2] === boxArray[5] &&
      boxArray[2] === boxArray[8] &&
      boxArray[5] !== undefined) ||
    (boxArray[0] === boxArray[4] &&
      boxArray[0] === boxArray[8] &&
      boxArray[8] !== undefined) ||
    (boxArray[2] === boxArray[4] &&
      boxArray[2] === boxArray[6] &&
      boxArray[4] !== undefined)
  ) {
    let winnerPlayer = currentBox === "x" ? "x" : "o";
    if (winnerPlayer === "x") {
      winnerName.textContent = nameplayerOne.textContent;
      winnerPage.classList.add("active");
    } else if (winnerPlayer === "o") {
      winnerName.textContent = nameplayerTwo.textContent;
      winnerPage.classList.add("active");
    }
  } else if (boxArray.length === 9) {
    let isGameOver = true;
    for (let i = 0; i < boxArray.length; i++) {
      if (boxArray[i] !== "x" && boxArray[i] !== "o") {
        isGameOver = false;
      }
    }
    if (isGameOver) {
      gameOver.classList.add("active");
    }
  }
}

/*               Play Again                  */
playAgain.addEventListener("click", function () {
  startGame.style.display = "none";
  localStorage.setItem("startGameHidden", "true");
  location.reload();
});

/*               Try Again                  */
tryAgain.addEventListener("click", function () {
  startGame.style.display = "none";
  localStorage.setItem("startGameHidden", "true");
  location.reload();
});
window.addEventListener("DOMContentLoaded", function () {
  var startGameHidden = localStorage.getItem("startGameHidden");
  if (startGameHidden === "true") {
    startGame.style.display = "none";
  }
});

changeName.forEach((change) => {
  change.addEventListener("click", function () {
    localStorage.setItem("startGameHidden", "false");
    location.reload();
  });
});
nameplayerOne.textContent = namePlayerOne;
nameplayerTwo.textContent = namePlayerTwo;
