import React, { useState } from 'react';
import { getCoordinatesFromString } from '../AppFunctions';
import './Square.css';

const Square = (props) => {
  let secondaryClass = '';

  // CHANGE STATE ON TRACKING BOARD
  const [attackHitClass, setAttackHitClass] = useState({
    class: 'notHit',
    clicked: false,
  });

  if (props.type === false) {
    secondaryClass = 'emptySquare';
  } else {
    secondaryClass = 'shipSquare';
  }

  const changeHitClass = (e) => {
    if (props.gameFinished) {
      return;
    }
    if (props.boardType === 'tracking') {
      let coords = getCoordinatesFromString(e.target.id);
      if (props.enemyArray[coords[0]][coords[1]] instanceof Object) {
        setAttackHitClass({ class: 'isHit', clicked: true });
      } else {
        setAttackHitClass({ class: 'isMiss', clicked: true });
      }
    }
  };

  return (
    <div
      className={`square ${secondaryClass} ${attackHitClass.class}`}
      id={props.id}
      onClick={
        !attackHitClass.clicked ? changeHitClass : console.log(attackHitClass)
      }
      onChange={props.onClick}
    ></div>
  );
};

export default Square;
