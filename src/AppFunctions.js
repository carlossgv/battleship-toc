import _ from 'lodash';

const createShip = (length) => {
  const hitPoints = [];

  for (let i = 0; i < length; i++) {
    hitPoints.push({
      x: '',
      y: '',
      hit: false,
    });
  }

  const hit = (position) => {
    hitPoints[position].hit = true;
    return hitPoints;
  };

  const isSunk = (hitPoints) => {
    for (let i = 0; i < length; i++) {
      if (!hitPoints[i].hit) {
        return false;
      }
    }
    return true;
  };

  return { length, hitPoints, hit, isSunk };
};

const createGameboard = (type) => {
  const array = [
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
  ];

  const allShipSunked = () => {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].length; j++) {
        if (array[i][j].hit === false) {
          return false;
        }
      }
    }
    console.log('GAME FINISHED! ALL SHIPS SUNKED!');
    alert('GAME FINISHED!');
    return true;
  };

  const missedAtttacks = [];

  const receiveAttack = (x, y) => {
    if (!array[x][y]) {
      array[x][y] = 'missed';
      return 'missed';
    } else if (array[x][y] !== 'missed') {
      array[x][y].hit = true;
      return array[(x, y)];
    }
  };

  const placeShip = (x, y, ship, direction) => {
    if (x < 0 || y < 0) {
      return false;
    }

    if (direction === 'horizontal') {
      if (y > 10 - ship.length || array[x][y] !== false) {
        console.log(`cant place ship in ${x},${y}`);
        return false;
      } else {
        for (let i = 0; i < ship.length; i++) {
          ship.hitPoints[i].x = x;
          ship.hitPoints[i].y = i + y;
          array[x][i + y] = ship.hitPoints[i];
        }
        return array;
      }
    }

    if (direction === 'vertical') {
      if (x > 10 - ship.length || array[x][y] !== false) {
        console.log(`cant place ship in ${x},${y}`);
        return false;
      } else {
        for (let i = 0; i < ship.length; i++) {
          ship.hitPoints[i].x = i + x;
          ship.hitPoints[i].y = y;
          array[i + x][y] = ship.hitPoints[i];
        }
        return array;
      }
    }
  };

  return { array, missedAtttacks, placeShip, receiveAttack, allShipSunked };
};

const createPlayer = (type) => {
  let name = '';
  if (type !== 'computer') {
    name = 'User';
  } else {
    name = 'computer';
  }

  const sendAttack = (enemyPrimaryArray) => {
    let randomX = _.random(0, 9);
    let randomY = _.random(0, 9);

    while (
      enemyPrimaryArray[randomX][randomY] === 'missed' ||
      enemyPrimaryArray[randomX][randomY].hit
    ) {
      randomX = _.random(0, 9);
      randomY = _.random(0, 9);
    }

    if (!enemyPrimaryArray[randomX][randomY]) {
      enemyPrimaryArray[randomX][randomY] = 'missed';
      return { x: randomX, y: randomY, action: 'missed' };
    } else {
      enemyPrimaryArray[randomX][randomY].hit = true;
      return { x: randomX, y: randomY, action: 'hit' };
    }
  };

  return { name, sendAttack };
};

const getCoordinatesFromString = (stringCoordinates) => {
  let x = parseInt(stringCoordinates.split(',')[0]);
  let y = parseInt(stringCoordinates.split(',')[1]);
  return [x, y];
};

export { createShip, createGameboard, createPlayer, getCoordinatesFromString };
