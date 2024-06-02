module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define('Session', {
      sessionID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  
    return Session;
  };
  