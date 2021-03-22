import React, { useEffect, useState } from 'react';
import Gameboard from './Gameboard';
import './Main.css';
import {
  createPlayer,
  getCoordinatesFromString,
  fillBoard,
  createGameboard,
} from '../AppFunctions';
import _ from 'lodash';

const Main = () => {
  const user = createPlayer('user');
  const computer = createPlayer('computer');

  const [testNumber, setTestNumber] = useState(0);
  const [boards, setBoards] = useState({
    userPrimaryGrid: createGameboard('primary'),
    userTrackingGrid: createGameboard('tracking'),
    computerPrimaryGrid: createGameboard('primary'),
    computerTrackingGrid: createGameboard('tracking'),
  });

  useEffect(() => {
    setBoards(fillBoard());
    setTestNumber(_.random(0, 9));
  }, []);

  const handleClick = (e) => {
    const attackCoordinates = getCoordinatesFromString(e.target.id);
    e.target.removeEventListener('click', handleClick);

    console.log(attackCoordinates);

    boards.computerPrimaryGrid.receiveAttack(
      attackCoordinates[0],
      attackCoordinates[1]
    );

    console.log(boards.userPrimaryGrid.array);
    const computerAttack = computer.sendAttack(boards.userPrimaryGrid.array);
    console.log(computerAttack.x, computerAttack.y, computerAttack.action);

    // TODO: Check if there is a way to do this inside Square component
    if (computerAttack) {
      const domComputerAttack = document.querySelector(
        `.primaryBoard #\\3${computerAttack.x} \\,${computerAttack.y}`
      );
      domComputerAttack.classList.remove('notHit');

      if (domComputerAttack.classList.contains('shipSquare')) {
        domComputerAttack.classList.add('isHit');
      } else {
        domComputerAttack.classList.add('isMiss');
      }
    }

    boards.computerPrimaryGrid.allShipSunked();
  };

  console.log('Array in Main', boards);

  console.log(testNumber);

  return (
    <div className="Main">
      <div className="gameBoards">
        <Gameboard
          type={'primary'}
          board={boards.userPrimaryGrid}
          enemyArray={boards.computerTrackingGrid.array}
          testNumber={testNumber}
        />
        <Gameboard
          type={'tracking'}
          board={boards.userTrackingGrid}
          enemyArray={boards.computerPrimaryGrid.array}
          onClick={handleClick}
        />
      </div>
      <div className="linkContainer">
        <a
          href="https://en.wikipedia.org/wiki/Battleship_(game)"
          rel="noreferrer"
          target="_blank"
        >
          How to play
        </a>
      </div>
    </div>
  );
};

export default Main;
