const { models } = require('../../modules/');

module.exports = {
  user(root, { id }) {
    return models.UserModel.findById(id);
  },
  users() {
    return models.UserModel.findAll();
  },
  event(root, { id }) {
    return models.EventModel.findById(id);
  },
  events() {
    return models.EventModel.findAll();
  },
  room(root, { id }) {
    return models.RoomModel.findById(id);
  },
  rooms() {
    return models.RoomModel.findAll();
  },
};
