function init() {

  //* DOM Elements
  const grid = document.querySelector('.grid')

  //* Grid Properties
  const width = 20
  const cellCount = width * width
  const cells = []

  //* Pac-Man Properties
  const startPosition = 0
  let currentPositon = 0
  const pacClass = 'yellow'
  const blockClass = 'blue'

  //* Movement Control Properties
  const left = 37
  const right = 39
  const up = 38
  const down = 40


  //* Log grid to DOM
  function createGrid(startPosition) {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.innerText = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    //? Spawn Pacman @ start
    addPac(startPosition)

    //? Spawn Block
    addBlock(3)
  }


  //* Spawn Blocks
  function addBlock(position) {
    cells[position].classList.add(blockClass)
  }

  //* Spawn Pac
  function addPac(position) {
    cells[position].classList.add(pacClass)
  }

  //* Remove Pac position
  function removePac(position) {
    cells[position].classList.remove(pacClass)
  }

  //! PAC MAN Movement

  //* Time ID to cancel and start intervals
  let id;

  //* Move pac right
  function pacRight() {
    clearInterval(id)
    id = setInterval(() => {
      removePac(currentPositon)
      if (currentPositon % width !== width - 1) {
        currentPositon++
      }
      addPac(currentPositon)
    }, 200)
  }

  //* Move pac left
  function pacLeft() {
    clearInterval(id)
    id = setInterval(() => {
      removePac(currentPositon)
      if (currentPositon % width !== 0) {
        currentPositon--
      }
      addPac(currentPositon)
    }, 200);
  }

  //* Move pac up
  function pacUp() {
    clearInterval(id)
    id = setInterval(() => {
      removePac(currentPositon)
      if (currentPositon >= width) {
        currentPositon -= width
      }
      addPac(currentPositon)
    }, 200);
  }

  //* Move pac down
  function pacDown() {
    clearInterval(id)
    id = setInterval(() => {
      removePac(currentPositon)
      if (currentPositon + width <= width * width - 1) {
        currentPositon += width
      }
      addPac(currentPositon)
    }, 200);
  }


  //* Move PacMan
  function movement(e) {
    const keyPress = e.keyCode
    removePac(currentPositon)
    if (keyPress === right && currentPositon % width !== width - 1) {
      pacRight()
    } else if (keyPress === left && currentPositon % width !== 0) {
      pacLeft()
    } else if (keyPress === up && currentPositon >= width) {
      pacUp()
    } else if (keyPress === down && currentPositon + width <= width * width - 1) {
      pacDown()
    } else {
      console.log('Wrong Key!');
    }

    console.log(currentPositon);
    addPac(currentPositon)
  }







  document.addEventListener('keydown', movement)
  createGrid(startPosition)



















}

window.addEventListener('DOMContentLoaded', init)