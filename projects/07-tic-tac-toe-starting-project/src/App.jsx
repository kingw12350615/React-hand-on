import { useState } from "react";
import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./winning-combinations"
import GameOver from "./components/GameOver";

const INIT_PLAYERS = {
  X: "Player 1",
  O: "Player 2"
};

const INIT_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

// determine which side should be active on passing turns array
function deriveActivePlayer(turns) {
  let activePlayer = 'X';
  if (turns.length > 0 && turns[0].player === 'X') {
    activePlayer = 'O';
  }
  return activePlayer;
}

// generate gameboard using gameTurns
function deriveGameBoard(gameTurns) {
  // shallow copy with spread operation to keep origin array from modifying
  const gameBoard = INIT_GAME_BOARD.map(e => [...e]);
  for (const turn of gameTurns) {
    const { row, col } = turn.square;
    gameBoard[row][col] = turn.player;
  }
  return gameBoard;
}

// check does either of side win
function deriveWinner(gameBoard, players) {
  let winner;
  for (const WINNING_COMBINATION of WINNING_COMBINATIONS) {
    let firstSymbol = gameBoard[WINNING_COMBINATION[0].row][WINNING_COMBINATION[0].column];
    let secondSymbol = gameBoard[WINNING_COMBINATION[1].row][WINNING_COMBINATION[1].column];
    let thirdSymbol = gameBoard[WINNING_COMBINATION[2].row][WINNING_COMBINATION[2].column];
    if (firstSymbol != null && (firstSymbol === secondSymbol && firstSymbol === thirdSymbol)) {
      winner = players[firstSymbol];
      return winner;
    }
  }
}


function App() {

  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(INIT_PLAYERS);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns)
  const winner = deriveWinner(gameBoard, players);
  // if no one win, should end this game, and show draw result
  const isDraw = gameTurns.length >= 9;

  // handle square select
  function handleSquareSelect(rowIndex, colIndex) {
    setGameTurns(pre => {
      let activePlayer = deriveActivePlayer(gameTurns);
      const trun = { square: { row: rowIndex, col: colIndex }, player: activePlayer };
      return [trun, ...pre];
    });
  }

  function restartGame() {
    setGameTurns([]);
  }

  function handleSavePlayer(symbol, name) {
    setPlayers(pre => {
      return {
        ...pre,
        [symbol]: name
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initName={INIT_PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} handleSavePlayer={handleSavePlayer} />
          <Player initName={INIT_PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} handleSavePlayer={handleSavePlayer} />
        </ol>
        <GameBoard handleSelectSquare={handleSquareSelect} board={gameBoard} />
        {(winner || isDraw) && <GameOver winner={winner} onRestart={restartGame} />}
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
