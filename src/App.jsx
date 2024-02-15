import GameBoard from "./components/GameBoard.jsx";
import GameOver from "./components/GameOver.jsx";
import Log from "./components/Log.jsx";
import Player from "./components/Player.jsx";
import { WINNING_COMBINATIONS } from "./data/winning-combinations.js";

import { useState } from "react";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveWinner(gameBoard, player) {
  let winner;
  for (const i of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[i[0].row][i[0].column];
    const secondSquareSymbol = gameBoard[i[1].row][i[1].column];
    const thirdSquareSymbol = gameBoard[i[2].row][i[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = player[firstSquareSymbol];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurn) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((arr) => [...arr])];

  for (const i of gameTurn) {
    const { square, player } = i;

    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveActivePlayer(gameTurn) {
  let currentPlayer = "X";
  if (gameTurn.length > 0 && gameTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [gameTurn, setGameTurn] = useState([]);

  const [player, setPlayer] = useState(PLAYERS);

  const gameBoard = deriveGameBoard(gameTurn);

  const activePlayer = deriveActivePlayer(gameTurn);

  const winner = deriveWinner(gameBoard, player);

  const gameDraw = gameTurn.length === 9 && !winner;

  function handleActive(rowIndex, colIndex) {
    setGameTurn((prevTurn) => {
      const currentPlayer = deriveActivePlayer(prevTurn);

      const updatedTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurn,
      ];

      return updatedTurn;
    });
  }

  function changePlayerName(symbol, newName) {
    setPlayer((prevPlayer) => {
      return { ...prevPlayer, [symbol]: newName };
    });
  }

  function handleRestart() {
    setGameTurn([]);
  }

  return (
    <menu>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X" ? true : undefined}
            onChangeName={changePlayerName}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O" ? true : undefined}
            onChangeName={changePlayerName}
          />
        </ol>
        {(winner || gameDraw) && (
          <GameOver Winner={winner} onRematch={handleRestart} />
        )}
        <GameBoard onSelectBtn={handleActive} turns={gameBoard} />
      </div>
      <Log printTurn={gameTurn} />
    </menu>
  );
}

export default App;
