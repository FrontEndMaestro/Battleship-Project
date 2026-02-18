import shipClass from "../src/ship.js";

describe("Ship Class", () => {
  let ship = new shipClass();
  test("Ship class exists", () => {
    expect(typeof shipClass).toBe("function");
  });

  test("hit function exists", () => {
    expect(ship.hit).toBeDefined();
  });

  test("isSunk function exists", () => {
    expect(ship.isSunk).toBeDefined();
  });

});
