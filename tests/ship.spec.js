import shipClass from "../src/ship.js";

describe("Ship Class", () => {
  test("ship is hurt but not dead", () => {
    let ship = new shipClass(3);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  test("ship is dead", () => {
    let ship2 = new shipClass(3);
    ship2.hit();
    ship2.hit();
    ship2.hit();
    expect(ship2.isSunk()).toBe(true);
  });
});
