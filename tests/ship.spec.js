import shipClass from "../src/ship.js";

describe("Ship Class", () => {
  let ship = new shipClass(3);
  ship.hit();
  test.skip("ship is hurt but not dead", () => {
    expect(ship.isSunk()).toBe(false);
  });
  ship.hit();
  ship.hit();
  test.skip("ship is dead", () => {
    expect(ship.isSunk()).toBe(true);
  });
});
