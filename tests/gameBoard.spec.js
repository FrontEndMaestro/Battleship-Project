import Gameboard from "../src/Gameboard.js";
import ship from "../src/ship.js";
let gameBoard = new Gameboard();
describe("Gameboard class", () => {
  test("Gameboard class exists", () => {
    expect(Gameboard).toBeDefined();
  });

  test("gameboard has a board", () => {
    expect(gameBoard.board).toBeDefined();
  });

  test("board is an array of 10x10", () => {
    expect(typeof gameBoard.board).toBe("object");
    expect(gameBoard.board.length * gameBoard.board[0].length).toBe(100);
  });
});

describe("Place Ships", () => {
  test("function placeShips exists", () => {
    expect(gameBoard.placeShips).toBeDefined();
  });
  test("Define data structure to store ships", () => {
    expect(gameBoard.ships).toBeDefined();
    expect(gameBoard.ships.length).toBe(5);
  });

  test("Store ships inside data structure", () => {
    expect(gameBoard.ships[0].ship instanceof ship).toBeTruthy();
  });

  test("Initialise ships array with different sizes", () => {
    expect(gameBoard.ships[0].ship.getLength()).toBe(5);
    expect(gameBoard.ships[3].ship.getLength()).toBe(3);
    expect(gameBoard.ships[2].ship.getLength()).toBe(3);
    expect(gameBoard.ships[4].ship.getLength()).toBe(2);
  });

  test("Each ship has a position value to store coordinates", () => {
    gameBoard.ships.forEach((element) => {
      expect(element.position).toEqual([]);
    });
  });

  test("ship is placed at specific location", () => {
    expect(gameBoard.placeShips([0, 0], [1, 0], 4)).toBe(true);
    expect(gameBoard.placeShips([0, 0], [2, 0], 4)).toBe(false);
    expect(gameBoard.placeShips([10,10],[10,8],4)).toBe(false)
  });

  test.skip("Incorrect ship id results in an error", () => {
    expect(() => gameBoard.placeShips("32", "43", 6)).toThrow();
  });
});

describe("Test cases for receiveAttack method", () => {
  test("attack hit the ship?", () => {
    gameBoard.placeShips("32", "43", 2);
    expect(gameBoard.attackHit("32", "43")).toBe(2);
    expect(gameBoard.attackHit("00", "12")).toBe(-1);
  });

});
