let hits = [];
let nextTargets = [];
let direction = null;

function computerAttack(playerBoard, generateHitPosition) {
  let x = 0;
  let y = 0;

  if (nextTargets.length === 0) {
    hits = [];
    direction = null;
  }

  do {
    if (nextTargets.length !== 0) {
      [x, y] = nextTargets.pop();
    } else {
      ({ x, y } = generateHitPosition());
    }
  } while (playerBoard.board[y][x] === "X" || playerBoard.board[y][x] === "O");

  if (playerBoard.attackHit(x, y) !== -1) {
    hits.push([x, y]);

    if (hits.length > 1) {
      if (hits[hits.length - 1][0] === hits[hits.length - 2][0]) {
        direction = "vertical";
      } else if (hits[hits.length - 1][1] === hits[hits.length - 2][1]) {
        direction = "horizontal";
      }
    }

    if (direction === null) {
      addValidCoordinates(x + 1, y, playerBoard);
      addValidCoordinates(x - 1, y, playerBoard);
      addValidCoordinates(x, y + 1, playerBoard);
      addValidCoordinates(x, y - 1, playerBoard);
    } else if (direction === "horizontal") {
      addValidCoordinates(x + 1, y, playerBoard);
      addValidCoordinates(x - 1, y, playerBoard);
    } else if (direction === "vertical") {
      addValidCoordinates(x, y + 1, playerBoard);
      addValidCoordinates(x, y - 1, playerBoard);
    }
  }

  return [x, y];
}

function generateHitPosition() {
  let x = Math.floor(Math.random() * 10);
  let y = Math.floor(Math.random() * 10);
  return { x, y };
}

function addValidCoordinates(x, y, playerBoard) {
  if (x < 10 && x >= 0 && y < 10 && y >= 0) {
    const alreadyQueued = nextTargets.some(
      ([queuedX, queuedY]) => queuedX === x && queuedY === y,
    );

    if (
      !alreadyQueued &&
      playerBoard.board[y][x] !== "X" &&
      playerBoard.board[y][x] !== "O"
    ) {
      nextTargets.push([x, y]);
    }
  }
}

export { computerAttack, generateHitPosition };