import Gameboard from "../src/Gameboard.js";
import ship from "../src/ship.js";

describe("Gameboard class", () => {
  let gameBoard = new Gameboard();
  test("gameboard has a board", () => {
    expect(gameBoard.board).toBeDefined();
  });

  test("board is an array of 10x10", () => {
    expect(typeof gameBoard.board).toBe("object");
    expect(gameBoard.board.length * gameBoard.board[0].length).toBe(100);
  });
});

describe("Place Ships", () => {
  let gameBoard = new Gameboard();
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

  test("ship is placed at specific location", () => {
    expect(gameBoard.placeShips([0, 0], [1, 0], 4)).toBe(true);
    expect(gameBoard.placeShips([0, 0], [2, 0], 4)).toBe(false);
    expect(gameBoard.placeShips([10, 10], [10, 8], 4)).toBe(false);
    expect(gameBoard.placeShips([5, 5], [5, 9], 1)).toBe(false);
    expect(gameBoard.placeShips([5, 7], [8, 7], 1)).toBe(true);
    expect(gameBoard.placeShips([3, 8], [5, 8], 2)).toBe(true); 
  });
});

describe("Test cases for receiveAttack method", () => {
  let gameBoard = new Gameboard();
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
});

describe("All ships sunk?", () => {
  let gameBoard = new Gameboard();
  gameBoard.placeShips([0, 0], [0, 2], 3); //len 3
  gameBoard.placeShips([5, 5], [9, 5], 0); //len 5
  gameBoard.placeShips([5, 4], [8, 4], 1); //len 4
  gameBoard.placeShips([3, 8], [5, 8], 2); //len 3
  gameBoard.placeShips([1, 6], [1, 7], 4); //len 2
  gameBoard.receiveAttack(0, 0);
  gameBoard.receiveAttack(0, 1);
  gameBoard.receiveAttack(0, 2);

  gameBoard.receiveAttack(5, 5);
  gameBoard.receiveAttack(6, 5);
  gameBoard.receiveAttack(7, 5);
  gameBoard.receiveAttack(8, 5);
  gameBoard.receiveAttack(9, 5);

  gameBoard.receiveAttack(5, 4);
  gameBoard.receiveAttack(6, 4);
  gameBoard.receiveAttack(7, 4);
  gameBoard.receiveAttack(8, 4);

  gameBoard.receiveAttack(5, 8);
  gameBoard.receiveAttack(3, 8);
  gameBoard.receiveAttack(4, 8);

  gameBoard.receiveAttack(1, 6);
  gameBoard.receiveAttack(1, 7);

  test("check if a ship is sunk when all positions are attacked", () => {
    expect(gameBoard.ships[3].ship.isSunk()).toBe(true);
    expect(gameBoard.ships[0].ship.isSunk()).toBe(true);
  });

  test("All ships should be sunk", () => {
    expect(gameBoard.allShipsSunk()).toBe(true);
  });
});

describe("Register ship positions on board", () => {
  let gameBoard = new Gameboard();
  test("method marks the coordinates with id of the ship", () => {
    gameBoard.updateBoard([0, 1], [0, 3], 3);
    expect(gameBoard.board[1][0]).toBe(3);
    expect(gameBoard.board[2][0]).toBe(3);
    expect(gameBoard.board[3][0]).toBe(3);

    gameBoard.updateBoard([5, 5], [5, 9], 0);
    expect(gameBoard.board[5][5]).toBe(0);
    expect(gameBoard.board[6][5]).toBe(0);
    expect(gameBoard.board[7][5]).toBe(0);
    expect(gameBoard.board[8][5]).toBe(0);
    expect(gameBoard.board[9][5]).toBe(0);

    gameBoard.updateBoard([0, 0], [2, 0], 3);
    expect(gameBoard.board[0][0]).toBe(3);
    expect(gameBoard.board[0][1]).toBe(3);
    expect(gameBoard.board[0][2]).toBe(3);
    expect(gameBoard.board[0][3]).toBe(-1);
  });
});

test("do not add ship if a ship is already placed", () => {
  let gameBoard = new Gameboard();
  gameBoard.board[0][1] = 2;
  gameBoard.board[0][2] = 2;
  expect(
    gameBoard.areCoordinatesEmpty([
      [1, 0],
      [2, 0],
    ]),
  ).toBe(false);
});

test("Correctly return all coordinates", () => {
  let gameBoard = new Gameboard();
  expect(gameBoard.getAllCoordinates([0, 0], [0, 2], 3)).toEqual([
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
});

test.only("correctly reset board",()=>{
  let gameBoard=new Gameboard()
  gameBoard.board[0][0]=9
  gameBoard.board[0][2]=9 
  gameBoard.board[0][2]=9
  gameBoard.resetBoard()
  expect(gameBoard.board[0][0]).toBe(-1)
})
