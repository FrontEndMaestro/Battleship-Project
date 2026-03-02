export default function renderGameboard(player) {
  const body = document.querySelector("body");
  const boardDiv = document.createElement("div");
  boardDiv.classList.add("game-board");
  boardDiv.id = player.type;
  player.gameBoard.board.forEach((row, x) => {
    row.forEach((cell, y) => {
      let gridCell = document.createElement("div");
      gridCell.classList.add("cell");
      gridCell.id = `${x}` +'-' +`${y}`;
      if (cell != -1)
        gridCell.textContent = cell;
      boardDiv.appendChild(gridCell);
    });
  });
  body.appendChild(boardDiv);
}
