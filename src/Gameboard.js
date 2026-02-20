import ship from "./ship";
export default class Gameboard {
  ships = [];

  constructor() {
    this.board = Array.from({ length: 10 }, () => new Array(10).fill(0));
    this.initializeShips();
  }

  initializeShips() {
    let sizes = [5, 4, 3, 3, 2];
    for (let i = 0; i < 5; i++) {
      this.ships.push({ ship: new ship(sizes[i]), position: [] });
    }
  }

  placeShips(x, y) {
    this.ships[4].position.push("11", "21");
  }
}
