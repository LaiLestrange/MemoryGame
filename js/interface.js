'use strict'

let boardHTML = ''
let btnRst = ''

const BACKFACE = 'S'

document.addEventListener('DOMContentLoaded', () => {
  boardHTML = document.getElementById('board')
  startGame()

  btnRst = document.querySelector('.btnRst')
  btnRst.addEventListener('click', triggerRst)
})

function showBoard() {
  showMe('BOARD: ', BOARD)
  BOARD.forEach(card => {
    const cardSet = createEachSet(card.id)
    boardHTML.appendChild(cardSet)
  })
}

function updateDashboard() {
  document.getElementById('movesTotal').innerHTML = `${countMoves}`
}

function shuffleCards() {
  showMe('F: shuffleCards()')
  let currentIndex = BOARD.length
  let randomIndex

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[BOARD[currentIndex], BOARD[randomIndex]] = [
      BOARD[randomIndex],
      BOARD[currentIndex]
    ]
  }
}

function createEachSet(cardID) {
  const cardElement = document.createElement('div')
  cardElement.id = cardID
  cardElement.classList.add('cards')
  cardElement.classList.add('hover')
  cardElement.addEventListener('click', triggerFlip)

  const card = document.createElement('div')
  card.classList.add('card')
  card.classList.add('back')
  card.classList.add('hover')
  card.setAttribute('data-icon', BACKFACE)

  cardElement.appendChild(card)

  return cardElement
}

function triggerFlip(e) {
  unWrong()
  let cardFlipped = e.composedPath()[1]
  let cardFace = cardFlipped.children[0]
  if (countFlip == 0 || countFlip == 1) {
    if (!openedCards.includes(cardFlipped)) {
      if (!playedCards.includes(cardFlipped)) {
        if (cardFace.classList.contains('back')) {
          flip(cardFace, 'back')
          play(cardFlipped)
        }
      }
    }
  }
}

function flip(card, face) {
  let parentCard = card.parentElement
  let symbol = parentCard.id.substring(0, 1)
  switch (face) {
    case 'back':
      card.classList.replace(face, 'front')
      card.dataset.icon = symbol
      card.classList.remove('hover')
      parentCard.classList.remove('hover')
      break
    case 'front':
      card.classList.replace(face, 'back')
      card.dataset.icon = BACKFACE
      card.classList.add('hover')
      parentCard.classList.add('hover')
      break
  }
}

function blink(cards, isMatching) {
  let cardFace = ''

  switch (isMatching) {
    case true:
      cards.forEach(card => {
        cardFace = card.children[0]
        cardFace.classList.add('right')
      })
      break

    case false:
      cards.forEach(card => {
        cardFace = card.children[0]
        cardFace.classList.add('wrong')
        flip(cardFace, 'front')
      })
      break
  }
}

function unWrong() {
  let wrongs = document.querySelectorAll('.wrong')
  wrongs.forEach(wrong => {
    wrong.classList.remove('wrong')
  })
}

function endGame() {
  let allCards = JSON.stringify(document.querySelectorAll('.card'))
  let allRightCards = JSON.stringify(document.querySelectorAll('.right'))
  if (allCards == allRightCards) {
    boardHTML.classList.add('win')
    btnRst.classList.add('pressBtn')
  }
}

function triggerRst() {
  BOARD = []
  boardHTML.innerHTML = ''
  boardHTML.classList.remove('win')
  btnRst.classList.remove('pressBtn')
  countMoves = 0
  countFlip = 0
  openedCards = []
  playedCards = []

  startGame()
  updateDashboard()
}
