import "./styles.css";
import newGame from "./newGame";
import renderGameboard from "./renderGameboard";
import gameBoard from "./Gameboard";
import Player from "./Player";
import { computerAttack } from "./Computer";

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("body").innerHTML = "";
  let { player1, player2 } = newGame();
  renderGameboard(player1);
  renderGameboard(player2);
  startGame(player1, player2);
});

function startGame(player1, player2) {
  setEventListener(validateTurn, registerHit);
  let turn = player1.type;
  displayTurn(turn, player2.type);

  function changeTurn(playerType) {
    playerType == player1.type ? (turn = player2.type) : (turn = player1.type);
    displayTurn(turn, turn == player1.type ? player2.type : player1.type);
    if (turn == "computer") {
      computerTurn(player2);
    }
  }

  function computerTurn(player2) {
    setTimeout(() => {
      let computerPosition = computerAttack(player2.gameBoard).reverse();
      registerHit(computerPosition.join("-"), player1);
    }, 2000);
  }

  function updateBoards() {
    document.querySelector("body").innerHTML = "";
    renderGameboard(player1);
    renderGameboard(player2);
    setEventListener(validateTurn, registerHit);
  }

  function registerHit(coordinates, player) {
    //reverse to convert into x and y format
    let coordinateArray = coordinates.split("-").reverse();
    player.gameBoard.receiveAttack(coordinateArray[0], coordinateArray[1]);
    updateBoards();
    checkForWinner(player1, player2);
    changeTurn(turn);
  }

  function setEventListener(validateTurn, registerHit) {
    let gridCell = document.querySelectorAll(`#${player2.type} > .cell`);

    gridCell.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        if (
          checkDuplicateHit(cell) &&
          validateTurn(e.target.parentElement.id)
        ) {
          registerHit(e.target.id, player2);
        }
      });
    });
  }

  function checkDuplicateHit(cell) {
    if (cell.textContent == "X" || cell.textContent == "O") {
      return false;
    }
    return true;
  }

  function validateTurn(gridId) {
    if (gridId != turn) {
      return true;
    }
    return false;
  }

  function displayTurn(turn, playerWithoutTurn) {
    const playerBoard = document.querySelector(`#${turn}`);
    const playerWatching = document.querySelector(`#${playerWithoutTurn}`);
    const playerDisplay = document.querySelector(`#display-${turn}`);
    const playerWatchingDisplay = document.querySelector(
      `#display-${playerWithoutTurn}`,
    );
    if (playerWatching.classList.contains("current-turn")) {
      playerWatchingDisplay.classList.remove("highlight-name");
      playerBoard.classList.remove("current-turn");
    }

    playerWatching.classList.add("current-turn");
    playerDisplay.classList.add("highlight-name");
  }

  function checkForWinner(player1, player2) {
    if (
      player1.gameBoard.ships.every((shipObject) => shipObject.ship.isSunk())
    ) {
      startNewGame("Player2 wins");
    } else if (
      player2.gameBoard.ships.every((shipObject) => shipObject.ship.isSunk())
    ) {
      startNewGame("Player1 wins");
    }
  }

  function startNewGame(winMessage) {
    setTimeout(() => {
      alert(winMessage);
    }, 2000);
    setTimeout(() => {
      let event = new Event("DOMContentLoaded");
      window.dispatchEvent(event);
    }, 2000);
  }
}
