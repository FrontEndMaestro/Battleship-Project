import { generateHitPosition } from "../src/Computer";
import gameBoard from "../src/Gameboard";
import { computerAttack } from "../src/Computer";

jest.mock("../src/Computer", () => {
  const originalModule = jest.requireActual("../src/Computer");

  return {
    __esModule: true,
    ...originalModule,
    generateHitPosition: jest
      .fn()
      .mockReturnValueOnce({ x: 0, y: 0 })
      .mockReturnValueOnce({ x: 1, y: 0 })
      .mockReturnValueOnce({ x: 2, y: 0 }),
  };
});

it("does not shoot the same coordinate twice", () => {
  let gameboard = new gameBoard();
  gameboard.board[0][0] = "X";
  gameboard.board[0][1] = "O";

  expect(computerAttack(gameboard, generateHitPosition)).toEqual([2, 0]);
});

it("generates coordinates from 0-9", () => {
  jest.resetModules();
  jest.unmock("../src/Computer");
  let computerModule = require("../src/Computer");
  let gameboard = require("../src/Gameboard").default;
  let arr = computerModule.computerAttack(
    new gameboard(),
    computerModule.generateHitPosition,
  );
  expect(arr[0]).toBeGreaterThan(-1);
  expect(arr[0]).toBeLessThanOrEqual(9);
});
