const createShip = (length) => {
  const hitPoints = [];

  for (let i = 0; i < length; i++) {
    hitPoints.push(false);
  }

  const hit = (position) => {
    hitPoints[position] = true;
    return hitPoints;
  };

  const isSunk = (hitPoints) => {
    for (let i = 0; i < length; i++) {
      if (!hitPoints[i]) {
        return false;
      }
    }
    return true;
  };

  return { length, hitPoints, hit, isSunk };
};

const Gameboard = (type) => {
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

  const placeShip = (x, y, ship, direction) => {
    if (x < 0 || y < 0) {
      return false;
    }

    if (direction === 'horizontal') {
      if (y > 10 - ship.length) {
        return false;
      } else {
        for (let i = 0; i < ship.length; i++) {
          array[x][i + y] = true;
        }
        return array;
      }
    }

    if (direction === 'vertical') {
      if (x > 10 - ship.length) {
        return false;
      } else {
        for (let i = 0; i < ship.length; i++) {
          array[i + x][y] = true;
        }
        return array;
      }
    }
  };

  return { array, placeShip };
};

export { createShip, Gameboard };
