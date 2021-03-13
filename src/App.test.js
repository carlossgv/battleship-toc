import { createShip, Gameboard } from './AppFunctions';

const ship = createShip(3);
let shipsGameboard = Gameboard('ships');

test("Ship's hit method", () => {
  expect(ship.hit(1)).toStrictEqual([
    { x: '', y: '', hit: false },
    { x: '', y: '', hit: true },
    { x: '', y: '', hit: false },
  ]);
});

test("Ship's isSunk method", () => {
  expect(ship.isSunk(ship.hitPoints)).toBe(false);
});

test('placeShip negative coordinate x', () => {
  expect(shipsGameboard.placeShip(-1, 6, ship, 'horizontal')).toBe(false);
});

test('placeShip negative coordinate y', () => {
  expect(shipsGameboard.placeShip(0, -1, ship, 'horizontal')).toBe(false);
});

test('Ship placement out of bounds horizontal', () => {
  expect(shipsGameboard.placeShip(0, 8, ship, 'horizontal')).toBe(false);
});

test('Ship placement out of bounds vertical', () => {
  expect(shipsGameboard.placeShip(8, 0, ship, 'vertical')).toBe(false);
});

test('Ship placement inbound horizontal', () => {
  expect(shipsGameboard.placeShip(1, 1, ship, 'horizontal')).toStrictEqual([
    [false, false, false, false, false, false, false, false, false, false],
    [
      false,
      ship.hitPoints[0],
      ship.hitPoints[1],
      ship.hitPoints[2],
      false,
      false,
      false,
      false,
      false,
      false,
    ],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
  ]);
});

test('Ship placement inbound vertical', () => {
  expect(shipsGameboard.placeShip(4, 4, ship, 'vertical')).toStrictEqual([
    [false, false, false, false, false, false, false, false, false, false],
    [
      false,
      ship.hitPoints[0],
      ship.hitPoints[1],
      ship.hitPoints[2],
      false,
      false,
      false,
      false,
      false,
      false,
    ],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [
      false,
      false,
      false,
      false,
      ship.hitPoints[0],
      false,
      false,
      false,
      false,
      false,
    ],
    [
      false,
      false,
      false,
      false,
      ship.hitPoints[1],
      false,
      false,
      false,
      false,
      false,
    ],
    [
      false,
      false,
      false,
      false,
      ship.hitPoints[2],
      false,
      false,
      false,
      false,
      false,
    ],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
  ]);
});

test('Missed received attack', () => {
  expect(shipsGameboard.receiveAttack(0, 0)).toBe('missed');
});

test('Succesful received attack', () => {
  expect(shipsGameboard.receiveAttack(1, 1)).toBe(shipsGameboard.array[(1, 1)]);
});
