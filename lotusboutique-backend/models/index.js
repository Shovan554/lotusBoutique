const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require('./user.model')(sequelize, DataTypes);
db.Sessions = require('./session.model')(sequelize, DataTypes);
db.Categories = require('./category.model')(sequelize, DataTypes);
db.Products = require('./product.model')(sequelize, DataTypes);

// Relationships
db.Users.hasMany(db.Sessions, { foreignKey: 'userID' });
db.Sessions.belongsTo(db.Users, { foreignKey: 'userID' });
db.Categories.hasMany(db.Products, { foreignKey: 'categoryID' });
db.Products.belongsTo(db.Categories, { foreignKey: 'categoryID' });

module.exports = db;
