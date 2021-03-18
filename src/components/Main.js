import React, { useState } from 'react';
import Gameboard from './Gameboard';
import {
  createShip,
  createGameboard,
  createPlayer,
  getCoordinatesFromString,
} from '../AppFunctions';

const Main = () => {
  const user = createPlayer('user');
  const computer = createPlayer('computer');

  const carrier = createShip(5);
  const battleship = createShip(4);
  const cruiser = createShip(3);
  const submarine = createShip(3);
  const destroyer = createShip(2);

  // Gameboards setup

  const userPrimaryGrid = createGameboard('primary');
  const userTrackingGrid = createGameboard('tracking');

  userPrimaryGrid.placeShip(1, 1, carrier, 'vertical');
  userPrimaryGrid.placeShip(1, 4, battleship, 'horizontal');
  userPrimaryGrid.placeShip(6, 6, cruiser, 'vertical');
  userPrimaryGrid.placeShip(4, 4, submarine, 'horizontal');
  userPrimaryGrid.placeShip(8, 8, destroyer, 'vertical');

  const computerPrimaryGrid = createGameboard('primary');
  const computerTrackingGrid = createGameboard('tracking');

  computerPrimaryGrid.placeShip(1, 1, carrier, 'vertical');
  computerPrimaryGrid.placeShip(1, 4, battleship, 'horizontal');
  computerPrimaryGrid.placeShip(6, 6, cruiser, 'vertical');
  computerPrimaryGrid.placeShip(4, 4, submarine, 'horizontal');
  computerPrimaryGrid.placeShip(8, 8, destroyer, 'vertical');

  const handleClick = (e) => {
    const attackCoordinates = getCoordinatesFromString(e.target.id);

    console.log(attackCoordinates);

    computerPrimaryGrid.receiveAttack(
      attackCoordinates[0],
      attackCoordinates[1]
    );

    console.log(userPrimaryGrid.array);
    const computerAttack = computer.sendAttack(userPrimaryGrid.array);
    console.log(computerAttack.x, computerAttack.y, computerAttack.action);

    // TODO: Check if there is a way to do this inside Square component
    if (computerAttack) {
      const domComputerAttack = document.querySelector(
        `.primaryBoard #\\3${computerAttack.x} \\,${computerAttack.y}`
      );
      domComputerAttack.classList.remove('notHit');
      domComputerAttack.classList.add('isHit');
    }

    computerPrimaryGrid.allShipSunked();
  };

  return (
    <div className="main">
      <Gameboard
        type={'primary'}
        board={userPrimaryGrid}
        array={userPrimaryGrid.array}
        enemyArray={computerTrackingGrid}
      />
      <Gameboard
        type={'tracking'}
        board={userTrackingGrid}
        array={userTrackingGrid.array}
        enemyArray={computerPrimaryGrid.array}
        onClick={handleClick}
      />
    </div>
  );
};

export default Main;
