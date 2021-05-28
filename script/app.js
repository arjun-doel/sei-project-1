function init() {

  //! DOM Elements
  const grid = document.querySelector('.grid')

  //! Grid Properties
  const width = 20
  const cellCount = width * width
  const cells = []

  //! Pac-Man Properties
  const startPosition = 0
  let currentPositon = 0
  const pacClass = 'yellow'

  //! Movement Control Properties
  const left = 37
  const right = 39
  const up = 38
  const down = 40


  //! Log grid to DOM
  function createGrid(startPosition) {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.innerText = i
      cell[i].classList.add('blue')
      grid.appendChild(cell)
      cells.push(cell)
    }
    //? Spawn Pacman @ start
    addPac(startPosition)
  }

  console.log(cells);

  //! Spawn Pac
  function addPac(position) {
    cells[position].classList.add(pacClass)
  }

  // ! Remove Pac position
  function removePac(position) {
    cells[position].classList.remove(pacClass)
  }

  //! Move PacMan
  function movement(e) {
    const keyPress = e.keyCode
    removePac(currentPositon)
    if (keyPress === right && currentPositon % width !== width - 1) {
      currentPositon++
    } else if (keyPress === left && currentPositon % width !== 0){
      currentPositon--
    } else if (keyPress === up && currentPositon >= width){
      currentPositon -= width
    } else if (keyPress === down && currentPositon + width <= width * width - 1){
      currentPositon += width
    } else  {
      console.log('Wrong Key!');
    }


    addPac(currentPositon)
  }



  document.addEventListener('keydown', movement)
  createGrid(startPosition)



















}

window.addEventListener('DOMContentLoaded', init)