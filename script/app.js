function init() {

  //* DOM Elements
  const grid = document.querySelector('.grid')

  //* Grid Properties
  const width = 20
  const cellCount = width * width
  const cells = []

  //* Pac-Man Properties
  const startPosition = 251
  let currentPositon = 251
  const pacRotLeft = 'pacman-left'
  const pacRotRight = 'pacman-right'
  const pacRotUp = 'pacman-up'
  const pacRotDown = 'pacman-down'
  // const pacRotation = ['pacman-left', 'pacman-right', 'pacman-up', 'pacman-down']

  //* Ghost Properties
  const ghost1 = 'ghost1'
  const ghost2 = 'ghost2'
  const ghost3 = 'ghost3'
  const ghost4 = 'ghost4'
  const ghost1Start = 209
  const ghost2Start = 210
  const ghost3Start = 189
  const ghost4Start = 190

  //* Block Properties
  const blockClass = 'block'
  const blockArray = [
    // Left Edge
    0, 20, 40, 60, 80, 100, 120, 260, 240, 280, 300, 320, 340, 360, 380,
    // Left Top Spacing
    241, 242, 222, 202, 201, 200,
    // Left Bottom Spacing
    121, 122, 142, 162, 161, 160,
    // Right Edge
    19, 39, 59, 79, 99, 119, 139, 179, 219, 259, 279, 299, 319, 339, 359, 379, 399,
    // Right Top Spacing
    138, 137, 157, 177, 178,
    // Right Bottom Spacing
    258, 257, 237, 217, 218,
    // Bottom border
    381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398,
    // Top Border
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
    // Bottom Right blocks
    282, 302, 322, 342,
    // Bottom Left blocks
    297, 317, 337, 357,
    // Box
    167, 168, 171, 172,
    // Box Left Edge
    187, 207, 227,
    // Box Bottom
    228, 229, 230, 231,
    // Box Right Edge
    192, 212, 232,
    // Box outer edge left
    204, 184, 185, 205, 224, 225,
    // Box outer edge right
    194, 195, 214, 215, 234, 235,
    // Top left blocks
    42, 62, 82,
    // Top right blocks
    57, 77, 97,
    // Top T
    49, 50, 69, 70, 89, 90, 129, 130,
    // Bottom left L
    264, 284, 304, 305, 306, 307,
    // Bottom right L
    275, 295, 315, 313, 312, 314,
    // Top right L
    112, 92, 72, 73, 74, 75, 32, 35,
    // Top left L
    107, 87, 67, 66, 65, 64, 27, 24,
    // Bottom T
    350, 349, 330, 329, 349, 309, 310,
    // Top left square
    124, 125, 144, 145, 104, 105,
    // Top right square
    134, 135, 154, 155, 114, 115,
    // Inside bottom Ls
    267, 268, 269, 270, 271, 272, 266, 273,
    // Bottom left line
    344, 345, 346, 347,
    // Bottom left line
    352, 353, 354, 355,

  ]


  //* Point Properties
  let score = 0
  const scoreDOM = document.querySelector('.score')
  const highScore = document.querySelector('.high-score')
  const pointChild = `<i class="fas fa-circle"></i>`


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
    addPac(startPosition, pacRotLeft)
    
    //? Spawn Ghosts
    spawnGhost(ghost1Start, ghost1)
    spawnGhost(ghost2Start, ghost2)
    spawnGhost(ghost3Start, ghost3)
    spawnGhost(ghost4Start, ghost4)

    //? Spawn Blocks
    addBlock(blockArray)

    //? Spawn Points
    spawnPoint()

    //? Show localStorage
    getLocalStorage()
  }
  //* Call grid function, creates grid on DOM 
  createGrid(startPosition)







  //* Spawn Blocks
  function addBlock(index) {
    index.forEach(ite => cells[ite].classList.add(blockClass))
  }

  //* Spawn Points
  function spawnPoint() {
    cells.forEach(ite => {
      if (!ite.classList.contains(blockClass)) {
        ite.innerHTML = pointChild
      }
    })
  }



  //* Spawn Pac
  function addPac(position, rotation) {
    cells[position].classList.add(rotation)
  }

  //* Remove Pac position
  function removePac(position) {
    cells[position].classList.remove(pacRotLeft, pacRotRight, pacRotDown, pacRotUp)
  }

  //* Spawn Ghosts
  function spawnGhost(position, ghost){
    cells[position].classList.add(ghost)
  }

  //! PAC MAN Movement

  //* Time ID to cancel and start intervals
  let id;

  //* Move pac right
  function pacRight() {
    clearInterval(id)
    id = setInterval(() => {
      removePac(currentPositon)
      // && currentPositon +1 !== 357
      if (currentPositon % width !== width - 1 && !cells[currentPositon + 1].classList.contains(blockClass)) {
        currentPositon++
      }
      addPac(currentPositon, pacRotRight)
      addPoints(currentPositon)
    }, 120)
  }

  //* Move pac left
  function pacLeft() {
    clearInterval(id)
    id = setInterval(() => {
      removePac(currentPositon)
      if (currentPositon % width !== 0 && !cells[currentPositon - 1].classList.contains(blockClass)) {
        currentPositon--
      }
      addPac(currentPositon, pacRotLeft)
      addPoints(currentPositon)
    }, 120);
  }

  //* Move pac up
  function pacUp() {
    clearInterval(id)
    id = setInterval(() => {
      removePac(currentPositon)
      if (currentPositon >= width && !cells[currentPositon - width].classList.contains(blockClass)) {
        currentPositon -= width
      }
      addPac(currentPositon, pacRotUp)
      addPoints(currentPositon)
    }, 120);
  }

  //* Move pac down
  function pacDown() {
    clearInterval(id)
    id = setInterval(() => {
      removePac(currentPositon)
      if (currentPositon + width <= width * width - 1 && !cells[currentPositon + width].classList.contains(blockClass)) {
        currentPositon += width
      }
      addPac(currentPositon, pacRotDown)
      addPoints(currentPositon)
    }, 120);
  }


  //* Move PacMan
  function movement(e) {
    const keyPress = e.keyCode

    removePac(currentPositon)
    if (keyPress === right && currentPositon % width !== width - 1 && currentPositon !== 357) {
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
    const i = document.querySelectorAll('i')
    if (cells[pos].innerHTML === pointChild) {
      score += 10
      scoreDOM.innerHTML = score
      // cells[pos].node.removeChild(pointChild)
      cells[pos].innerHTML = ''
    }
    addToLocalStorage(score)
  }

  //* Set Local Storage
  function addToLocalStorage(value) {
    const getCurrentScore = localStorage.getItem("pac-man-score")
    if (value > getCurrentScore) {
      localStorage.setItem("pac-man-score", score)
      highScore.innerHTML = localStorage.getItem("pac-man-score")
    } else {
      highScore.innerHTML = localStorage.getItem("pac-man-score")
    }
  }

  //* Get Local Storage
  function getLocalStorage(){
    highScore.innerHTML = localStorage.getItem("pac-man-score")
  }






  document.addEventListener('keydown', movement)




















}

window.addEventListener('DOMContentLoaded', init)
