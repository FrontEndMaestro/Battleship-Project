import player  from "./Player";
export default function renderGameboard(player) {
  const boardDiv = document.createElement("div");
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let gridCell = document.createElement("div");
      gridCell.classList.add(itemcell);
      gridCell.id = `${x - y}`;
      boardDiv.appendChild(gridCell);
    }
  }
  player.gameBoard.ships.forEach(element);
}
