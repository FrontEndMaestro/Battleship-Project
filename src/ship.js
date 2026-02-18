export default class ship {
  #length;
  #hits;
  #sunk;
  constructor() {}
  hit() {
    this.#hits++;
  }

  isSunk() {
    return this.#hits == this.#length ? true : false;
  }
}
