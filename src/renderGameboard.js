export default function renderGameboard(player) {
  const body = document.querySelector("body");
  const boardDiv = document.createElement("div");
  boardDiv.classList.add("game-board");
  boardDiv.id = player.type;
  player.gameBoard.board.forEach((row, x) => {
    row.forEach((cell, y) => {
      let gridCell = document.createElement("div");
      gridCell.classList.add("cell");
      gridCell.id = `${x}` + "-" + `${y}`;
      if (cell != -1) gridCell.textContent = cell;
      markShipHit(gridCell);
      boardDiv.appendChild(gridCell);
    });
  });
  displayPlayerName(boardDiv);
  body.appendChild(boardDiv);
}

function markShipHit(cell) {
  if (cell.textContent == "O") {
    cell.classList.add("hit");
  }
}

function displayPlayerName(gridContainer) {
  let display = document.createElement("span");
  display.textContent =
    gridContainer.id.charAt(0).toUpperCase() + gridContainer.id.slice(1);
  display.classList.add("display-name");
  display.id = "display-" + gridContainer.id;
  gridContainer.appendChild(display);
}
