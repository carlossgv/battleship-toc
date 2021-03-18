import React, { useEffect, useState } from 'react';
import { createShip, getCoordinatesFromString } from '../AppFunctions';
import './Square.css';

const Square = (props) => {
  let secondaryClass = '';
  const [isHitClass, setIsHitClass] = useState('notHit');

  if (props.type === false) {
    secondaryClass = 'emptySquare';
  } else {
    secondaryClass = 'shipSquare';
  }

  const changeHitClass = (e) => {
    let coords = getCoordinatesFromString(e.target.id);
    if (props.enemyArray[coords[0]][coords[1]] instanceof Object) {
      setIsHitClass('isHit');
    } else {
      setIsHitClass('isMiss');
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
