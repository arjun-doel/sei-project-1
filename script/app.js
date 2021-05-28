function init() {

//! DOM Elements
const grid = document.querySelector('.grid')

// ! Grid Properties
const width = 20
const cellCount = width * width
const cells = []

// ! Pac-Man Properties
const startPosition = 0
let currentPositon = 0
const pacClass = 'yellow'

// ! Spawn Pac
function addPac(position) {
  cells[position].classList.add(pacClass)
}

// ! Log grid to DOM
function createGrid(startPosition){
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div')
    cell.innerText = i
    grid.appendChild(cell)
    cells.push(cell)
  }

  //? Spawn Pacman @ start
  addPac(startPosition)
}

// ! Move PacMan
function



document.addEventListener('keydown', movement)
createGrid(startPosition)



















}

window.addEventListener('DOMContentLoaded', init)