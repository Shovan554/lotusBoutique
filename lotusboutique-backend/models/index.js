const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user.model')(sequelize, DataTypes);
db.sessions = require('./session.model')(sequelize, DataTypes);

// Relationships
db.users.hasMany(db.sessions, { foreignKey: 'userID' });
db.sessions.belongsTo(db.users, { foreignKey: 'userID' });

module.exports = db;
