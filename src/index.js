import "./styles.css";
import newGame from "./newGame";
import renderGameboard from "./renderGameboard";
import gameBoard from './Gameboard'
import Player from "./Player";
let player1 = new Player("human", new gameBoard());

let player2 = new Player("computer", new gameBoard());
newGame(player1, player2);
renderGameboard(player1);
renderGameboard(player2);
