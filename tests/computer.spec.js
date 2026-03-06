import gameBoard from "../src/Gameboard";
import { computerTurn } from "../src/Computer";



jest.mock("../src/Computer", () => {
  const originalModule = jest.requireActual("../src/Computer");

  return {
    __esModule: true,
    ...originalModule,
    generateHitPosition: jest
      .fn()
      .mockReturnValueOnce({x:0,y:0})
      .mockReturnValueOnce({x:1,y:0})
      .mockReturnValueOnce({x:2,y:0})
  };
});


it("generates coordinates from 0-9", () => {
  let obj=generateHitPosition()
  expect(obj.x).toBeGreaterThan(-1);
  expect(obj.x).toBeLessThanOrEqual(9);
});


it("does not shoot the same coordinate twice", () => {
  let gameboard = new gameBoard();
  gameboard.board[0][0] = "X";
  gameboard.board[0][1] = "O";
  
  expect(computerTurn(gameboard)).toEqual([2,0])
});
