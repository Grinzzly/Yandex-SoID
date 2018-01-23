const resolvers = require('../index');

const mutation = resolvers().Mutation;

describe('Mutations cycle. Add and remove from database', () => {
  describe('User cycle', () => {
    let currentUserId;
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
    it('update current User', () => {
      return mutation.updateUser(null, {
        id: currentUserId,
        input: {
          login: 'T-Jane',
          homeFloor: 2,
          avatarUrl: 'http://pic.com/2',
        },
      })
        .then((result) => {
          const received = result.dataValues;
          const expected = {
            id: currentUserId,
            login: 'T-Jane',
            homeFloor: 2,
            avatarUrl: 'http://pic.com/2',
          };
          return expect(received).toEqual(expected);
        });
    });
    it('remove current User', () => {
      return mutation.removeUser(null, {
        id: currentUserId,
      })
        .then((result) => {
          const received = result.dataValues;
          const expected = {
            id: currentUserId,
            login: 'T-Jane',
            homeFloor: 2,
            avatarUrl: 'http://pic.com/2',
          };
          return expect(received).toEqual(expected);
        });
    });
  });

  describe('Room cycle', () => {
    let currentRoomId;
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
    it('update current Room', () => {
      return mutation.updateRoom(null, {
        id: currentRoomId,
        input: {
          title: 'T-Hall',
          capacity: 3,
          floor: 2,
        },
      })
        .then((result) => {
          const received = result.dataValues;
          const expected = {
            id: currentRoomId,
            title: 'T-Hall',
            capacity: 3,
            floor: 2,
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
            title: 'T-Hall',
            capacity: 3,
            floor: 2,
          };
          return expect(received).toEqual(expected);
        });
    });
  });

  describe('Event cycle', () => {
    let currentUserId, currentRoomId, currentEventId;
    const HOUR = 60 * 60 * 1000;
    const now = new Date();
    const timeNow = new Date(now.getTime());
    const timeLater = new Date(now.getTime() + (HOUR * 2));

    describe('Create User', () => {
      it('create User for Event', () => {
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
    });
    describe('Create Room', () => {
      it('create Room for Event', () => {
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
    });
    describe('Create Event', () => {
      it('create Event', () => {
        return mutation.createEvent(null, {
          input: {
            title: 'T-Event',
            dateStart: timeNow,
            dateEnd: timeLater,
          },
          usersIds: [currentUserId],
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
      it('update current Event', () => {
        return mutation.updateEvent(null, {
          id: currentEventId,
          input: {
            title: 'T-Study',
            dateStart: timeNow,
            dateEnd: timeLater,
          },
        })
          .then((result) => {
            const received = result.dataValues;
            const expected = {
              id: currentEventId,
              title: 'T-Study',
              dateStart: timeNow,
              dateEnd: timeLater,
              RoomId: currentRoomId,
            };
            return expect(received).toEqual(expected);
          });
      });
      it('add User to current Event, did not return error', () => {
        return mutation.addUserToEvent(null, {
          id: currentEventId,
          userId: currentUserId,
        })
          .then((result) => {
            const received = result.dataValues;
            const expected = {
              id: currentEventId,
              title: 'T-Study',
              dateStart: timeNow,
              dateEnd: timeLater,
              RoomId: currentRoomId,
            };
            return expect(received).toEqual(expected);
          });
      });
      it('remove User from current Event, did not return error', () => {
        return mutation.removeUserFromEvent(null, {
          id: currentEventId,
          userId: currentRoomId,
        })
          .then((result) => {
            const received = result.dataValues;
            const expected = {
              id: currentEventId,
              title: 'T-Study',
              dateStart: timeNow,
              dateEnd: timeLater,
              RoomId: currentRoomId,
            };
            return expect(received).toEqual(expected);
          });
      });
      it('change Event Room', () => {
        return mutation.changeEventRoom(null, {
          id: currentEventId,
          roomId: currentRoomId,
        })
          .then((result) => {
            const received = result.dataValues;
            const expected = {
              id: currentEventId,
              title: 'T-Study',
              dateStart: timeNow,
              dateEnd: timeLater,
              RoomId: currentRoomId,
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
              title: 'T-Study',
              dateStart: timeNow,
              dateEnd: timeLater,
              RoomId: null,
            };
            return expect(received).toEqual(expected);
          });
      });
    });
  });
});
