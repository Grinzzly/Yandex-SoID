const resolvers = require('../index');

const query = resolvers().Query;
const mutation = resolvers().Mutation;

describe('Query resolvers. Add and fetch data from database, then remove all.', () => {
  let currentJohnId, currentJaneId, currentRoomId, currentEventId;
  const HOUR = 60 * 60 * 1000;
  const now = new Date();
  const timeNow = new Date(now.getTime());
  const timeLater = new Date(now.getTime() + (HOUR * 2));

  describe('Create data', () => {
    it('create Users', () => {
      const users = {
        One: mutation.createUser(null, {
          input: {
            login: 'T-John',
            homeFloor: 1,
            avatarUrl: 'http://pic.com/1',
          },
        }),
        Two: mutation.createUser(null, {
          input: {
            login: 'T-Jane',
            homeFloor: 2,
            avatarUrl: 'http://pic.com/2',
          },
        }),
      };
      return Promise.all([users.One, users.Two])
        .then((result) => {
          currentJohnId = result[0].id;
          currentJaneId = result[1].id;
          return { currentJohnId, currentJaneId };
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
        usersIds: [currentJohnId, currentJaneId],
        roomId: currentRoomId,
      })
        .then((result) => {
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
  describe('Fetch data', () => {
    it('fetch User', () => {
      return query.user(null, {
        id: currentJohnId,
      })
        .then((result) => {
          const received = result.dataValues;
          const expected = {
            id: currentJohnId,
            login: 'T-John',
            homeFloor: 1,
            avatarUrl: 'http://pic.com/1',
          };
          return expect(received).toEqual(expected);
        });
    });
    it('fetch Users', () => {
      return query.users(null, {})
        .then((result) => {
          let received;
          for (let i = 0; i < result.length; i += 1) {
            received = result[i].dataValues;
          }
          const expected = {
            id: currentJaneId,
            login: 'T-Jane',
            homeFloor: 2,
            avatarUrl: 'http://pic.com/2',
          };
          return expect(received).toEqual(expected);
        });
    });
    it('fetch Event', () => {
      return query.event(null, {
        id: currentEventId,
      })
        .then((result) => {
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
    it('fetch Events', () => {
      return query.events(null, {})
        .then((result) => {
          let received;
          for (let i = 0; i < result.length; i += 1) {
            received = result[i].dataValues;
          }
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
    it('fetch Room', () => {
      return query.room(null, {
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
    it('fetch Rooms', () => {
      return query.rooms(null, {})
        .then((result) => {
          let received;
          for (let i = 0; i < result.length; i += 1) {
            received = result[i].dataValues;
          }
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
  describe('Remove created data', () => {
    it('remove current User', () => {
      const users = {
        One: mutation.removeUser(null, {
          id: currentJohnId,
        }),
        Two: mutation.removeUser(null, {
          id: currentJaneId,
        }),
      };
      return Promise.all([users.One, users.Two])
        .then((result) => {
          currentJohnId = result[0].id;
          currentJaneId = result[1].id;
          return { currentJohnId, currentJaneId };
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
