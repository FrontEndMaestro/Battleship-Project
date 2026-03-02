export default class Player {
  constructor(type, gameBoard) {
    this.type = type;
    this.gameBoard = gameBoard;
    this.score = 0;
  }

  addScore() {
    this.score++;
  }

  getScore() {
    return this.score;
  }
}
