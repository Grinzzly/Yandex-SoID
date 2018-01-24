import groupBy from 'ramda/src/groupBy';
import path from 'ramda/src/path';
import sortRoomsByProximity from './sortRoomsByProximity';

export default (newEvent, members, events, rooms) => {
  const appropriateRooms = sortRoomsByProximity(
    rooms.filter(room => room.capacity >= members.length),
    members,
  );
  const eventsByRoomId = groupBy(path(['room', 'id']), events);

  const newEventStart = Date.parse(newEvent.dateStart);
  const newEventEnd = Date.parse(newEvent.dateEnd);

  const { availableRooms, busyRooms } = appropriateRooms.reduce((acc, room) => {
    const intersectingEvents = eventsByRoomId[room.id].filter((event) => {
      const eventStart = Date.parse(event.dateStart);
      const eventEnd = Date.parse(event.dateEnd);

      return (
        (eventStart >= newEventStart && eventStart < newEventEnd) ||
        (eventEnd > newEventStart && eventEnd <= newEventEnd)
      );
    });

    if (intersectingEvents.length > 0) {
      acc.busyRooms.push({
        room,
        intersectingEvents,
      });
    } else {
      acc.availableRooms.push(room);
    }

    return acc;
  }, {
    availableRooms: [],
    busyRooms: [],
  });
};
