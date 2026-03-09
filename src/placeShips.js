import generateRandomPositons from "./randomPositions.js";

export default function placeHumanShips(player1) {
  for (let i = 0; i < 5; i++) {
    let posArr = generateRandomPositons(player1.gameBoard, i);
    player1.gameBoard.placeShips(posArr[0], posArr[1], i);
  }
}


export function placeComputerShip(player2){
   for (let i = 0; i < 5; i++) {
    let posArr = generateRandomPositons(player2.gameBoard, i);
    player2.gameBoard.placeShips(posArr[0], posArr[1], i);
  }

  return {player2}
}

