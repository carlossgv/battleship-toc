import { createShip, Gameboard } from './AppFunctions';

const ship = createShip(5);
const shipsGameboard = Gameboard('ships');

test("Ship's hit method", () => {
  expect(ship.hit(1)).toStrictEqual([false, true, false, false, false]);
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
  expect(shipsGameboard.placeShip(0, 6, ship, 'horizontal')).toBe(false);
});

test('Ship placement out of bounds vertical', () => {
  expect(shipsGameboard.placeShip(6, 0, ship, 'vertical')).toBe(false);
});

test('Ship placement inbound horizontal', () => {
  expect(shipsGameboard.placeShip(1, 1, ship, 'horizontal')).toStrictEqual([
    [false, false, false, false, false, false, false, false, false, false],
    [false, true, true, true, true, true, false, false, false, false],
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
    [false, true, true, true, true, true, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, true, false, false, false, false, false],
    [false, false, false, false, true, false, false, false, false, false],
    [false, false, false, false, true, false, false, false, false, false],
    [false, false, false, false, true, false, false, false, false, false],
    [false, false, false, false, true, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
  ]);
});
