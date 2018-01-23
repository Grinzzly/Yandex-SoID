module.exports = {
  users(event) {
    return event.getUsers();
  },
  room(event) {
    return event.getRoom();
  },
};
