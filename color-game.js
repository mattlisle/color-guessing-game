
const ColorGame = (function () {
  'use strict'

  const settings = {
    nColorsHard: 6,
    nColorsEasy: 3,
    bodyColor: '#232323',
    headerColor: 'steelblue',
    resetGiveUpText: 'New Colors',
    resetAfterWinText: 'Play Again',
    squares: document.querySelectorAll('.square'),
    colorDisplay: document.querySelector('#color-display'),
    messageDisplay: document.querySelector('#message'),
    gameHeader: document.querySelector('h1')
  }

  Object.freeze(settings)

  const state = new GameState()

  const resetButton = document.querySelector('#reset')

  const difficultyButtons = (function () {
    const buttonNodes = document.querySelectorAll('.difficulty-btn')
    return [
      new DifficultyButton(buttonNodes[0], settings.nColorsEasy),
      new DifficultyButton(buttonNodes[1], settings.nColorsHard)
    ]
  })()

  function init () {
    if (state.colors.length !== settings.nColorsHard) {
      throw new Error('Different number of colors vs. squares')
    }

    state.pickColor()

    settings.colorDisplay.textContent = state.goalColor

    setSquareColors()

    resetButton.textContent = settings.resetGiveUpText

    bindUiActions()
  }

  function GameState () {
    this.nColorsActive = settings.nColorsHard
    this.colors = generateColors(settings.nColorsHard)
    this.goalColor = undefined
  }

  GameState.prototype.pickColor = function () {
    const index = Math.floor(Math.random() * this.nColorsActive)
    this.goalColor = this.colors[index]
  }

  function bindUiActions () {
    settings.squares.forEach(square => {
      square.addEventListener(
        'click',
        function () {
          const clickedColor = this.style.backgroundColor
          if (clickedColor === state.goalColor) {
            settings.messageDisplay.textContent = 'Correct!'
            resetButton.textContent = settings.resetAfterWinText
            setAllToWinningColor(clickedColor)
          } else {
            this.style.backgroundColor = settings.bodyColor
            settings.messageDisplay.textContent = 'Try again'
          }
        }
      )
    })

    resetButton.addEventListener('click', resetGame)

    difficultyButtons.forEach(button => {
      button.node.addEventListener(
        'click',
        function () {
          button.activate()
          difficultyButtons.forEach(other => {
            if (other.nColors !== state.nColorsActive) other.deactivate()
          })
        }
      )
    })
  }

  function setAllToWinningColor (color) {
    settings.squares.forEach(square => { square.style.backgroundColor = color })
    settings.gameHeader.style.backgroundColor = color
  }

  function generateColors (nColors) {
    const arr = Array(nColors).fill()
    return arr.map(_ => {
      const rgbArray = Array(3).fill().map(_ => Math.floor(Math.random() * 256))
      return `rgb(${rgbArray.join(', ')})`
    })
  }

  function setSquareColors () {
    for (let i = 0; i < settings.nColorsHard; i++) {
      if (i >= state.nColorsActive) {
        settings.squares[i].style.display = 'none'
      } else {
        settings.squares[i].style.backgroundColor = state.colors[i]
        settings.squares[i].style.display = 'block'
      }
    }
  }

  function resetGame () {
    state.colors = generateColors(state.nColorsActive)
    state.pickColor()
    settings.colorDisplay.textContent = state.goalColor
    setSquareColors()
    settings.gameHeader.style.backgroundColor = settings.headerColor
    resetButton.textContent = settings.resetGiveUpText
    settings.messageDisplay.textContent = ''
  }

  function DifficultyButton (node, difficultyLevel) {
    this.node = node
    this.nColors = difficultyLevel
  }

  DifficultyButton.prototype.activate = function () {
    this.node.classList.add('selected')
    state.nColorsActive = this.nColors
    resetGame()
  }

  DifficultyButton.prototype.deactivate = function () {
    this.node.classList.remove('selected')
  }

  return {
    init: init
  }
})()

ColorGame.init()
