import shipClass from "../src/ship.js";

describe("Ship Class", () => {
  let ship = new shipClass(3);
  test.skip("Ship class exists", () => {
    expect(typeof shipClass).toBe("function");
  });

  test.skip("hit function exists", () => {
    expect(ship.hit).toBeDefined();
  });

  test.skip("isSunk function exists", () => {
    expect(ship.isSunk).toBeDefined();
  });

  test.skip("ship is hurt but not dead", () => {
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });
  test.skip("ship is dead", () => {
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
