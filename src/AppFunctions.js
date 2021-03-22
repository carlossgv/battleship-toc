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

  const placeShip = (ship) => {
    let coords = randomCoordinates(ship);
    let direction = coords.direction;
    let x = coords.x;
    let y = coords.y;

    if (direction === 'horizontal') {
      for (let i = 0; i < ship.length; i++) {
        console.log('inside if', x, y, direction);
        ship.hitPoints[i].x = x;
        ship.hitPoints[i].y = i + y;
        array[x][i + y] = ship.hitPoints[i];
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        console.log('inside if', x, y, direction);
        ship.hitPoints[i].x = i + x;
        ship.hitPoints[i].y = y;
        array[i + x][y] = ship.hitPoints[i];
      }
    }

    return { x, y, direction };
  };

  const randomCoordinates = (ship) => {
    let direction = '';
    let randomDirection = _.random(0, 1);
    let x = _.random(0, 9);
    let y = _.random(0, 9);

    randomDirection === 0
      ? (direction = 'horizontal')
      : (direction = 'vertical');

    let position = false;
    while (position === false) {
      if (direction === 'horizontal') {
        if (y > 10 - ship.length || array[x][y] !== false) {
          console.log(`cant place ship in ${x},${y}`);
          randomDirection = _.random(0, 1);
          x = _.random(0, 9);
          y = _.random(0, 9);
          randomDirection === 0
            ? (direction = 'horizontal')
            : (direction = 'vertical');
          console.log(x, y, direction);
        } else {
          for (let i = 0; i < ship.length; i++) {
            position = true;
          }
        }
      }

      if (direction === 'vertical') {
        if (x > 10 - ship.length || array[x][y] !== false) {
          console.log(`cant place ship in ${x},${y}`);
          randomDirection = _.random(0, 1);
          x = _.random(0, 9);
          y = _.random(0, 9);
          randomDirection === 0
            ? (direction = 'horizontal')
            : (direction = 'vertical');
          console.log(x, y, direction);
        } else {
          for (let i = 0; i < ship.length; i++) {
            position = true;
          }
        }
      }
    }
    console.log(x, y, direction);
    return { x, y, direction };
  };

  return {
    array,
    missedAtttacks,
    placeShip,
    receiveAttack,
    allShipSunked,
    fillBoard,
  };
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

const fillBoard = () => {
  const carrier = createShip(5);
  const battleship = createShip(4);
  const cruiser = createShip(3);
  const submarine = createShip(3);
  const destroyer = createShip(2);

  // Gameboards setup

  const userPrimaryGrid = createGameboard('primary');
  const userTrackingGrid = createGameboard('tracking');

  userPrimaryGrid.placeShip(carrier);
  userPrimaryGrid.placeShip(battleship);
  userPrimaryGrid.placeShip(cruiser);
  userPrimaryGrid.placeShip(submarine);
  userPrimaryGrid.placeShip(destroyer);

  const computerPrimaryGrid = createGameboard('primary');
  const computerTrackingGrid = createGameboard('tracking');

  computerPrimaryGrid.placeShip(carrier);
  computerPrimaryGrid.placeShip(battleship);
  computerPrimaryGrid.placeShip(cruiser);
  computerPrimaryGrid.placeShip(submarine);
  computerPrimaryGrid.placeShip(destroyer);

  return {
    userPrimaryGrid,
    userTrackingGrid,
    computerPrimaryGrid,
    computerTrackingGrid,
  };
};

export {
  createShip,
  createGameboard,
  createPlayer,
  getCoordinatesFromString,
  fillBoard,
};
