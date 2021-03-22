import React, { useEffect, useState } from 'react';
import Gameboard from './Gameboard';
import './Main.css';
import {
  createPlayer,
  getCoordinatesFromString,
  fillBoard,
  createGameboard,
} from '../AppFunctions';

const Main = () => {
  // const user = createPlayer('user');
  const computer = createPlayer('computer');

  const [boards, setBoards] = useState({
    userPrimaryGrid: createGameboard('primary'),
    userTrackingGrid: createGameboard('tracking'),
    computerPrimaryGrid: createGameboard('primary'),
    computerTrackingGrid: createGameboard('tracking'),
  });

  const [gameFinished, setGameFinished] = useState(false);

  useEffect(() => {
    fillBoard(boards.userPrimaryGrid);
    fillBoard(boards.computerPrimaryGrid);
    setBoards({
      userPrimaryGrid: boards.userPrimaryGrid,
      userTrackingGrid: boards.userTrackingGrid,
      computerPrimaryGrid: boards.computerPrimaryGrid,
      computerTrackingGrid: boards.computerTrackingGrid,
    });
  }, []);

  const handleClick = (e) => {
    const attackCoordinates = getCoordinatesFromString(e.target.id);

    console.log(attackCoordinates);

    console.log(gameFinished);
    if (gameFinished) {
      return;
    }

    if (
      !boards.computerPrimaryGrid.receiveAttack(
        attackCoordinates[0],
        attackCoordinates[1]
      )
    ) {
      return;
    }

    boards.computerPrimaryGrid.receiveAttack(
      attackCoordinates[0],
      attackCoordinates[1]
    );

    const computerAttack = computer.sendAttack(boards.userPrimaryGrid.array);

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

    if (boards.computerPrimaryGrid.allShipSunked()) {
      setGameFinished(true);
      alert('YOU WON!');
    } else if (boards.userPrimaryGrid.allShipSunked()) {
      setGameFinished(true);
      alert('YOU LOST');
    }
  };

  return (
    <div className="Main">
      <div className="gameBoards">
        <Gameboard
          type={'primary'}
          board={boards.userPrimaryGrid}
          enemyArray={boards.computerTrackingGrid.array}
        />
        <Gameboard
          type={'tracking'}
          gameFinished={gameFinished}
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
