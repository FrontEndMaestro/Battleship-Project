import ship from "./ship.js";
import throwError from "./Error.js";
export default class Gameboard {
  ships = [];
  missedShotsCoordinates = [];

  constructor() {
    this.board = Array.from({ length: 10 }, () => new Array(10).fill(0));
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
    if (shipID >= this.ships.length) throwError("Hello");
    if (this.checkCordinateValidity(startPosition, endPosition, shipID)) {
      this.ships[shipID].position.push(startPosition);
      this.ships[shipID].position.push(endPosition);
      return true
    }

    return false
  }

  checkCordinateValidity(startPosition, endPosition, index) {
    let shipLength = this.ships[index].ship.getLength();
    if (
      startPosition.every((value) => value < 10 && value >= 0) &&
      endPosition.every((value) => value < 10 && value >= 0)
    ) {
      if (
        startPosition[0] + endPosition[0] + 1 == shipLength ||
        startPosition[1] + endPosition[1] + 1 == shipLength
      ) {
        return true;
      }
    }
    return false;
  }

  attackHit(x, y) {
    return this.ships.findIndex(
      (element) => element.position[0] == x && element.position[1] == y,
    );
  }

  receiveAttack(x, y) {
    let index = this.attackHit(x, y);
    if (index != -1) this.ships[index].ship.hit();
    else this.missedShotsCoordinates.push({ x, y });
  }
}
