import React from "react";

const GameOver = ({ Winner, onRematch }) => {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {Winner && <p>{Winner} Won!</p>}
      {!Winner && <p>It's a Draw!</p>}

      <p>
        <button onClick={onRematch}>Rematch!</button>
      </p>
    </div>
  );
};

export default GameOver;
