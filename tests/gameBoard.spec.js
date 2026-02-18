import Gameboard from "../src/Gameboard.js";

describe("Gameboard class",()=>{
    let gameBoard=new Gameboard()
test("Gameboard class exists",()=>{
    expect(Gameboard).toBeDefined();
})

test("gameboard has a board",()=>{
    expect(gameBoard.board).toBeDefined()
})

test("board is an array of 10x10",()=>{
    expect(typeof gameBoard.board).toBe("object")
    expect(gameBoard.board.length * gameBoard.board[0].length).toBe(100)
})

})