function init() {

  //* DOM Elements
  const grid = document.querySelector('.grid')

  //* Grid Properties
  const width = 20
  const cellCount = width * width
  const cells = []

  //* Pac-Man Properties
  const startPosition = 313
  let currentPositon = 313
  const pacRotLeft = 'pacman-left'
  // const pacRotRight = 'pacman-right'
  // const pacRotUp = 'pacman-up'
  // const pacRotDown = 'pacman-down'
  // const pacRotation = ['pacman-left', 'pacman-right', 'pacman-up', 'pacman-down']
  
  //* Block Properties
  const blockClass = 'block'
  const blockArray = [
    // Left Edge
    0,20,40,60,80,100,120,260,240,280,300,320,340,360,380,
    // Left Top Spacing
    241,242,243,223,203,202,201,200,
    // Left Bottom Spacing
    121,122,123,143,163,162,161,160,
    // Right Edge
    19,39,59,79,99,119,139,179,219,259,279,299,319,339,359,379,399,
    // Right Top Spacing
    138,137,136,156,176,177,178,
    // Right Bottom Spacing
    258,257,256,236,216,217,218,
    // Bottom border
    381,382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,
    // Top Border
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18
  ]

  //* Point Properties
  let score;
  const pointClass = 'points'
  const pointsArray = [107,108,109]


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

    //? Spawn Blocks
    addBlock(blockArray)

    //? Spawn Points
    spawnPoint(pointsArray)
  }



  //* Spawn Blocks
  function addBlock(index) {
    // cells[position].classList.add(blockClass)
    index.forEach(ite => cells[ite].classList.add(blockClass))
  }

  function spawnPoint(index) {
    // cells[position].classList.add(blockClass)
    index.forEach(ite => cells[ite].classList.add(pointClass))
  }

  //* Spawn Pac
  function addPac(position) {
    cells[position].classList.add(pacRotLeft)
  }

  //* Remove Pac position
  function removePac(position) {
    cells[position].classList.remove(pacRotLeft)
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
      addPoints(currentPositon)
    }, 150)
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
      addPoints(currentPositon)
    }, 150);
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
      addPoints(currentPositon)
    }, 150);
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
      addPoints(currentPositon)
    }, 150);
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
    addPac(currentPositon)
    
  }

  //* Add points
  function addPoints(pos) {

    if (cells[pos].classList.contains(pointClass)){
      console.log('SCORE 1');
    }
  }





  document.addEventListener('keydown', movement)
  createGrid(startPosition)



















}

window.addEventListener('DOMContentLoaded', init)

