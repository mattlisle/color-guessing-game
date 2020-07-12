const nColorsHard = 6
const nColorsEasy = 3

const bodyColor = '#232323'
const headerColor = 'steelblue'

const resetGiveUpText = 'New Colors'
const resetAfterWinText = 'Play Again'

let nColorsActive = nColorsHard
let colors = generateColors(nColorsActive)

const squares = document.querySelectorAll('.square')
const colorDisplay = document.querySelector('#color-display')
let goalColor = pickColor()
const messageDisplay = document.querySelector('#message')
const h1 = document.querySelector('h1')
const resetButton = document.querySelector('#reset')

const buttonNodes = document.querySelectorAll('.difficulty-btn')
const difficultyButtons = [
  new DifficultyButton(buttonNodes[0], nColorsEasy),
  new DifficultyButton(buttonNodes[1], nColorsHard)
]

init()

function init () {
  if (colors.length !== nColorsActive) throw new Error('Different number of colors vs. squares')

  colorDisplay.textContent = goalColor

  setSquareColors()

  squares.forEach(square => {
    square.addEventListener(
      'click',
      function () {
        const clickedColor = this.style.backgroundColor
        if (clickedColor === goalColor) {
          messageDisplay.textContent = 'Correct!'
          resetButton.textContent = resetAfterWinText
          setAllToWinningColor(clickedColor)
        } else {
          this.style.backgroundColor = bodyColor
          messageDisplay.textContent = 'Try again'
        }
      }
    )
  })

  resetButton.textContent = resetGiveUpText

  resetButton.addEventListener('click', resetGame)

  difficultyButtons.forEach(button => {
    button.node.addEventListener(
      'click',
      function () {
        button.activate()
        difficultyButtons.forEach(other => {
          if (other.nColors !== nColorsActive) other.deactivate()
        })
      }
    )
  })
}

function setAllToWinningColor (color) {
  squares.forEach(square => { square.style.backgroundColor = color })
  h1.style.backgroundColor = color
}

function pickColor () {
  const index = Math.floor(Math.random() * nColorsActive)
  return colors[index]
}

function generateColors (nColors) {
  const arr = Array(nColors).fill()
  return arr.map(_ => {
    const rgbArray = Array(3).fill().map(_ => Math.floor(Math.random() * 256))
    return `rgb(${rgbArray.join(', ')})`
  })
}

function setSquareColors () {
  for (let i = 0; i < nColorsHard; i++) {
    if (i >= nColorsActive) {
      squares[i].style.display = 'none'
    } else {
      squares[i].style.backgroundColor = colors[i]
      squares[i].style.display = 'block'
    }
  }
}

function resetGame () {
  colors = generateColors(nColorsActive)
  goalColor = pickColor()
  colorDisplay.textContent = goalColor
  setSquareColors()
  h1.style.backgroundColor = headerColor
  resetButton.textContent = resetGiveUpText
  messageDisplay.textContent = ''
}

function DifficultyButton (node, difficultyLevel) {
  this.node = node
  this.nColors = difficultyLevel
}

DifficultyButton.prototype.activate = function () {
  this.node.classList.add('selected')
  nColorsActive = this.nColors
  resetGame()
}

DifficultyButton.prototype.deactivate = function () {
  this.node.classList.remove('selected')
}
