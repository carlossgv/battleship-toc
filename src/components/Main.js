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
  const computer = createPlayer('computer');

  const [boards, setBoards] = useState({
    userPrimaryGrid: createGameboard('primary'),
    userTrackingGrid: createGameboard('tracking'),
    computerPrimaryGrid: createGameboard('primary'),
    computerTrackingGrid: createGameboard('tracking'),
  });

  const [gameFinished, setGameFinished] = useState(false);

  const [result, setResult] = useState('');

  useEffect(() => {
    fillBoard(boards.userPrimaryGrid);
    fillBoard(boards.computerPrimaryGrid);
    setBoards({
      userPrimaryGrid: boards.userPrimaryGrid,
      userTrackingGrid: boards.userTrackingGrid,
      computerPrimaryGrid: boards.computerPrimaryGrid,
      computerTrackingGrid: boards.computerTrackingGrid,
    });
  }, [
    boards.computerPrimaryGrid,
    boards.computerTrackingGrid,
    boards.userPrimaryGrid,
    boards.userTrackingGrid,
  ]);

  const handleClick = (e) => {
    //TODO: PREVENT ERROR WHEN TRYING TO DRAG INSIDE GAMEBOARD
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

    // TODO: Improve computer attack (i.e. select square next to previous if it was a hit)
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

    const modal = document.querySelector('.modal');

    if (boards.computerPrimaryGrid.allShipSunked()) {
      setGameFinished(true);
      setResult('won');
      modal.style.display = 'block';
    } else if (boards.userPrimaryGrid.allShipSunked()) {
      setGameFinished(true);
      setResult('lost');
      modal.style.display = 'block';
    }
  };

  return (
    <div className="Main">
      <div className="gameBoards">
        <div className="grid playersGrid">
          <Gameboard
            type={'primary'}
            board={boards.userPrimaryGrid}
            enemyArray={boards.computerTrackingGrid.array}
          />
          <div>
            <p>Your grid</p>
          </div>{' '}
        </div>
        <div className="grid computersGrid">
          <Gameboard
            type={'tracking'}
            gameFinished={gameFinished}
            board={boards.userTrackingGrid}
            enemyArray={boards.computerPrimaryGrid.array}
            onClick={handleClick}
          />
          <div>
            <p>Opponent's grid</p>
          </div>{' '}
          <div className="modal">
            <div className="modalContent">
              <h6>You {result}!</h6>
              <button onClick={() => window.location.reload()}>
                Play Again
              </button>
            </div>
          </div>
        </div>
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
