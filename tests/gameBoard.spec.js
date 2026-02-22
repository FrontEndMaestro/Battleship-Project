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
    expect(gameBoard.placeShips([10, 10], [10, 8], 4)).toBe(false);
    expect(gameBoard.placeShips([5, 5], [5, 9], 1)).toBe(false);
  });

  test("Incorrect ship id results in an error", () => {
    //expect(gameBoard.placeShips("32", "43", 6)).toThrow();
    //expect(() => gameBoard.placeShips("32", "43", 6)).toThrow();
  });
});

describe("Test cases for receiveAttack method", () => {
  test("attack hit the ship?", () => {
    gameBoard.placeShips([0, 0], [0, 2], 3);
    expect(gameBoard.attackHit(0, 1)).toBe(3);
    expect(gameBoard.attackHit(0, 0)).toBe(3);
    expect(gameBoard.attackHit(0, 3)).toBe(-1);
    expect(gameBoard.attackHit(0, 4)).toBe(-1);
  });

  test("call attackHit with invalid coordinates", () => {
    expect(gameBoard.attackHit(10, 10)).toBe(-1);
  });

  test("missed attacks are stored in missedShotsCoordinates", () => {
    gameBoard.receiveAttack(5, 5);
    expect(
      gameBoard.missedShotsCoordinates.some(
        (element) => element.x == 5 && element.y == 5,
      ),
    ).toBe(true);
  });

  test("missed attacks with out of bound positions are not stored in missedShots", () => {
    gameBoard.receiveAttack(10, 10);
    expect(
      gameBoard.missedShotsCoordinates.some(
        (element) => element.x == 10 && element.y == 10,
      ),
    ).toBe(false);
    gameBoard.receiveAttack(12, 12);
    expect(
      gameBoard.missedShotsCoordinates.some(
        (element) => element.x == 12 && element.y == 12,
      ),
    ).toBe(false);
  });

  describe("All ships sunk?", () => {
    gameBoard.placeShips([0, 0], [0, 2], 3);
   // gameBoard.placeShips([5, 5], [5, 9], 0);
    gameBoard.receiveAttack(5, 5);
    gameBoard.receiveAttack(0, 0);
    gameBoard.receiveAttack(0, 1);
    gameBoard.receiveAttack(0, 2);

    test("check if a ship is sunk when all positions are attacked", () => {
      expect(gameBoard.ships[3].ship.isSunk()).toBe(true);
    });


    test.only("ship isnt sunk if some positions are not attacked", () => {
     /*  expect(gameBoard.placeShips([5, 5], [9, 5], 0)).toBe(true)
      expect(gameBoard.ships[0].ship.isSunk()).toBe(false);
    */});
  });
});
