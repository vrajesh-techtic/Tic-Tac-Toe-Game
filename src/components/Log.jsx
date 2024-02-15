import React from "react";

const Log = ({ printTurn }) => {
  return (
    <ol id="log">
      {printTurn.map((i) => (
        <li key={`${i.square.row}${i.square.col}`}>
          {i.player} selected {i.square.row},{i.square.col}
        </li>
      ))}
    </ol>
  );
};

export default Log;
