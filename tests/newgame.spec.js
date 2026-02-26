import newGame from "../src/newGame.js";
import player from "../src/Player.js";

beforeEach(() => {
  mockPlaceShips.mockClear();
  player.mockClear();
});

afterAll(() => {
  mockPlaceShips.mockRestore();
  player.mockRestore();
});

jest.mock("../src/renderGameboard.js");
const mockPlaceShips = jest.fn(() => 1);
jest.mock("../src/Player.js", () => {
  return jest.fn().mockImplementation(() => {
    return {
      gameBoard: {
        placeShips: mockPlaceShips,
      },
    };
  });
});
jest.mock("../src/Gameboard.js");

test("check player class is called two time", () => {
  newGame();
  expect(player).toHaveBeenCalledTimes(2);
});

test("place ships is called 10 times", () => {
  newGame();
  expect(mockPlaceShips).toHaveBeenCalledTimes(10);
});
