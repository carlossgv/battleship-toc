import React from 'react';
import './Gameboard.css';
import Square from './Square';

const Gameboard = (props) => {
  let squaresArray = [];
  let x = 0;

  // console.log(props.type);
  if (props.type === 'primary') {
    console.log('Regular in gameboard', props.board.array);
    console.log(props.testNumber)
  }

  props.board.array.forEach((row) => {
    let y = 0;
    row.forEach((square) => {
      let type = '';

      if (!square) {
        type = false;
      } else {
        type = 'ship';
      }

      squaresArray.push(
        <Square
          boardType={props.type}
          key={`${x},${y}`}
          id={`${x},${y}`}
          row={x}
          type={type}
          isHitClass={props.isHitClass}
          enemyArray={props.enemyArray}
        />
      );
      y = y + 1;
    });

    x = x + 1;
  });

  return (
    <div className={`gameBoard ${props.type}Board`} onClick={props.onClick}>
      {squaresArray}
    </div>
  );
};

export default Gameboard;
