const Sequelize = require('sequelize');

const scheme = require('./scheme');

const op = Sequelize.Op;

const sequelize = new Sequelize('db', 'user', 'pass', {
  dialect: 'sqlite',
  storage: 'db.sqlite3',

  operatorsAliases: { $and: op.and },
  logging: false,
});

scheme(sequelize);
sequelize.sync();

module.exports.sequelize = sequelize;
module.exports.models = scheme(sequelize);
