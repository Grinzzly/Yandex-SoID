const resolvers = require('../index');

const event = resolvers().Event;
const mutation = resolvers().Mutation;

describe('Events', () => {

  let currentUserId, currentRoomId, currentEventId;
  let resultEvent;
  const HOUR = 60 * 60 * 1000;
  const now = new Date();
  const timeNow = new Date(now.getTime());
  const timeLater = new Date(now.getTime() + (HOUR * 2));

  describe('Create data', () => {
    it('create User', () => {
      return mutation.createUser(null, {
        input: {
          login: 'T-John',
          homeFloor: 1,
          avatarUrl: 'http://pic.com/1',
        },
      })
        .then((result) => {
          currentUserId = result.id;
          const received = result.dataValues;
          const expected = {
            id: currentUserId,
            login: 'T-John',
            homeFloor: 1,
            avatarUrl: 'http://pic.com/1',
          };
          return expect(received).toEqual(expected);
        });
    });
    it('create Room', () => {
      return mutation.createRoom(null, {
        input: {
          title: 'T-Room',
          capacity: 2,
          floor: 3,
        },
      })
        .then((result) => {
          currentRoomId = result.id;
          const received = result.dataValues;
          const expected = {
            id: currentRoomId,
            title: 'T-Room',
            capacity: 2,
            floor: 3,
          };
          return expect(received).toEqual(expected);
        });
    });
    it('create Event', () => {
      return mutation.createEvent(null, {
        input: {
          title: 'T-Event',
          dateStart: timeNow,
          dateEnd: timeLater,
        },
        usersIds: currentUserId,
        roomId: currentRoomId,
      })
        .then((result) => {
          resultEvent = result;
          currentEventId = result.id;
          const received = result.dataValues;
          const expected = {
            id: currentEventId,
            title: 'T-Event',
            dateStart: timeNow,
            dateEnd: timeLater,
            RoomId: currentRoomId,
          };
          return expect(received).toEqual(expected);
        });
    });
  });

  describe('Events', () => {
    it('get Users from Event', () => {
      return event.users(resultEvent)
        .then((result) => {
          let received;
          for (let i = 0; i < result.length; i += 1) {
            received = result[i].dataValues;
          }
          let expected = {
            id: currentUserId,
            login: 'T-John',
            homeFloor: 1,
            avatarUrl: 'http://pic.com/1',
            Events_Users: {
              EventId: currentEventId,
              UserId: currentUserId,
            },
          };
          received = JSON.stringify(received);
          expected = JSON.stringify(expected);
          return expect(received).toContain(expected);
        });
    });
    it('get Room from Event', () => {
      return event.room(resultEvent)
        .then((result) => {
          const received = result.dataValues;
          const expected = {
            id: currentRoomId,
            title: 'T-Room',
            capacity: 2,
            floor: 3,
          };
          return expect(received).toEqual(expected);
        });
    });
  });
  describe('Remove all changes', () => {
    it('remove current User', () => {
      return mutation.removeUser(null, {
        id: currentUserId,
      })
        .then((result) => {
          const received = result.dataValues;
          const expected = {
            id: currentUserId,
            login: 'T-John',
            homeFloor: 1,
            avatarUrl: 'http://pic.com/1',
          };
          return expect(received).toEqual(expected);
        });
    });
    it('remove current Room', () => {
      return mutation.removeRoom(null, {
        id: currentRoomId,
      })
        .then((result) => {
          const received = result.dataValues;
          const expected = {
            id: currentRoomId,
            title: 'T-Room',
            capacity: 2,
            floor: 3,
          };
          return expect(received).toEqual(expected);
        });
    });
    it('remove current Event', () => {
      return mutation.removeEvent(null, {
        id: currentEventId,
      })
        .then((result) => {
          const received = result.dataValues;
          const expected = {
            id: currentEventId,
            title: 'T-Event',
            dateStart: timeNow,
            dateEnd: timeLater,
            RoomId: null,
          };
          return expect(received).toEqual(expected);
        });
    });
  });
});
