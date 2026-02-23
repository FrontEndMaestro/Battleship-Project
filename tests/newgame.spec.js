import { newGame } from "../src/newGame.js";
import { player } from "../src/Player.js";
import { gameBoard } from "../src/Gameboard.js";

jest.mock("../src/Player.js");
jest.mock("../src/Gameboard.js");

test.only("check player class is called two time", () => {
  //expect(typeof newGame).toBe('function')
  expect(newGame).toBeDefined();
  //newGame();
  expect(player).toHaveBeenCalledTimes(2);
});
