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

  const missedAtttacks = [];

  const receiveAttack = (x, y) => {
    if (!array[x][y]) {
      array[x][y] = 'missed';
      return 'missed';
    } else if (array[x][y] !== 'missed') {
      array[x][y].hit = true;
      console.log(array[(x, y)]);
      return array[(x, y)];
    }
  };

  const placeShip = (x, y, ship, direction) => {
    if (x < 0 || y < 0) {
      return false;
    }

    if (direction === 'horizontal') {
      if (y > 10 - ship.length) {
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
      if (x > 10 - ship.length) {
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

  return { array, missedAtttacks, placeShip, receiveAttack };
};

export { createShip, Gameboard };
