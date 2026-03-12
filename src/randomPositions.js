export default function generateRandomPositons(gameboard, shipID) {
  let start = [];
  let final = [];
  let length = gameboard.ships[shipID].ship.getLength();
  do {
    start[0] = Math.floor(Math.random() * 10);
    start[1] = Math.floor(Math.random() * 10);
    let verticalOrHorizontal = Math.floor(Math.random() * 2);
    if (verticalOrHorizontal == 1) {
      //horizontal
      final[0] = start[0] + (length - 1);
      final[1] = start[1];
    } else {
      //vertical
      final[0] = start[0];
      final[1] = start[1] + (length - 1);
    }
  } while (!gameboard.checkCoordinateValidity(start, final, shipID));

  return [start, final];
}
