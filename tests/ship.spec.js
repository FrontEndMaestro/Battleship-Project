import shipClass from "../src/ship.js";

describe("Ship Class", () => {
  let ship = new shipClass(3);
  test("Ship class exists", () => {
    expect(typeof shipClass).toBe("function");
  });

  test("hit function exists", () => {
    expect(ship.hit).toBeDefined();
  });

  test("isSunk function exists", () => {
    expect(ship.isSunk).toBeDefined();
  });

  test("ship is hurt but not dead", () => {
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });
  test("ship is dead", () => {
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
