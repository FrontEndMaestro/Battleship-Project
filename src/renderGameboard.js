export default function renderGameboard(player) {
  const body = document.querySelector("body");
  const boardDiv = document.createElement("div");
  boardDiv.classList.add("game-board");
  boardDiv.id = player.type;
  player.gameBoard.board.forEach((row, y) => {
    row.forEach((cell, x) => {
      let gridCell = document.createElement("div");
      gridCell.classList.add("cell");

      gridCell.id = `${x}` + "-" + `${y}`;

      if (player.type != "Computer")
        if (cell != -1 && cell != "X") {
          gridCell.classList.add("ship-cell");
        }
      if (cell == "X") {
        gridCell.classList.add("missed-shot");
      }
      markShipHit(gridCell, player.gameBoard);
      boardDiv.appendChild(gridCell);
    });
  });

  displayPlayerName(boardDiv);
  body.appendChild(boardDiv);
}

function markShipHit(cell, gameboard) {
  let id = cell.id.split("-");
  if (gameboard.board[id[1]][id[0]] == "O") {
    cell.classList.add("hit");
  }
}

function displayPlayerName(gridContainer) {
  let display = document.createElement("span");
 if(gridContainer.id.charAt(0).toUpperCase() + gridContainer.id.slice(1)=='Human'){
    display.textContent="Your fleet"
    display.classList.add("green-color")
  }

  else{
    display.classList.add("red-color")
    display.textContent="Enemy Waters"
  }
 display.classList.add("display-name");
  display.id = "display-" + gridContainer.id;
  gridContainer.appendChild(display);
}
