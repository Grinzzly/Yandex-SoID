import sortRoomsByProximity from '@/utils/sortRoomsByProximity';

test('correctly sorts rooms by the floor proximity', () => {
  const members = [
    { homeFloor: 3 },
    { homeFloor: 4 },
    { homeFloor: 5 },
  ];

  const rooms = [
    { floor: 1 },
    { floor: 4 },
    { floor: 5 },
  ];

  expect(sortRoomsByProximity(rooms, members)).toEqual([
    { floor: 4 },
    { floor: 5 },
    { floor: 1 },
  ]);
});
