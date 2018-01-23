const { models } = require('../../modules/');

module.exports = {
  createUser(root, { input }) {
    return models.UserModel.create(input);
  },
  updateUser(root, { id, input }) {
    return models.UserModel.findById(id)
      .then(user => user.update(input));
  },
  removeUser(root, { id }) {
    return models.UserModel.findById(id)
      .then(user => user.destroy());
  },
  createRoom(root, { input }) {
    return models.RoomModel.create(input);
  },
  updateRoom(root, { id, input }) {
    return models.RoomModel.findById(id)
      .then(room => room.update(input));
  },
  removeRoom(root, { id }) {
    return models.RoomModel.findById(id)
      .then(room => room.destroy());
  },
  createEvent(root, { input, usersIds, roomId }) {
    return models.EventModel.create(input)
      .then((event) => {
        event.setRoom(roomId);
        return event.setUsers(usersIds)
          .then(() => event);
      });
  },
  updateEvent(root, { id, input }) {
    return models.EventModel.findById(id)
      .then(event => event.update(input));
  },
  addUserToEvent(root, { id, userId }) {
    return models.EventModel.findById(id)
      .then((event) => {
        event.addUser(userId);
        return event;
      });
  },
  removeUserFromEvent(root, { id, userId }) {
    return models.EventModel.findById(id)
      .then((event) => {
        event.removeUser(userId);
        return event;
      });
  },
  changeEventRoom(root, { id, roomId }) {
    return models.EventModel.findById(id)
      .then(event => event.setRoom(roomId));
  },
  removeEvent(root, { id }) {
    return models.EventModel.findById(id)
      .then(event => event.destroy());
  },
};
