import ship from "./ship";
import throwError from "./Error.js";
export default class Gameboard {
  ships = [];

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
    let index = this.ships.findIndex((element) => element.id == shipID);
    this.ships[index].position.push(startPosition);
    this.ships[index].position.push(endPosition);
  }
}
