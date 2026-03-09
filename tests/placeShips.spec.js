import player from "../src/Player.js";
import * as placeShipsAtStart from "../src/placeShips.js";
import Gameboard from "../src/Gameboard.js";
import * as randomPositions from "../src/randomPositions.js";
import Player from "../src/Player.js";
const mockPlaceShips = jest.fn(() => 1);
jest.mock("../src/Player.js", () => {
  return jest.fn().mockImplementation(() => {
    return {
      gameBoard: {
        placeShips: mockPlaceShips,
        ships: 1,
      },
    };
  });
});

beforeEach(() => {
  mockPlaceShips.mockClear();
  player.mockClear();
  jest.restoreAllMocks();
});


test("place ships is called 10 times", () => {
  jest.spyOn(randomPositions, "default").mockImplementation(() => [
    [0, 0],
    [0, 2],
  ]);
  placeShipsAtStart.default(new Player());
  placeShipsAtStart.placeComputerShip(new Player());
  expect(mockPlaceShips).toHaveBeenCalledTimes(10);
});

test("10 random positions are generated", () => {
  jest.spyOn(randomPositions, "default").mockImplementation(() => [
    [0, 0],
    [0, 2],
  ]);
  placeShipsAtStart.default(new Player());
  placeShipsAtStart.placeComputerShip(new Player());
  expect(randomPositions.default).toHaveBeenCalledTimes(10)
});

test("generates position corresponding to ship length", () => {
  let gameobj = new Gameboard();
  let positionArr = randomPositions.default(gameobj, 4);

  let x = Math.abs(positionArr[0][0] - positionArr[1][0]) + 1;
  let y = Math.abs(positionArr[0][1] - positionArr[1][1]) + 1;
  expect(y == 2 || x == 2).toBeTruthy();

  positionArr = randomPositions.default(gameobj, 0);
  x = Math.abs(positionArr[0][0] - positionArr[1][0]) + 1;
  y = Math.abs(positionArr[0][1] - positionArr[1][1]) + 1;
  expect(y == 5 || x == 5).toBeTruthy();
});
