import React, { useState } from 'react';
import { getCoordinatesFromString } from '../AppFunctions';
import './Square.css';

const Square = (props) => {
  let secondaryClass = '';

  // CHANGE STATE ON TRACKING BOARD
  const [isHitClass, setIsHitClass] = useState('notHit');

  // CHANGE STATE ON PRIMARY BOARD (RECEIVED ATTACK)
  const [receivedHitClass, setReceivedHitClas] = useState('noHit');

  if (props.type === false) {
    secondaryClass = 'emptySquare';
  } else {
    secondaryClass = 'shipSquare';
  }

  const changeHitClass = (e) => {
    if (props.boardType === 'tracking') {
      let coords = getCoordinatesFromString(e.target.id);
      if (props.enemyArray[coords[0]][coords[1]] instanceof Object) {
        setIsHitClass('isHit');
      } else {
        setIsHitClass('isMiss');
      }
    }
  };

  return (
    <div
      className={`square ${secondaryClass} ${isHitClass}`}
      id={props.id}
      onClick={changeHitClass}
      onChange={props.onClick}
    ></div>
  );
};

export default Square;
