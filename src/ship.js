export default class ship {
  #length;
  #hits=0;
  #sunk=false;
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
