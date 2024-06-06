// models/product.model.js
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      productID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      categoryID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      imageurl: {
        type: DataTypes.STRING(500),
        allowNull: true
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      size: {
        type: DataTypes.STRING,
        allowNull: true
      },
      sku: {
        type: DataTypes.STRING,
        allowNull: true
      },
      stockquantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      timestamps: true
    });
  
    return Product;
  };
  