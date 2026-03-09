import "./styles.css";
import placeHumanShips from "./placeShips";
import { placeComputerShip } from "./placeShips";
import renderGameboard from "./renderGameboard";
import gameBoard from "./Gameboard";
import Player from "./Player";
import { computerAttack, generateHitPosition } from "./Computer";

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("body").innerHTML = "";
  humanShipPlacement();

});

function humanShipPlacement() {
  let player1 = new Player("human", new gameBoard());
  placeHumanShips(player1);

  const body = document.querySelector("body");
  const randomizeBtn = document.createElement("button");
  const startGameBtn = document.createElement("button");
  startGameBtn.textContent = "Start";

  randomizeBtn.classList.add("random-btn");
  startGameBtn.classList.add("start-btn");

  randomizeBtn.innerHTML = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <g fill="#fc2b2a">
        <path d="M17 5h2v2h-2zM5 17h2v2H5zm6-14h2v6h-2zM9 1h2v8H9zm0 8h2v2H9zm10 8H9v2h10zM5 7H3v10h2z" />
        <path d="M13 15h-2v6h2zm2-2h-2v8h2zm0 8h-2v2h2zM5 5h10v2H5zm14 12h2V7h-2z" />
      </g>
    </svg>`;

  startGameBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#fc2b2a" d="M23.505 1.5v5.001h-1v2h-1v1h-1v-1h-1v-1h-1.001v-1h-1v-1h-1v-1h-1v-1h1v-1h2V1.5zM11.502 13.503v2h-1v1h-1v1h-1v1.001h-1v1H5.5v-2h1v-1h1v-1h1v-1h1v-1.001z"/><path fill="#fc2b2a" d="M19.504 9.502v-1h-1v-1h-1V6.5h-1v-1h-1v-1h-1.001v1h-1v1h-1v1h-1v1h-1.001v1H4.501v1h-1v1.001h-1v1H1.5v2h4v-1h1.001v-1h1v-1h1v-1h1v1h-1v1h-1v2h1v-1h1v-1h3.002v3.001h-1v1h-1.001v1h2v-1h1v-1h1.001v1h-1v1h-1v1h-1v1h-1.001v4.002h2v-1h1v-1h1.001v-1h1v-6.002h1v-1h1v-1h1v-1h1.001v-1.001h1v-1zm-2-1v2h-1v1h-2.001v-1h-1v-2h1v-1h2v1z"/></svg>`;
  body.appendChild(randomizeBtn);
  body.appendChild(startGameBtn);
  renderGameboard(player1);

  randomizeBtn.addEventListener("click", () => {
    const gridContainer = document.querySelector(".game-board");
    gridContainer.remove();
    player1.gameBoard.resetBoard();
    placeHumanShips(player1);
    renderGameboard(player1);
  });

  startGameBtn.addEventListener("click", () => {
    let player2 = new Player("Computer", new gameBoard());
    placeComputerShip(player2);
    //renderGameboard(player1);
    renderGameboard(player2);
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
      button.remove();
    });
    startGame(player1, player2);
  });
}

function startGame(player1, player2) {
  setEventListener(validateTurn, registerHit);
  let turn = player1.type;
  displayTurn(turn, player2.type);

  function changeTurn(playerType) {
    playerType == player1.type ? (turn = player2.type) : (turn = player1.type);
    displayTurn(turn, turn == player1.type ? player2.type : player1.type);
    if (turn == "Computer") {
      computerTurn(player2);
    }
  }

  function computerTurn(player2) {
    setTimeout(() => {
      let computerPosition = computerAttack(
        player2.gameBoard,
        generateHitPosition,
      ).reverse();
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
    if (!checkForWinner(player1, player2)) changeTurn(turn);
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
      return true;
    } else if (
      player2.gameBoard.ships.every((shipObject) => shipObject.ship.isSunk())
    ) {
      startNewGame("Player1 wins");
      return true;
    }
    return false;
  }

  function startNewGame(winMessage) {
    setTimeout(() => {
      alert(winMessage);

      let event = new Event("DOMContentLoaded");
      window.dispatchEvent(event);
    }, 2000);
    
  }
}
