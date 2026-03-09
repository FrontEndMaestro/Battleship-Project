import ship from "./ship.js";
export default class Gameboard {
  ships = [];
  missedShotsCoordinates = [];

  constructor() {
    this.board = Array.from({ length: 10 }, () => new Array(10).fill(-1));
    this.ships = this.initializeShips();
  }

  initializeShips() {
    let sizes = [5, 4, 3, 3, 2];
    let ships = [];
    for (let i = 0; i < 5; i++) {
      ships.push({ ship: new ship(sizes[i]), position: [], id: i });
    }
    return ships;
  }

  placeShips(startPosition, endPosition, shipID) {
    if (shipID >= 5) throw Error("Incorrect ship");

    if (this.checkCoordinateValidity(startPosition, endPosition, shipID)) {
      this.ships[shipID].position.push(startPosition);
      this.ships[shipID].position.push(endPosition);
      this.updateBoard(startPosition, endPosition, shipID);
      return true;
    }

    return false;
  }

  getAllCoordinates(startPosition, endPosition, shipID) {
    let numOfCells = this.ships[shipID].ship.getLength();
    let allCoordinates = [];
    if (startPosition[0] == endPosition[0]) {
      //vertical alignment
      for (let i = 0; i < numOfCells; i++) {
        allCoordinates.push([startPosition[0], startPosition[1] + i]);
      }
    } else if (startPosition[1] == endPosition[1]) {
      //horizontal alignment
      for (let i = 0; i < numOfCells; i++) {
        allCoordinates.push([startPosition[0] + i, startPosition[1]]);
      }
    }

    return allCoordinates;
  }

  updateBoard(startPosition, endPosition, shipID) {
    let allCoordinates = this.getAllCoordinates(
      startPosition,
      endPosition,
      shipID,
    );

    allCoordinates.forEach((coordinate) => {
      this.board[coordinate[1]][coordinate[0]] = shipID;
    });
  }

  checkCoordinateValidity(startPosition, endPosition, shipID) {
    let allCoordinates = this.getAllCoordinates(
      startPosition,
      endPosition,
      shipID,
    );

    let shipLength = this.ships[shipID].ship.getLength();
    if (
      startPosition.every((value) => value < 10 && value >= 0) &&
      endPosition.every((value) => value < 10 && value >= 0)
    ) {
      if (
        Math.abs(startPosition[0] - endPosition[0]) + 1 == shipLength ||
        Math.abs(startPosition[1] - endPosition[1]) + 1 == shipLength
      ) {
        if (this.areCoordinatesEmpty(allCoordinates)) {
          return true;
        }
      }
    }
    return false;
  }

  areCoordinatesEmpty(allCoordinates) {
    return allCoordinates.every(
      (coordinates) => this.board[coordinates[1]][coordinates[0]] == -1,
    );
  }

  attackHit(x, y) {
    return this.ships.findIndex((element) => {
      if (element.position.length != 0) {
        return (
          (element.position[0][0] == x && element.position[0][1] == y) ||
          (element.position[1][0] == x && element.position[1][1] == y) ||
          (x >= element.position[0][0] &&
            x <= element.position[1][0] &&
            y >= element.position[0][1] &&
            y <= element.position[1][1])
        );
      }
      return false;
    });
  }

  receiveAttack(x, y) {
    let index = this.attackHit(x, y);
    if (index != -1) {
      this.ships[index].ship.hit();
      this.board[y][x] = "O";
      return true;
    } else if (x < 10 && x >= 0 && y >= 0 && y < 10) {
      this.board[y][x] = "X";
      return false;
    }
  }

  allShipsSunk() {
    return this.ships.every((element) => element.ship.isSunk());
  }
}
