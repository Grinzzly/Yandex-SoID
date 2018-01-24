export default (rooms, members) => rooms.sort((roomA, roomB) => {
  const floorsPassed = members.reduce((acc, member) => ({
    roomA: acc.roomA + Math.abs(member.homeFloor - roomA.floor),
    roomB: acc.roomB + Math.abs(member.homeFloor - roomB.floor),
  }), {
    roomA: 0,
    roomB: 0,
  });

  return floorsPassed.roomA - floorsPassed.roomB;
});
