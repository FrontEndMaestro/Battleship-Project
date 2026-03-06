
function computerAttack(playerBoard) {
  let x = 0;
  let y = 0;
  do {
    ({ x, y } = generateHitPosition());
  } while (playerBoard.board[y][x] == "X" || playerBoard.board[y][x] == "O");

  return [x, y];
}

function generateHitPosition() {
  let x = Math.floor(Math.random() * 9);
  let y = Math.floor(Math.random() * 9);
  return { x, y };
}

export { computerAttack};
