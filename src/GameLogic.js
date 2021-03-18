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