import player from "./Player.js";
import gameBoard from "./Gameboard.js";
import renderGameboard from "./renderGameboard.js";

export default function newGame() {
  let player1 = new player("human", new gameBoard());
  player1.gameBoard.placeShips([5, 5], [9, 5], 0);
  player1.gameBoard.placeShips([5, 7], [8, 7], 1);
  player1.gameBoard.placeShips([0, 0], [0, 2], 3);
  player1.gameBoard.placeShips([2, 8], [4, 8], 2);
  player1.gameBoard.placeShips([1, 5], [1, 6], 4);
  //renderGameboard(player1);

  let player2 = new player("computer", new gameBoard());
  player2.gameBoard.placeShips([5, 5], [9, 5], 0);
  player2.gameBoard.placeShips([5, 7], [8, 7], 1);
  player2.gameBoard.placeShips([0, 0], [0, 2], 3);
  player2.gameBoard.placeShips([2, 8], [4, 8], 2);
  player2.gameBoard.placeShips([1, 5], [1, 6], 4);
  //renderGameboard(player2);
}
