const Sequelize = require('sequelize');

module.exports = function scheme(sequelize) {
  const User = sequelize.define('User', {
    login: Sequelize.STRING,
    homeFloor: Sequelize.TINYINT,
    avatarUrl: Sequelize.STRING,
  },
  {
    timestamps: false,
    autoIncrement: true,
  });

  const Room = sequelize.define('Room', {
    title: Sequelize.STRING,
    capacity: Sequelize.SMALLINT,
    floor: Sequelize.TINYINT,
  },
  {
    timestamps: false,
    autoIncrement: true,
  });

  const Event = sequelize.define('Event', {
    title: Sequelize.STRING,
    dateStart: Sequelize.DATE,
    dateEnd: Sequelize.DATE,
  },
  {
    timestamps: false,
    autoIncrement: true,
  });

  Event.belongsToMany(User, { through: { model: 'Events_Users' }, timestamps: false });
  User.belongsToMany(Event, { through: { model: 'Events_Users' }, timestamps: false });
  Event.belongsTo(Room);

  const RoomModel = sequelize.models.Room;
  const EventModel = sequelize.models.Event;
  const UserModel = sequelize.models.User;

  return { RoomModel, EventModel, UserModel };
};
