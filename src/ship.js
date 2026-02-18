export default class ship {
  #length;
  #hits;
  #sunk;
  constructor(length) {
    this.#length = length;
  }
  hit() {
    this.#hits++;
  }

  isSunk() {
    this.#hits == this.#length ? (this.#sunk = true) : (this.#sunk = false);
    return this.#sunk;
  }
}
