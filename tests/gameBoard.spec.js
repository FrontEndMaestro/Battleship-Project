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
    gameBoard.placeShips("11", "21", 3);
    expect(gameBoard.ships.find((element) => element.id == 3).position).toEqual(
      ["11", "21"],
    );
    gameBoard.placeShips("00", "54", 4);
    expect(gameBoard.ships.find((element) => element.id == 4).position).toEqual(
      ["00", "54"],
    );
  });

  test.only("Incorrect ship id results in an error", () => {
    expect(() => gameBoard.placeShips("32", "43", 6)).toThrow();
  });
});
