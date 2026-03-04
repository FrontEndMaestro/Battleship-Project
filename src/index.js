import "./styles.css";
import newGame from "./newGame";
import renderGameboard from "./renderGameboard";
import gameBoard from "./Gameboard";
import Player from "./Player";

window.addEventListener("DOMContentLoaded", () => {
  let { player1, player2 } = newGame();
  renderGameboard(player1);
  renderGameboard(player2);
  startGame(player1, player2);
});

function startGame(player1, player2) {
  setEventListener(player1, player2, validateTurn, registerHit);
  let turn = player1.type;
  displayTurn(turn, player2.type);

  function changeTurn(playerType) {
    playerType == player1.type ? (turn = player2.type) : (turn = player1.type);
    displayTurn(turn, turn == player1.type ? player2.type : player1.type);
  }

  function updateBoards() {
    document.querySelector("body").innerHTML = "";
    renderGameboard(player1);
    renderGameboard(player2);
    setEventListener(player1, player2, validateTurn, registerHit);
  }

  function registerHit(coordinates, player) {
    //reverse to convert into x and y format
    let coordinateArray = coordinates.split("-").reverse();
    player.gameBoard.receiveAttack(coordinateArray[0], coordinateArray[1]);
    updateBoards();
  }

  function setEventListener(player1, player2, validateTurn, registerHit) {
    let gridCell = document.querySelectorAll(".cell");
    gridCell.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        if (validateTurn(e.target.parentElement.id)) {
          let currentPlayer =
            e.target.parentElement.id == player1.type ? player1 : player2;
          registerHit(e.target.id, currentPlayer);
          checkForWinner(player1, player2);
          changeTurn(turn);
        }
      });
    });
  }

  function validateTurn(gridId) {
    if (gridId != turn) {
      return true;
    }
    return false;
  }

  function displayTurn(turn, playerWithoutTurn) {
    //console.log("turn is", turn, "player without turn is", playerWithoutTurn);
    const playerBoard = document.querySelector(`#${turn}`);
    const playerWatching = document.querySelector(`#${playerWithoutTurn}`);
    if (playerWatching.classList.contains("current-turn")) {
      playerWatching.classList.remove("current-turn");
    }

    playerBoard.classList.add("current-turn");
  }

  function checkForWinner(player1, player2) {
    if (
      player1.gameBoard.ships.every((shipObject) => shipObject.ship.isSunk())
    ) {
      alert("Player2 wins");
    } else if (
      player2.gameBoard.ships.every((shipObject) => shipObject.ship.isSunk())
    ) {
      alert("Player1 wins");
    }
  }
}
