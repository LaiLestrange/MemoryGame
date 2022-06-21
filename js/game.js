'use strict'

let SYMBOLS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
let BOARD = []

// TO BE REFACTORED
let countMoves = 0
let countFlip = 0 // ou 1

let openedCards = []
let playedCards = []

function startGame() {
  createBoard()
  shuffleCards()
  showBoard()
}

function createBoard() {
  if (BOARD.length == 0) {
    createPairs()
  }
}

function createPairs() {
  SYMBOLS.forEach(symbol => {
    for (let i = 1; i <= 2; i++) {
      let card = createCards(symbol)
      BOARD.push(card)
    }
  })
}

function createCards(iconCard) {
  let idCard = generateID(iconCard)
  return { id: idCard, icon: iconCard }
}

function generateID(i) {
  let randomPart = parseInt(Math.random() * 1000)
  if (randomPart < 100) {
    randomPart = randomPart * 100
  }
  let newID = i + randomPart
  return newID
}

function shuffleCards() {
  // shuffle cards
}

function play(newFlip) {
  switch (countFlip) {
    case 0:
      playedCards.push(newFlip)
      countFlip = 1
      break
    case 1:
      playedCards.push(newFlip)
      countMoves++
      countFlip = 2
      updateDashboard()
      let isMatching = isPairMatching()
      setTimeout(newPlay, 500, isMatching)

      break
  }
}

function isPairMatching() {
  let card1 = playedCards[0]
  let card2 = playedCards[1]
  let match = false
  SYMBOLS.forEach(symbol => {
    if (card1.id.startsWith(symbol) && card2.id.startsWith(symbol)) {
      match = true
    }
  })
  return match
}

function newPlay(isMatching) {
  if (isMatching) {
    playedCards.forEach(card => {
      openedCards.push(card)
    })
  }

  blink(playedCards, isMatching)
  playedCards = []
  countFlip = 0
  endGame()
}
