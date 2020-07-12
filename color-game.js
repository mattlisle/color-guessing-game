const nColorsHard = 6;
const nColorsEasy = 3;

const bodyColor = "#232323";
const headerColor = "steelblue";

const resetGiveUpText = "New Colors";
const resetAfterWinText = "Play Again";

let nColorsActive = nColorsHard;
let colors = generateColors(nColorsActive);

let squares = document.querySelectorAll(".square");
let colorDisplay = document.querySelector("#color-display");
let goalColor = pickColor();
let messageDisplay = document.querySelector("#message");
let h1 = document.querySelector("h1");
let resetButton = document.querySelector("#reset");

const buttonNodes = document.querySelectorAll(".difficulty-btn");
const difficultyButtons = [
  new DifficultyButton(buttonNodes[0], nColorsEasy),
  new DifficultyButton(buttonNodes[1], nColorsHard)
];

if (colors.length !== nColorsActive) throw new Error("Different number of colors vs. squares");

colorDisplay.textContent = goalColor;

setSquareColors();

for (square of squares) square.addEventListener(
  "click",
  function() {
    const clickedColor = this.style.backgroundColor;
    if (clickedColor === goalColor) {
      messageDisplay.textContent = "Correct!";
      resetButton.textContent = resetAfterWinText;
      setAllToWinningColor(clickedColor);
    } else {
      this.style.backgroundColor = bodyColor;
      messageDisplay.textContent = "Try again";
    }
  }  
);

resetButton.textContent = resetGiveUpText;

resetButton.addEventListener("click", resetGame);

difficultyButtons.forEach( button => {
  button.node.addEventListener(
    "click",
    function() {
      button.activate();
      difficultyButtons.forEach( other => {
        if (other.nColors !== nColorsActive) other.deactivate();
      });
    }
  )
});

function setAllToWinningColor(color) {
  for (square of squares) square.style.backgroundColor = color;
  h1.style.backgroundColor = color;
}

function pickColor() {
  const index = Math.floor(Math.random() * nColorsActive);
  return colors[index];
}

function generateColors(nColors) {
  let arr = Array(nColors).fill();
  return arr.map( _ => {
    let rgbArray = Array(3).fill().map(_ => Math.floor(Math.random() * 256));
    return `rgb(${rgbArray.join(", ")})`;
  });
}

function setSquareColors() {
  for (let i = 0; i < nColorsHard; i++) {
    if (i >= nColorsActive) {
      squares[i].style.display = "none";
    } else {
      squares[i].style.backgroundColor = colors[i];
      squares[i].style.display = "block";
    }
  }
}

function resetGame() {
  colors = generateColors(nColorsActive);
  goalColor = pickColor();
  colorDisplay.textContent = goalColor;
  setSquareColors();
  h1.style.backgroundColor = headerColor;
  resetButton.textContent = resetGiveUpText;
  messageDisplay.textContent = "";
}

function DifficultyButton(node, difficultyLevel) {
  this.node = node;
  this.nColors = difficultyLevel;
}

DifficultyButton.prototype.activate = function() {
  this.node.classList.add("selected");
  nColorsActive = this.nColors;
  resetGame();
}

DifficultyButton.prototype.deactivate = function() {
  this.node.classList.remove("selected");
}
