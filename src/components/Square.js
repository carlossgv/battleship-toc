import React, { useState } from 'react';
import { getCoordinatesFromString } from '../AppFunctions';
import './Square.css';

const Square = (props) => {
  let secondaryClass = '';

  // CHANGE STATE ON TRACKING BOARD
  const [attackHitClass, setAttackHitClass] = useState('notHit');

  // CHANGE STATE ON PRIMARY BOARD (RECEIVED ATTACK)
  const [receivedHitClass, setReceivedHitClass] = useState('');

  if (props.type === false) {
    secondaryClass = 'emptySquare';
  } else {
    secondaryClass = 'shipSquare';
  }

  const changeHitClass = (e) => {
    if (props.boardType === 'tracking') {
      let coords = getCoordinatesFromString(e.target.id);
      if (props.enemyArray[coords[0]][coords[1]] instanceof Object) {
        setAttackHitClass('isHit');
      } else {
        setAttackHitClass('isMiss');
      }
    }
  };

  return (
    <div
      className={`square ${secondaryClass} ${attackHitClass}`}
      id={props.id}
      onClick={changeHitClass}
      onChange={props.onClick}
    ></div>
  );
};

export default Square;
